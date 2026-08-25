import { describe, it, expect, vi, afterEach } from 'vitest';
import { zipSync, strToU8 } from 'fflate';
import worker from '../src/index.js';

const env = {
  GITHUB_OWNER: 'octo', GITHUB_REPO: 'sites', GITHUB_TOKEN: 't', PASSCODE: 'open-sesame',
  ALLOWED_ORIGINS: 'https://student-sites.org,http://localhost:8000',
};

function request({ slug = 'demo', names = 'Sam', passcode = 'open-sesame', zip = { 'index.html': '<p>x</p>' }, origin = 'https://student-sites.org', method = 'POST', path = '/submit' } = {}) {
  const form = new FormData();
  form.set('slug', slug);
  form.set('names', names);
  form.set('passcode', passcode);
  if (zip) form.set('file', new File([zipSync(Object.fromEntries(Object.entries(zip).map(([k, v]) => [k, strToU8(v)])))], 'site.zip'));
  return new Request(`https://worker.test${path}`, { method, body: method === 'POST' ? form : undefined, headers: { Origin: origin } });
}

function stubGitHub() {
  const routes = {
    'GET /git/ref/heads/main': { object: { sha: 'MAIN' } },
    'GET /git/commits/MAIN': { tree: { sha: 'TREE' } },
    'GET /git/trees/TREE': { tree: [] },
    'POST /git/blobs': { sha: 'BLOB' },
    'POST /git/trees': { sha: 'NEWTREE' },
    'POST /git/commits': { sha: 'NEWCOMMIT' },
    'PATCH /git/refs/heads/site/demo': { ok: true },
    'GET /pulls': [],
    'POST /pulls': { html_url: 'https://gh/pr/1' },
  };
  return vi.spyOn(globalThis, 'fetch').mockImplementation(async (url, init = {}) => {
    const u = new URL(url);
    const key = `${init.method || 'GET'} ${u.pathname.replace('/repos/octo/sites', '')}`;
    const data = routes[key];
    return new Response(JSON.stringify(data ?? { message: 'nope' }), { status: data ? 200 : 404 });
  });
}

afterEach(() => vi.restoreAllMocks());

describe('worker', () => {
  it('answers CORS preflight for an allowed origin', async () => {
    const res = await worker.fetch(request({ method: 'OPTIONS' }), env);
    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('https://student-sites.org');
  });

  it('omits the CORS allow header for an unknown origin', async () => {
    const res = await worker.fetch(request({ method: 'OPTIONS', origin: 'https://evil.example' }), env);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull();
  });

  it('404s other routes', async () => {
    expect((await worker.fetch(request({ path: '/' }), env)).status).toBe(404);
  });

  it('rejects a wrong passcode with 401 and a friendly message', async () => {
    const res = await worker.fetch(request({ passcode: 'nope' }), env);
    expect(res.status).toBe(401);
    expect((await res.json()).error).toMatch(/passcode/i);
  });

  it('returns 400 with the validation message for a bad zip', async () => {
    const res = await worker.fetch(request({ zip: { 'readme.md': 'x' } }), env);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/index\.html/);
  });

  it('400s when no file is attached', async () => {
    const res = await worker.fetch(request({ zip: null }), env);
    expect(res.status).toBe(400);
  });

  it('pushes and opens a PR on success', async () => {
    stubGitHub();
    const res = await worker.fetch(request(), env);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      ok: true, slug: 'demo', submission: 1, prUrl: 'https://gh/pr/1',
      previewUrl: 'https://raw.githack.com/octo/sites/site/demo/students/demo/index.html',
    });
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('https://student-sites.org');
  });

  it('returns the generic 500 message when GitHub fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{"message":"boom"}', { status: 500 }));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = await worker.fetch(request(), env);
    expect(res.status).toBe(500);
    expect((await res.json()).error).toBe('Something went wrong on our side — try again in a minute, or tell your teacher.');
  });
});
