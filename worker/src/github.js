// Thin GitHub REST client plus the branch/commit/PR choreography for one submission.
const API = 'https://api.github.com';

export class GitHubError extends Error {
  constructor(status, message, path) {
    super(`GitHub ${status} on ${path}: ${message}`);
    this.name = 'GitHubError';
    this.status = status;
  }
}

export function createGitHubClient({ token, owner, repo, fetchImpl = fetch }) {
  async function api(method, path, body) {
    const response = await fetchImpl(`${API}/repos/${owner}/${repo}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'student-sites-submit',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const text = await response.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = null; }
    if (!response.ok) throw new GitHubError(response.status, data?.message ?? text, path);
    return data;
  }
  return { api };
}

export function toBase64(u8) {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < u8.length; i += chunk) {
    binary += String.fromCharCode.apply(null, u8.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export function planTreeEntries({ slug, uploaded, existingPaths }) {
  const prefix = `students/${slug}/`;
  const entries = uploaded.map(({ path, sha }) => ({ path: prefix + path, mode: '100644', type: 'blob', sha }));
  const uploadedPaths = new Set(entries.map(e => e.path));
  for (const path of existingPaths) {
    if (path.startsWith(prefix) && !uploadedPaths.has(path)) {
      entries.push({ path, mode: '100644', type: 'blob', sha: null });
    }
  }
  return entries;
}

async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

export async function pushSite(client, { slug, files, names }) {
  const branch = `site/${slug}`;
  const mainSha = (await client.api('GET', '/git/ref/heads/main')).object.sha;
  const baseTreeSha = (await client.api('GET', `/git/commits/${mainSha}`)).tree.sha;
  const baseTree = await client.api('GET', `/git/trees/${baseTreeSha}?recursive=1`);
  const existingPaths = baseTree.tree.filter(e => e.type === 'blob').map(e => e.path);

  const uploaded = await mapWithConcurrency(files, 8, async (file) => {
    const blob = await client.api('POST', '/git/blobs', { content: toBase64(file.data), encoding: 'base64' });
    return { path: file.path, sha: blob.sha };
  });

  const tree = await client.api('POST', '/git/trees', {
    base_tree: baseTreeSha,
    tree: planTreeEntries({ slug, uploaded, existingPaths }),
  });
  const commit = await client.api('POST', '/git/commits', {
    message: `Site: ${slug} — submission${names ? ` by ${names}` : ''}`,
    tree: tree.sha,
    parents: [mainSha],
  });

  try {
    await client.api('PATCH', `/git/refs/heads/${branch}`, { sha: commit.sha, force: true });
  } catch (err) {
    if (!(err instanceof GitHubError && err.status === 422)) throw err;
    await client.api('POST', '/git/refs', { ref: `refs/heads/${branch}`, sha: commit.sha });
  }
  return { branch, commitSha: commit.sha };
}

const SUBMISSION_RE = /<!-- submission:(\d+) -->/;

export function parseSubmissionNumber(body) {
  const match = SUBMISSION_RE.exec(body ?? '');
  return match ? Number(match[1]) : null;
}

function formatBytes(n) {
  return n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1024 / 1024).toFixed(2)} MB`;
}

export function buildPrBody({ slug, names, submission, files, externals, previewUrl, timestamp }) {
  const lines = [
    `<!-- submission:${submission} -->`,
    `**Site:** \`${slug}\` · **Submission #${submission}** · ${timestamp}`,
    `**Students:** ${names || '_not given_'}`,
    '',
    `### 👀 [Preview this site](${previewUrl})`,
    '',
    `Merge to publish at \`https://student-sites.org/students/${slug}/\`. Close with a comment to reject.`,
    '',
  ];
  if (externals.length) {
    lines.push('### ⚠️ External resources', '', ...externals.map(e => `- \`${e}\``), '');
  }
  const totalBytes = files.reduce((sum, f) => sum + f.data.byteLength, 0);
  lines.push(`<details><summary>${files.length} file(s), ${formatBytes(totalBytes)}</summary>`, '');
  lines.push(...files.map(f => `- \`${f.path}\` (${formatBytes(f.data.byteLength)})`));
  lines.push('', '</details>');
  return lines.join('\n');
}

export async function upsertPullRequest(client, { owner, repo, slug, names, files, externals, previewBase, now = new Date() }) {
  const branch = `site/${slug}`;
  const head = `${owner}:${branch}`;
  const previewUrl = previewBase
    ? `${previewBase}/preview/${slug}/`
    : `https://raw.githack.com/${owner}/${repo}/${branch}/students/${slug}/index.html`;
  const timestamp = now.toISOString().replace('T', ' ').slice(0, 16) + ' UTC';

  const [open] = await client.api('GET', `/pulls?head=${encodeURIComponent(head)}&state=open&per_page=1`);

  let submission, prUrl;
  if (open) {
    submission = (parseSubmissionNumber(open.body) ?? 0) + 1;
    const body = buildPrBody({ slug, names, submission, files, externals, previewUrl, timestamp });
    prUrl = (await client.api('PATCH', `/pulls/${open.number}`, { body })).html_url;
  } else {
    const previous = await client.api('GET', `/pulls?head=${encodeURIComponent(head)}&state=all&per_page=100`);
    submission = previous.length + 1;
    const body = buildPrBody({ slug, names, submission, files, externals, previewUrl, timestamp });
    prUrl = (await client.api('POST', '/pulls', { title: `Site: ${slug}`, head: branch, base: 'main', body })).html_url;
  }
  return { prUrl, submission, previewUrl };
}
