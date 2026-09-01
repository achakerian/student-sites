import { describe, it, expect } from 'vitest';
import { zipSync, strToU8 } from 'fflate';
import {
  ValidationError, validateSlug, validateNames, validateTitle, validatePdf,
  extractSite, findExternalResources, MAX_PDF_BYTES,
} from '../src/validate.js';

const zip = (entries) => zipSync(Object.fromEntries(
  Object.entries(entries).map(([k, v]) => [k, typeof v === 'string' ? strToU8(v) : v])
));

describe('validateSlug', () => {
  it('accepts and lowercases a good slug', () => {
    expect(validateSlug(' My-Site1 ')).toBe('my-site1');
  });
  it.each(['ab', '-abc', 'abc-', 'a b', 'a_b', 'x'.repeat(41), '', null])('rejects %j', (bad) => {
    expect(() => validateSlug(bad)).toThrow(ValidationError);
  });
});

describe('validateNames', () => {
  it('trims and allows empty', () => {
    expect(validateNames('  Sam & Alex ')).toBe('Sam & Alex');
    expect(validateNames(undefined)).toBe('');
  });
  it('rejects over 80 chars', () => {
    expect(() => validateNames('x'.repeat(81))).toThrow(ValidationError);
  });
});

describe('validateTitle', () => {
  it('trims a good title', () => {
    expect(validateTitle('  Three Days in Hanoi ')).toBe('Three Days in Hanoi');
  });
  it.each(['', '   ', null, 'x'.repeat(81)])('rejects %j', (bad) => {
    expect(() => validateTitle(bad)).toThrow(ValidationError);
  });
});

describe('validatePdf', () => {
  const pdf = (body = 'x') => strToU8(`%PDF-1.4 ${body}`);

  it('accepts bytes starting with the PDF magic number', () => {
    expect(() => validatePdf(pdf())).not.toThrow();
  });
  it('rejects bytes that are not a PDF', () => {
    expect(() => validatePdf(strToU8('<html>nope</html>'))).toThrow(ValidationError);
  });
  it('rejects an oversized PDF', () => {
    const big = new Uint8Array(MAX_PDF_BYTES + 1);
    big.set(strToU8('%PDF-'));
    expect(() => validatePdf(big)).toThrow(ValidationError);
  });
});

describe('extractSite', () => {
  it('returns sorted files with root index.html', () => {
    const files = extractSite(zip({ 'styles.css': 'b{}', 'index.html': '<p>hi</p>' }));
    expect(files.map(f => f.path)).toEqual(['index.html', 'styles.css']);
    expect(new TextDecoder().decode(files[0].data)).toBe('<p>hi</p>');
  });
  it('strips a single wrapping folder', () => {
    const files = extractSite(zip({ 'my-site/index.html': 'x', 'my-site/img/a.png': new Uint8Array([1]) }));
    expect(files.map(f => f.path)).toEqual(['img/a.png', 'index.html']);
  });
  it('drops __MACOSX, dotfiles and directory entries', () => {
    const files = extractSite(zip({
      'index.html': 'x', '__MACOSX/._index.html': 'junk', '.DS_Store': 'junk', '.git/config': 'junk', 'sub/': new Uint8Array(0),
    }));
    expect(files.map(f => f.path)).toEqual(['index.html']);
  });
  it('strips the wrapping folder even when Finder junk sits alongside it', () => {
    const files = extractSite(zip({ 'my-site/index.html': 'x', '__MACOSX/my-site/._index.html': 'junk', 'my-site/.DS_Store': 'junk' }));
    expect(files.map(f => f.path)).toEqual(['index.html']);
  });
  it('rejects a zip with no index.html at the root', () => {
    expect(() => extractSite(zip({ 'pages/index.html': 'x', 'readme.md': 'y' }))).toThrow(/index\.html/);
  });
  it('rejects disallowed extensions, naming the file', () => {
    expect(() => extractSite(zip({ 'index.html': 'x', 'movie.mp4': 'y' }))).toThrow(/movie\.mp4/);
  });
  it('rejects path traversal', () => {
    expect(() => extractSite(zip({ 'index.html': 'x', '../evil.html': 'y' }))).toThrow(ValidationError);
  });
  it('rejects more than 200 files', () => {
    const entries = { 'index.html': 'x' };
    for (let i = 0; i < 200; i++) entries[`f${i}.txt`] = 'y';
    expect(() => extractSite(zip(entries))).toThrow(/200/);
  });
  it('rejects garbage bytes', () => {
    expect(() => extractSite(new Uint8Array([1, 2, 3, 4]))).toThrow(/zip/i);
  });
  it('rejects an empty zip', () => {
    expect(() => extractSite(zip({}))).toThrow(/empty/i);
  });
});

describe('findExternalResources', () => {
  it('lists off-site script, iframe and link targets from html files', () => {
    const html = `<link rel="stylesheet" href="styles.css">
      <link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet">
      <script src="app.js"></script>
      <script src="//cdn.example.com/x.js"></script>
      <iframe src="https://youtube.com/embed/1"></iframe>`;
    const out = findExternalResources([{ path: 'index.html', data: strToU8(html) }, { path: 'a.css', data: strToU8('x') }]);
    expect(out).toEqual([
      'index.html: https://fonts.googleapis.com/css?family=Inter',
      'index.html: //cdn.example.com/x.js',
      'index.html: https://youtube.com/embed/1',
    ]);
  });
});
