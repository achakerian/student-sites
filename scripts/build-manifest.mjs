#!/usr/bin/env node
// Regenerates students/sites.json from the folders under students/.
// Run by .github/workflows/manifest.yml on every push to main.
import { readdirSync, readFileSync, existsSync, writeFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function titleCase(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function readMeta(dir) {
  const file = join(dir, 'meta.json');
  if (!existsSync(file)) return {};
  try {
    const parsed = JSON.parse(readFileSync(file, 'utf8'));
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function buildManifest(studentsDir) {
  const sites = readdirSync(studentsDir)
    .filter(name => statSync(join(studentsDir, name)).isDirectory())
    .filter(name => existsSync(join(studentsDir, name, 'index.html')))
    .sort()
    .map(name => ({
      title: titleCase(name),
      description: 'Student site',
      category: 'a',
      popular: false,
      tags: ['HTML', 'CSS'],
      ...readMeta(join(studentsDir, name)),
      // Derived from the folder, never from meta.json.
      name,
      path: `./students/${name}/index.html`,
      thumbnail: `./thumbnails/${name}.jpg`,
    }));
  return { sites };
}

// Regenerates travelpdf/list.json from the folders under travelpdf/files/.
export function buildPdfManifest(travelpdfDir) {
  const filesDir = join(travelpdfDir, 'files');
  if (!existsSync(filesDir)) return { pdfs: [] };
  const pdfs = readdirSync(filesDir)
    .filter(name => statSync(join(filesDir, name)).isDirectory())
    .filter(name => existsSync(join(filesDir, name, 'itinerary.pdf')))
    .sort()
    .map(name => ({
      title: titleCase(name),
      names: '',
      submitted: null,
      ...readMeta(join(filesDir, name)),
      // Derived from the folder, never from meta.json.
      name,
      path: `./files/${name}/itinerary.pdf`,
    }));
  return { pdfs };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dir = resolve(process.argv[2] || 'students');
  const manifest = buildManifest(dir);
  writeFileSync(join(dir, 'sites.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Wrote ${manifest.sites.length} site(s) to ${join(dir, 'sites.json')}`);

  const travelpdfDir = resolve(process.argv[3] || 'travelpdf');
  if (existsSync(travelpdfDir)) {
    const pdfManifest = buildPdfManifest(travelpdfDir);
    writeFileSync(join(travelpdfDir, 'list.json'), JSON.stringify(pdfManifest, null, 2) + '\n');
    console.log(`Wrote ${pdfManifest.pdfs.length} PDF(s) to ${join(travelpdfDir, 'list.json')}`);
  }
}
