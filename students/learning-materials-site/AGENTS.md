# Repository Guidelines

## Project Structure & Module Organization
- `index.html`: Main UI and content structure.
- `styles.css`: Global styles for layout, theming, and components.
- `script.js`: Client-side interactions (accordion, language toggle, dark mode, progress).
- `images/`: Static assets (optimize before committing).
- `coderunner-integration.js`, `coderunner-styles.css`, `coderunner-test.html`, `CODERUNNER-README.md`: CodeRunner demo and integration helpers.

## Build, Test, and Development Commands
- Local preview (Python): `python3 -m http.server 8080` then visit `http://localhost:8080/index.html` (or `coderunner-test.html`).
- Quick open (no server): Open `index.html` directly in a browser for basic checks.
- Cache-busting tip: Hard-refresh when testing CSS/JS changes (Cmd/Ctrl+Shift+R).

## Coding Style & Naming Conventions
- Indentation: 4 spaces; no tabs.
- HTML: Semantic tags; keep ARIA labels (e.g., `aria-label`, `role`).
- CSS: Kebab-case classes (e.g., `.sticky-nav`, `.progress-indicator`); group related rules; prefer component blocks over deep selectors.
- JavaScript: ES6+ (`const`/`let`); camelCase for variables/functions; descriptive verbs for handlers (e.g., `toggleSidebar`, `updateProgress`). Avoid global leaks; keep feature logic modular.
- Filenames: Kebab-case; follow `<feature>-<purpose>.ext` for auxiliary files (e.g., `coderunner-integration.js`).

## Testing Guidelines
- Manual smoke test: Accordion open/close, language switch (Java/Processing/Python), dark mode toggle, sticky nav, progress bar updates.
- CodeRunner demo: Use `coderunner-test.html` to validate error messaging and suggestions (see `CODERUNNER-README.md`).
- Accessibility: Keyboard navigation works; focus states visible; ARIA attributes preserved.
- Visuals: Test at mobile, tablet, desktop widths; check for console errors.

## Commit & Pull Request Guidelines
- Commits: Small, focused, imperative mood. Conventional style encouraged:
  - `feat(ui): add dark mode toggle`
  - `fix(js): guard null in language switcher`
  - `docs(coderunner): clarify API integration`
- PRs: Clear description, linked issue, before/after screenshots for UI, test plan (steps you ran), and scope of impact.

## Security & Configuration Tips
- Do not commit secrets. If integrating real CodeRunner APIs, keep keys out of source and use placeholders in public code.
- Keep assets local and optimized; avoid unnecessary external CDNs.
- Changes should not introduce network calls without discussion.
