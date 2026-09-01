import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { buildManifest, buildPdfManifest } from './build-manifest.mjs';

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'students-'));
  mkdirSync(join(dir, 'zeta-site'));
  writeFileSync(join(dir, 'zeta-site', 'index.html'), '<title>Zeta</title>');
  mkdirSync(join(dir, 'alpha-site'));
  writeFileSync(join(dir, 'alpha-site', 'index.html'), '');
  writeFileSync(join(dir, 'alpha-site', 'meta.json'), JSON.stringify({ title: 'Alpha!', description: 'First', tags: ['JS'] }));
  mkdirSync(join(dir, 'no-index'));
  writeFileSync(join(dir, 'no-index', 'readme.md'), 'x');
  mkdirSync(join(dir, 'bad-meta'));
  writeFileSync(join(dir, 'bad-meta', 'index.html'), '');
  writeFileSync(join(dir, 'bad-meta', 'meta.json'), '{not json');
  writeFileSync(join(dir, 'sites.json'), '{}');
  return dir;
}

test('lists folders with index.html, sorted by slug, merging meta.json over defaults', () => {
  const { sites } = buildManifest(fixture());
  assert.deepEqual(sites.map(s => s.name), ['alpha-site', 'bad-meta', 'zeta-site']);
  const alpha = sites[0];
  assert.equal(alpha.title, 'Alpha!');
  assert.equal(alpha.description, 'First');
  assert.deepEqual(alpha.tags, ['JS']);
  assert.equal(alpha.category, 'a');
  assert.equal(alpha.popular, false);
  assert.equal(alpha.path, './students/alpha-site/index.html');
  assert.equal(alpha.thumbnail, './thumbnails/alpha-site.jpg');
});

test('falls back to defaults when meta.json is invalid', () => {
  const { sites } = buildManifest(fixture());
  const bad = sites.find(s => s.name === 'bad-meta');
  assert.equal(bad.title, 'Bad Meta');
  assert.equal(bad.description, 'Student site');
  assert.deepEqual(bad.tags, ['HTML', 'CSS']);
});

function pdfFixture() {
  const dir = mkdtempSync(join(tmpdir(), 'travelpdf-'));
  mkdirSync(join(dir, 'files', 'zeta-trip'), { recursive: true });
  writeFileSync(join(dir, 'files', 'zeta-trip', 'itinerary.pdf'), '%PDF-1.4');
  mkdirSync(join(dir, 'files', 'alpha-trip'), { recursive: true });
  writeFileSync(join(dir, 'files', 'alpha-trip', 'itinerary.pdf'), '%PDF-1.4');
  writeFileSync(join(dir, 'files', 'alpha-trip', 'meta.json'), JSON.stringify({ title: 'Three Days in Hanoi', names: 'Sam', submitted: '2026-09-01T00:00:00.000Z' }));
  mkdirSync(join(dir, 'files', 'no-pdf'));
  writeFileSync(join(dir, 'files', 'no-pdf', 'meta.json'), JSON.stringify({ title: 'Nope' }));
  return dir;
}

test('lists folders with itinerary.pdf, sorted, merging meta.json over defaults', () => {
  const { pdfs } = buildPdfManifest(pdfFixture());
  assert.deepEqual(pdfs.map(p => p.name), ['alpha-trip', 'zeta-trip']);
  const alpha = pdfs[0];
  assert.equal(alpha.title, 'Three Days in Hanoi');
  assert.equal(alpha.names, 'Sam');
  assert.equal(alpha.path, './files/alpha-trip/itinerary.pdf');
  const zeta = pdfs[1];
  assert.equal(zeta.title, 'Zeta Trip');
  assert.equal(zeta.names, '');
  assert.equal(zeta.path, './files/zeta-trip/itinerary.pdf');
});

test('pdf manifest is empty when the files directory is missing', () => {
  const dir = mkdtempSync(join(tmpdir(), 'travelpdf-empty-'));
  assert.deepEqual(buildPdfManifest(dir), { pdfs: [] });
});

test('meta.json cannot override name, path or thumbnail', () => {
  const dir = fixture();
  writeFileSync(join(dir, 'alpha-site', 'meta.json'), JSON.stringify({ name: 'x', path: '../../evil', thumbnail: 'http://evil' }));
  const { sites } = buildManifest(dir);
  const alpha = sites.find(s => s.name === 'alpha-site');
  assert.equal(alpha.path, './students/alpha-site/index.html');
  assert.equal(alpha.thumbnail, './thumbnails/alpha-site.jpg');
});
