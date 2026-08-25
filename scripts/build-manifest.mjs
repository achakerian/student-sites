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

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dir = resolve(process.argv[2] || 'students');
  const manifest = buildManifest(dir);
  writeFileSync(join(dir, 'sites.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Wrote ${manifest.sites.length} site(s) to ${join(dir, 'sites.json')}`);
}
