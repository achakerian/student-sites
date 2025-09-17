<!--
Guidance for AI coding agents working on the `student-sites` repo.
Keep this file concise and actionable (20-50 lines). Update when repo structure changes.
-->

# Copilot / AI Agent Instructions — student-sites

Quick context
- This is a static, client-side index of student GitHub Pages sites. No build step or server: plain HTML, CSS, and JavaScript.
- Key files: `index.html` (app shell), `api.js` (site discovery + grid generator), `styles.css`.
- Student content lives under `students/<site-name>/` and may include `index.html`, `meta.json` (or `site.json`), `recipes.json`, and assets.

What to do first
- Read `README.md` and `api.js` to understand discovery flow: `StudentSitesAPI.loadSites()` → tries `students/sites.json` → falls back to `getFallbackSites()`.
- Open `index.html` to see how `generateSiteGrid()` output is inserted (`#sites-grid`) and how search/theme toggles work.

Important patterns & conventions
- Metadata files: prefer `meta.json` (example: `students/vintage-cookbook/meta.json`). If missing, `api.js` will attempt to extract <title> from `index.html`.
- Thumbnail and preview: `api.js` expects `thumbnail` paths like `./thumbnails/<site>.jpg`. Card HTML includes an iframe fallback for live preview.
- Recipes/content lists: some sites (e.g., `vintage-cookbook`) load per-site JSON (`recipes.json`) and initialize UI in their own scripts — keep changes localized to that site folder.

Editing rules for changes
- Avoid introducing a build system. This project is intentionally dependency-free and GitHub-Pages friendly.
- When adding sites, create a folder under `students/` containing at minimum `index.html`. Add optional `meta.json` to control title/description/category/thumbnail/tags.
- If changing discovery behavior in `api.js`, preserve the `sites.json` fast-path and the fallback list; update `README.md` to match.

Examples to reference
- Discovery & defaults: `api.js` — see `getFallbackSites()` and `applySmartDefaults()` for site-specific overrides (e.g., `vintage-cookbook`).
- App shell: `index.html` — dynamic insertion into `#sites-grid`, theme toggle and search handlers.
- Metadata example: `students/vintage-cookbook/meta.json` (fields: title, description, category, popular, thumbnail, tags, author, year).

Testing & verification
- Manual: open `index.html` in a browser (or GitHub Pages) to verify site cards render and previews load. No automated tests exist.
- Use browser devtools to inspect network requests made by `api.js` (fetching `meta.json`, `index.html`, `recipes.json`).

Integration notes
- All runtime behavior is client-side fetch calls; ensure relative paths are correct for GitHub Pages (use `./students/...`).
- Adding a `students/sites.json` manifest will short-circuit scanning and should use shape: { "sites": [ {name,path,title,...} ] }.

When you're unsure
- Prefer minimal, local edits. If changing global UI or discovery, add/update `README.md` and mention why the change is safe for GitHub Pages (no build).
- If metadata is ambiguous, prefer `meta.json` presence over scraping HTML titles.

If anything here is unclear, add a short note in an issue and request a follow-up from the repo owner.
