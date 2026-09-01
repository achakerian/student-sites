import { describe, it, expect } from 'vitest';
import { strToU8 } from 'fflate';
import {
  createGitHubClient, planTreeEntries, pushSite, pushFiles, upsertPullRequest, upsertPdfPullRequest,
  buildPrBody, parseSubmissionNumber, toBase64, GitHubError,
} from '../src/github.js';

const OWNER = 'octo', REPO = 'sites';

// Minimal fake GitHub API: routes keyed by "METHOD path", records calls.
function fakeGitHub(routes) {
  const calls = [];
  const fetchImpl = async (url, init = {}) => {
    const method = init.method || 'GET';
    const u = new URL(url);
    const path = u.pathname.replace(`/repos/${OWNER}/${REPO}`, '') + decodeURIComponent(u.search);
    const body = init.body ? JSON.parse(init.body) : undefined;
    calls.push({ method, path, body });
    const handler = routes[`${method} ${path}`] ?? routes[`${method} ${path.split('?')[0]}`];
    if (!handler) return new Response(JSON.stringify({ message: `no route ${method} ${path}` }), { status: 404 });
    const result = typeof handler === 'function' ? handler(body, calls) : handler;
    if (result instanceof Response) return result;
    return new Response(JSON.stringify(result), { status: 200, headers: { 'content-type': 'application/json' } });
  };
  return { fetchImpl, calls, client: createGitHubClient({ token: 't', owner: OWNER, repo: REPO, fetchImpl }) };
}

describe('createGitHubClient', () => {
  it('sends auth header and throws GitHubError on failure', async () => {
    const { client, fetchImpl } = fakeGitHub({ 'GET /x': { ok: 1 } });
    expect(await client.api('GET', '/x')).toEqual({ ok: 1 });
    await expect(client.api('GET', '/missing')).rejects.toBeInstanceOf(GitHubError);
    const seenInit = [];
    const spy = async (u, i) => { seenInit.push(i); return fetchImpl(u, i); };
    await createGitHubClient({ token: 'tok', owner: OWNER, repo: REPO, fetchImpl: spy }).api('GET', '/x');
    expect(seenInit[0].headers.Authorization).toBe('Bearer tok');
  });
});

describe('toBase64', () => {
  it('encodes binary', () => {
    expect(toBase64(new Uint8Array([104, 105]))).toBe('aGk=');
    expect(toBase64(new Uint8Array(100000).fill(0))).toHaveLength(Math.ceil(100000 / 3) * 4);
  });
});

describe('planTreeEntries', () => {
  it('adds uploaded files under the prefix and deletes stale existing files', () => {
    const entries = planTreeEntries({
      prefix: 'students/demo/',
      uploaded: [{ path: 'index.html', sha: 'A' }, { path: 'img/x.png', sha: 'B' }],
      existingPaths: ['students/demo/index.html', 'students/demo/old.css', 'students/other/index.html', 'index.html'],
    });
    expect(entries).toEqual([
      { path: 'students/demo/index.html', mode: '100644', type: 'blob', sha: 'A' },
      { path: 'students/demo/img/x.png', mode: '100644', type: 'blob', sha: 'B' },
      { path: 'students/demo/old.css', mode: '100644', type: 'blob', sha: null },
    ]);
  });
});

