import { unzipSync } from 'fflate';

export const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{1,38}[a-z0-9])$/;
export const MAX_ZIP_BYTES = 10 * 1024 * 1024;
export const MAX_FILES = 200;
export const MAX_NAMES_LENGTH = 80;
export const ALLOWED_EXTENSIONS = new Set([
  'html', 'css', 'js', 'json', 'md', 'txt',
  'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'ico', 'woff', 'woff2',
]);

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateSlug(input) {
  const slug = String(input ?? '').trim().toLowerCase();
  if (!SLUG_RE.test(slug)) {
    throw new ValidationError(
      'Site name must be 3–40 characters using only lowercase letters, numbers and hyphens, and must start and end with a letter or number (e.g. "sams-recipes").'
    );
  }
  return slug;
}

export function validateNames(input) {
  const names = String(input ?? '').trim();
  if (names.length > MAX_NAMES_LENGTH) {
    throw new ValidationError(`Names must be ${MAX_NAMES_LENGTH} characters or fewer — first names only.`);
  }
  return names;
}

function extensionOf(path) {
  const base = path.slice(path.lastIndexOf('/') + 1);
  const dot = base.lastIndexOf('.');
  return dot === -1 ? '' : base.slice(dot + 1).toLowerCase();
}

function isJunk(path) {
  if (path.endsWith('/')) return true; // directory entry
  const segments = path.split('/');
  if (segments[0] === '__MACOSX') return true;
  return segments.some(s => s.startsWith('.') && s !== '..');
}

function assertSafePath(path) {
  if (path.startsWith('/') || path.includes('\\') || path.split('/').some(s => s === '..' || s === '' || s === '.')) {
    throw new ValidationError(`The zip contains an unsafe file path: "${path}". Re-zip just your site folder and try again.`);
  }
}

function stripWrappingFolder(entries) {
  const firstSegments = new Set(entries.map(([path]) => path.split('/')[0]));
  const allNested = entries.every(([path]) => path.includes('/'));
  if (firstSegments.size !== 1 || !allNested) return entries;
  const prefixLength = [...firstSegments][0].length + 1;
  return entries.map(([path, data]) => [path.slice(prefixLength), data]);
}

export function extractSite(zipBytes) {
  if (zipBytes.byteLength > MAX_ZIP_BYTES) {
    throw new ValidationError('Your zip is over 10 MB. Compress or remove large images and try again.');
  }
  let unzipped;
  try {
    unzipped = unzipSync(zipBytes);
  } catch {
    throw new ValidationError("That file doesn't look like a valid .zip. Right-click your site folder and choose Compress / Send to → Compressed folder.");
  }

  let entries = Object.entries(unzipped).filter(([path]) => !isJunk(path));
  if (entries.length === 0) {
    throw new ValidationError('Your zip is empty. Make sure you zipped the folder containing index.html.');
  }
  entries.forEach(([path]) => assertSafePath(path));
  entries = stripWrappingFolder(entries);

  if (entries.length > MAX_FILES) {
    throw new ValidationError(`Your site has ${entries.length} files — the limit is ${MAX_FILES}. Remove anything unused.`);
  }
  for (const [path] of entries) {
    if (!ALLOWED_EXTENSIONS.has(extensionOf(path))) {
      throw new ValidationError(`"${path}" isn't an allowed file type. Allowed: ${[...ALLOWED_EXTENSIONS].join(', ')}.`);
    }
  }
  if (!entries.some(([path]) => path === 'index.html')) {
    throw new ValidationError('No index.html found at the top level of your zip. Zip the folder that contains index.html directly.');
  }

  return entries
    .map(([path, data]) => ({ path, data }))
    .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
}

const EXTERNAL_ATTR_RE = /<(script|iframe|link)\b[^>]*?\b(?:src|href)\s*=\s*["']?((?:https?:)?\/\/[^"'\s>]+)/gi;

export function findExternalResources(files) {
  const found = [];
  const decoder = new TextDecoder();
  for (const file of files) {
    if (extensionOf(file.path) !== 'html') continue;
    const html = decoder.decode(file.data);
    for (const match of html.matchAll(EXTERNAL_ATTR_RE)) {
      found.push(`${file.path}: ${match[2]}`);
    }
  }
  return found;
}
