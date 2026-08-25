import { describe, it, expect, vi, afterEach } from 'vitest';
import { handlePreview, contentTypeFor } from '../src/preview.js';

const env = { GITHUB_OWNER: 'octo', GITHUB_REPO: 'sites', GITHUB_TOKEN: 'tok' };
const req = (path) => new Request(`https://worker.test${path}`);

afterEach(() => vi.restoreAllMocks());

function stubContents(files) {
  return vi.spyOn(globalThis, 'fetch').mockImplementation(async (url, init) => {
    const u = new URL(url);
    const m = u.pathname.match(/\/contents\/students\/([^/]+)\/(.+)$/);
    const key = m ? `${m[1]}/${m[2]}` : '';
    if (!files[key] || u.searchParams.get('ref') !== `site/${m[1]}`) return new Response('{"message":"Not Found"}', { status: 404 });
    return new Response(files[key], { status: 200 });
  });
}

describe('contentTypeFor', () => {
  it('maps common extensions', () => {
    expect(contentTypeFor('index.html')).toBe('text/html; charset=utf-8');
    expect(contentTypeFor('a/b.css')).toBe('text/css; charset=utf-8');
    expect(contentTypeFor('x.PNG')).toBe('image/png');
    expect(contentTypeFor('font.woff2')).toBe('font/woff2');
    expect(contentTypeFor('weird.bin')).toBe('application/octet-stream');
  });
});

describe('handlePreview', () => {
  it('redirects /preview/<slug> to a trailing slash so relative links resolve', async () => {
    const res = await handlePreview(req('/preview/demo'), env);
    expect(res.status).toBe(301);
    expect(res.headers.get('Location')).toBe('https://worker.test/preview/demo/');
  });

  it('serves index.html for the folder root with an html content type and no frame blocking', async () => {
    const spy = stubContents({ 'demo/index.html': '<h1>hi</h1>' });
    const res = await handlePreview(req('/preview/demo/'), env);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('<h1>hi</h1>');
    expect(res.headers.get('Content-Type')).toBe('text/html; charset=utf-8');
    expect(res.headers.get('X-Frame-Options')).toBeNull();
    expect(spy.mock.calls[0][1].headers.Authorization).toBe('Bearer tok');
    expect(spy.mock.calls[0][1].headers.Accept).toBe('application/vnd.github.raw+json');
  });

  it('serves nested assets with their own content type', async () => {
    stubContents({ 'demo/img/a.png': 'PNGDATA' });
    const res = await handlePreview(req('/preview/demo/img/a.png'), env);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('image/png');
  });

  it('404s with a friendly page when the branch or file is gone', async () => {
    stubContents({});
    const res = await handlePreview(req('/preview/demo/'), env);
    expect(res.status).toBe(404);
    expect(await res.text()).toMatch(/no longer available/i);
  });

  it('rejects bad slugs and path traversal without calling GitHub', async () => {
    const spy = stubContents({});
    expect((await handlePreview(req('/preview/Bad_Slug/'), env)).status).toBe(400);
    expect([301, 400]).toContain((await handlePreview(req('/preview/demo/../secret'), env)).status); // URL parser collapses '..'
    expect([301, 400]).toContain((await handlePreview(req('/preview/demo/%2e%2e/secret'), env)).status);
    expect(spy).not.toHaveBeenCalled();
  });
});