describe('pushSite', () => {
  const files = [{ path: 'index.html', data: strToU8('<p>x</p>') }];
  const baseRoutes = {
    'GET /git/ref/heads/main': { object: { sha: 'MAIN' } },
    'GET /git/commits/MAIN': { tree: { sha: 'TREE' } },
    'GET /git/trees/TREE?recursive=1': { tree: [{ path: 'students/demo/old.css', type: 'blob' }, { path: 'students/demo', type: 'tree' }] },
    'POST /git/blobs': { sha: 'BLOB' },
    'POST /git/trees': { sha: 'NEWTREE' },
    'POST /git/commits': { sha: 'NEWCOMMIT' },
  };

  it('updates an existing branch with force', async () => {
    const { client, calls } = fakeGitHub({ ...baseRoutes, 'PATCH /git/refs/heads/site/demo': { ok: true } });
    const result = await pushSite(client, { slug: 'demo', files, names: 'Sam' });
    expect(result).toEqual({ branch: 'site/demo', commitSha: 'NEWCOMMIT' });
    const tree = calls.find(c => c.path === '/git/trees' && c.method === 'POST').body;
    expect(tree.base_tree).toBe('TREE');
    expect(tree.tree).toContainEqual({ path: 'students/demo/old.css', mode: '100644', type: 'blob', sha: null });
    const commit = calls.find(c => c.path === '/git/commits').body;
    expect(commit.parents).toEqual(['MAIN']);
    expect(commit.message).toContain('demo');
    const patch = calls.find(c => c.method === 'PATCH');
    expect(patch.body).toEqual({ sha: 'NEWCOMMIT', force: true });
  });

  it('creates the branch when PATCH says it does not exist', async () => {
    const { client, calls } = fakeGitHub({
      ...baseRoutes,
      'PATCH /git/refs/heads/site/demo': new Response('{"message":"Reference does not exist"}', { status: 422 }),
      'POST /git/refs': { ok: true },
    });
    await pushSite(client, { slug: 'demo', files, names: '' });
    const create = calls.find(c => c.method === 'POST' && c.path === '/git/refs');
    expect(create.body).toEqual({ ref: 'refs/heads/site/demo', sha: 'NEWCOMMIT' });
  });
});

describe('pushFiles', () => {
  const files = [{ path: 'itinerary.pdf', data: strToU8('%PDF-x') }];
  const routes = {
    'GET /git/ref/heads/main': { object: { sha: 'MAIN' } },
    'GET /git/commits/MAIN': { tree: { sha: 'TREE' } },
    'GET /git/trees/TREE?recursive=1': {
      tree: [
        { path: 'travelpdf/files/demo/old.pdf', type: 'blob' },
        { path: 'travelpdf/files/other/itinerary.pdf', type: 'blob' },
      ],
    },
    'POST /git/blobs': { sha: 'BLOB' },
    'POST /git/trees': { sha: 'NEWTREE' },
    'POST /git/commits': { sha: 'NEWCOMMIT' },
    'PATCH /git/refs/heads/pdf/demo': { ok: true },
  };

  it('pushes to the given branch and prefix, deleting stale files only under that prefix', async () => {
    const { client, calls } = fakeGitHub(routes);
    const result = await pushFiles(client, {
      branch: 'pdf/demo', prefix: 'travelpdf/files/demo/', files, message: 'PDF: demo',
    });
    expect(result).toEqual({ branch: 'pdf/demo', commitSha: 'NEWCOMMIT' });
    const tree = calls.find(c => c.path === '/git/trees' && c.method === 'POST').body.tree;
    expect(tree).toContainEqual({ path: 'travelpdf/files/demo/itinerary.pdf', mode: '100644', type: 'blob', sha: 'BLOB' });
    expect(tree).toContainEqual({ path: 'travelpdf/files/demo/old.pdf', mode: '100644', type: 'blob', sha: null });
    expect(tree).not.toContainEqual(expect.objectContaining({ path: 'travelpdf/files/other/itinerary.pdf' }));
    expect(calls.find(c => c.path === '/git/commits').body.message).toBe('PDF: demo');
  });
});

describe('PR body helpers', () => {
  it('round-trips the submission number', () => {
    const body = buildPrBody({ slug: 'demo', names: 'Sam', submission: 3, files: [], externals: [], previewUrl: 'p', timestamp: 't' });
    expect(parseSubmissionNumber(body)).toBe(3);
    expect(parseSubmissionNumber('nothing here')).toBeNull();
  });
  it('includes an external-resources warning only when present', () => {
    const base = { slug: 'demo', names: '', submission: 1, files: [{ path: 'index.html', data: new Uint8Array(10) }], previewUrl: 'p', timestamp: 't' };
    expect(buildPrBody({ ...base, externals: [] })).not.toContain('External resources');
    expect(buildPrBody({ ...base, externals: ['index.html: https://x'] })).toContain('https://x');
  });
});

