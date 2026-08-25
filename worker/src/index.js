import {
  ValidationError, validateSlug, validateNames, extractSite, findExternalResources, MAX_ZIP_BYTES,
} from './validate.js';
import { createGitHubClient, pushSite, upsertPullRequest } from './github.js';
import { handlePreview } from './preview.js';

const GENERIC_ERROR = 'Something went wrong on our side — try again in a minute, or tell your teacher.';

class AuthError extends Error {}

function corsHeaders(origin, allowedOrigins) {
  const allowed = (allowedOrigins || '').split(',').map(s => s.trim()).filter(Boolean);
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
  if (allowed.includes(origin)) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
  });
}

function safeEqual(a, b) {
  const enc = new TextEncoder();
  const x = enc.encode(String(a));
  const y = enc.encode(String(b));
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  }
  return diff === 0;
}

async function handleSubmit(request, env) {
  const previewBase = new URL(request.url).origin;
  const form = await request.formData();

  if (!env.PASSCODE || !safeEqual(form.get('passcode') ?? '', env.PASSCODE)) {
    throw new AuthError("That passcode isn't right — check your worksheet.");
  }
  const slug = validateSlug(form.get('slug'));
  const names = validateNames(form.get('names'));

  const file = form.get('file');
  if (!(file instanceof File) || file.size === 0) {
    throw new ValidationError('Please choose the .zip of your site folder to upload.');
  }
  if (file.size > MAX_ZIP_BYTES) {
    throw new ValidationError('Your zip is over 10 MB. Compress or remove large images and try again.');
  }

  const files = extractSite(new Uint8Array(await file.arrayBuffer()));
  const externals = findExternalResources(files);

  const client = createGitHubClient({ token: env.GITHUB_TOKEN, owner: env.GITHUB_OWNER, repo: env.GITHUB_REPO });
  await pushSite(client, { slug, files, names });
  const result = await upsertPullRequest(client, {
    owner: env.GITHUB_OWNER, repo: env.GITHUB_REPO, slug, names, files, externals, previewBase,
  });
  return { ok: true, slug, ...result };
}

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request.headers.get('Origin') || '', env.ALLOWED_ORIGINS);
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method === 'GET' && url.pathname.startsWith('/preview/')) return handlePreview(request, env);
    if (request.method !== 'POST' || url.pathname !== '/submit') {
      return json({ ok: false, error: 'Not found' }, 404, cors);
    }

    try {
      return json(await handleSubmit(request, env), 200, cors);
    } catch (err) {
      if (err instanceof AuthError) return json({ ok: false, error: err.message }, 401, cors);
      if (err instanceof ValidationError) return json({ ok: false, error: err.message }, 400, cors);
      console.error('submission failed', err);
      return json({ ok: false, error: GENERIC_ERROR }, 500, cors);
    }
  },
};
