// Serves a submitted (unmerged) site from its site/<slug> branch so the teacher
// can preview it — including inside an iframe on the review page.
import { SLUG_RE } from './validate.js';

const TYPES = {
  html: 'text/html; charset=utf-8', css: 'text/css; charset=utf-8', js: 'text/javascript; charset=utf-8',
  json: 'application/json; charset=utf-8', md: 'text/markdown; charset=utf-8', txt: 'text/plain; charset=utf-8',
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp',
  svg: 'image/svg+xml', ico: 'image/x-icon', woff: 'font/woff', woff2: 'font/woff2',
  pdf: 'application/pdf',
};

export function contentTypeFor(path) {
  const ext = path.slice(path.lastIndexOf('.') + 1).toLowerCase();
  return TYPES[ext] || 'application/octet-stream';
}

function page(status, title, message) {
  return new Response(
    `<!doctype html><meta charset="utf-8"><title>${title}</title><body style="font-family:system-ui;padding:3rem;color:#333"><h1>${title}</h1><p>${message}</p>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' } },
  );
}

export async function handlePreview(request, env) {
  const url = new URL(request.url);
  const match = url.pathname.match(/^\/preview\/([^/]+)(\/.*)?$/);
  if (!match) return page(404, 'Not found', '');
  const slug = match[1];
  if (!SLUG_RE.test(slug)) return page(400, 'Bad request', 'That site name is not valid.');
  if (match[2] === undefined) {
    return Response.redirect(`${url.origin}/preview/${slug}/`, 301);
  }

  let rest;
  try {
    rest = decodeURIComponent(match[2].slice(1));
  } catch {
    return page(400, 'Bad request', 'That path is not valid.');
  }
  if (rest === '' || rest.endsWith('/')) rest += 'index.html';
  if (rest.split('/').some(s => s === '..' || s === '' || s.startsWith('.')) || rest.includes('\\')) {
    return page(400, 'Bad request', 'That path is not valid.');
  }

  return serveFromBranch(env, { path: `students/${slug}/${rest}`, ref: `site/${slug}`, contentType: contentTypeFor(rest) });
}

// Serves a submitted (unmerged) travel PDF from its pdf/<slug> branch.
export async function handlePdfPreview(request, env) {
  const match = new URL(request.url).pathname.match(/^\/preview-pdf\/([^/]+)$/);
  if (!match) return page(404, 'Not found', '');
  const slug = match[1];
  if (!SLUG_RE.test(slug)) return page(400, 'Bad request', 'That site name is not valid.');
  return serveFromBranch(env, { path: `travelpdf/files/${slug}/itinerary.pdf`, ref: `pdf/${slug}`, contentType: 'application/pdf' });
}

async function serveFromBranch(env, { path, ref, contentType }) {
  const api = `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}?ref=${encodeURIComponent(ref)}`;
  const upstream = await fetch(api, {
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.raw+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'student-sites-submit',
    },
  });
  if (upstream.status === 404) {
    return page(404, 'Preview not available', 'This submission is no longer available — it may have been published or rejected. Check the review page or resubmit.');
  }
  if (!upstream.ok) {
    return page(502, 'Preview unavailable', `GitHub returned ${upstream.status}. Try again in a minute.`);
  }
  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=30',
      'X-Robots-Tag': 'noindex',
    },
  });
}