describe('upsertPullRequest', () => {
  const args = { owner: OWNER, repo: REPO, slug: 'demo', names: 'Sam', files: [], externals: [], now: new Date('2026-08-25T00:00:00Z') };

  it('creates a PR numbered after previous PRs for the branch', async () => {
    const { client, calls } = fakeGitHub({
      'GET /pulls?head=octo:site/demo&state=open&per_page=1': [],
      'GET /pulls?head=octo:site/demo&state=all&per_page=100': [{ number: 1 }, { number: 2 }],
      'POST /pulls': { html_url: 'https://gh/pr/9' },
    });
    const result = await upsertPullRequest(client, args);
    expect(result).toEqual({
      prUrl: 'https://gh/pr/9', submission: 3,
      previewUrl: 'https://raw.githack.com/octo/sites/site/demo/students/demo/index.html',
    });
    const create = calls.find(c => c.method === 'POST' && c.path === '/pulls').body;
    expect(create).toMatchObject({ title: 'Site: demo', head: 'site/demo', base: 'main' });
  });

  it('uses the Worker preview URL when previewBase is given', async () => {
    const { client } = fakeGitHub({
      'GET /pulls?head=octo:site/demo&state=open&per_page=1': [],
      'GET /pulls?head=octo:site/demo&state=all&per_page=100': [],
      'POST /pulls': { html_url: 'https://gh/pr/1' },
    });
    const result = await upsertPullRequest(client, { ...args, previewBase: 'https://w.example' });
    expect(result.previewUrl).toBe('https://w.example/preview/demo/');
  });

  it('updates the open PR and increments its submission number', async () => {
    const existingBody = buildPrBody({ slug: 'demo', names: 'Sam', submission: 4, files: [], externals: [], previewUrl: 'p', timestamp: 't' });
    const { client, calls } = fakeGitHub({
      'GET /pulls?head=octo:site/demo&state=open&per_page=1': [{ number: 7, html_url: 'https://gh/pr/7', body: existingBody }],
      'PATCH /pulls/7': { html_url: 'https://gh/pr/7' },
    });
    const result = await upsertPullRequest(client, args);
    expect(result.prUrl).toBe('https://gh/pr/7');
    expect(result.submission).toBe(5);
    expect(parseSubmissionNumber(calls.find(c => c.method === 'PATCH').body.body)).toBe(5);
  });
});

describe('upsertPdfPullRequest', () => {
  const args = {
    owner: OWNER, repo: REPO, slug: 'demo', names: 'Sam', title: 'Three Days in Hanoi',
    files: [{ path: 'itinerary.pdf', data: new Uint8Array(10) }],
    previewBase: 'https://w.example', now: new Date('2026-09-01T00:00:00Z'),
  };

  it('creates a PDF: PR from the pdf/<slug> branch with a preview link and title in the body', async () => {
    const { client, calls } = fakeGitHub({
      'GET /pulls?head=octo:pdf/demo&state=open&per_page=1': [],
      'GET /pulls?head=octo:pdf/demo&state=all&per_page=100': [],
      'POST /pulls': { html_url: 'https://gh/pr/2' },
    });
    const result = await upsertPdfPullRequest(client, args);
    expect(result.prUrl).toBe('https://gh/pr/2');
    expect(result.submission).toBe(1);
    expect(result.previewUrl).toBe('https://w.example/preview-pdf/demo');
    const create = calls.find(c => c.method === 'POST' && c.path === '/pulls').body;
    expect(create).toMatchObject({ title: 'PDF: demo', head: 'pdf/demo', base: 'main' });
    expect(create.body).toContain('Three Days in Hanoi');
    expect(create.body).toContain('travelpdf');
  });

  it('updates an open PDF PR and increments its submission number', async () => {
    const { client, calls } = fakeGitHub({
      'GET /pulls?head=octo:pdf/demo&state=open&per_page=1': [{ number: 8, html_url: 'https://gh/pr/8', body: '<!-- submission:2 -->' }],
      'PATCH /pulls/8': { html_url: 'https://gh/pr/8' },
    });
    const result = await upsertPdfPullRequest(client, args);
    expect(result.submission).toBe(3);
    expect(parseSubmissionNumber(calls.find(c => c.method === 'PATCH').body.body)).toBe(3);
  });
});
