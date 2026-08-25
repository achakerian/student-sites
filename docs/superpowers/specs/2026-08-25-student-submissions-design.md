# Student site submissions with teacher approval — design

**Date:** 2026-08-25
**Status:** approved in conversation, implementing

## Goal

Let ~15–20 student pairs (no GitHub accounts, using ChatGPT or Claude Code
locally) build and repeatedly resubmit their own site during a one-week
activity, with nothing reaching `student-sites.org` until the teacher
approves it. A worksheet QR code is the only entry point students get.

## Non-goals

- Durable multi-term infrastructure. Everything is scoped to one week and
  is inert once the GitHub token is revoked.
- Automated content moderation. The teacher reviews every submission.
- Per-student authentication. A shared class passcode gates spam only.
- Preserving the six existing sites under `students/`. They are removed.

## Components

```
student-sites/
├── start/index.html          # QR target: instructions + starter zip + links
├── start/starter.zip         # built from template/ by scripts/build-starter.sh
├── submit/index.html         # upload form → Worker
├── template/                 # starter files: index.html, styles.css, meta.json,
│                             #   CLAUDE.md, PROMPT.md
├── students/                 # one folder per approved site (+ sites.json)
├── scripts/build-manifest.mjs   # regenerates students/sites.json
├── scripts/build-starter.sh     # zips template/ → start/starter.zip
├── .github/workflows/manifest.yml
└── worker/                   # Cloudflare Worker (wrangler)
    ├── wrangler.toml
    ├── src/index.js          # fetch handler (thin)
    ├── src/validate.js       # zip parsing + rules (pure, unit-tested)
    ├── src/github.js         # branch/commit/PR via REST API (pure-ish, mocked)
    └── test/*.test.js        # vitest
```

## 1. Student entry point — `/start`

Static page styled with the existing `styles.css`. Steps shown:

1. Download `starter.zip` and unzip it to a folder named after the site
   (their slug).
2. Open the folder in Claude Code, or paste `PROMPT.md` into ChatGPT, and
   describe the site. `CLAUDE.md` is read automatically by Claude Code.
3. Open `index.html` in a browser to check it.
4. Zip the folder and submit at `/submit`. Keep the returned review link.

`CLAUDE.md` / `PROMPT.md` (identical content) tell the AI:
- everything lives in this one folder; relative paths only; no build step
- `index.html` at the root; fill in `meta.json` (title, description, tags)
- allowed files: html, css, js, json, md, txt, png, jpg, jpeg, gif, webp,
  svg, ico, woff, woff2; total under 10 MB, under 200 files
- no surnames, contact details or student IDs; classroom-appropriate
- must not load remote scripts except from well-known CDNs (flagged
  for review, not blocked)

## 2. Submit page — `/submit`

Form fields: **slug** (`^[a-z0-9](?:[a-z0-9-]{1,38}[a-z0-9])$`, lowercased
on input), **names** (first names, free text ≤ 80 chars), **passcode**,
**zip file**. JS posts `multipart/form-data` to `WORKER_URL` (constant at
top of the page). Responses:

- 200 `{ ok: true, slug, submission, prUrl, previewUrl }` → success panel
  with the PR link ("your review link") and preview link.
- 4xx `{ ok: false, error }` → the message is shown verbatim. Worker
  errors are written in plain English for students.

## 3. Worker — `POST /submit`

Environment: vars `GITHUB_OWNER`, `GITHUB_REPO`, `ALLOWED_ORIGIN`;
secrets `GITHUB_TOKEN` (fine-grained PAT: this repo only, Contents RW +
Pull requests RW, 14-day expiry), `PASSCODE`.

Pipeline, each step returning a 4xx with a student-readable message on
failure:

1. CORS: only `ALLOWED_ORIGIN` (and `OPTIONS` preflight).
2. Passcode equals `PASSCODE` (constant-time compare).
3. Slug matches the regex; names ≤ 80 chars (optional).
4. Zip ≤ 10 MB. Unzip in memory with `fflate`.
5. Normalise: if every entry shares one top-level directory, strip it.
   Drop directory entries, `__MACOSX/`, `.DS_Store`, any dotfile/dotdir.
6. Reject: path containing `..` or starting with `/`; extension not in
   the allowlist; more than 200 files; missing root `index.html`.
7. Build the commit via the GitHub REST API:
   - `GET /git/ref/heads/main` → base sha; `GET /git/trees/{sha}?recursive=1`
   - blobs: `POST /git/blobs` (base64) for each file
   - tree: `POST /git/trees` with `base_tree` = main tree, entries for each
     uploaded file at `students/<slug>/...` plus `sha: null` entries for
     every existing path under `students/<slug>/` not in the upload
     (wholesale replacement — latest upload wins)
   - commit: `POST /git/commits`, parent = main sha,
     message `Site: <slug> — submission by <names>`
   - ref: `PATCH /git/refs/heads/site/<slug>` with `force: true`, or
     `POST /git/refs` if the branch doesn't exist
8. PR: `GET /pulls?head=<owner>:site/<slug>&state=open`. If one exists,
   `PATCH` its body; else `POST /pulls` (title `Site: <slug>`, base `main`).
   Submission number = count of all PRs for that head (`state=all`) + 1
   when creating, or previous number + 1 (parsed from body) when updating.
   Body contains: names, submission number, UTC timestamp, preview link
   `https://raw.githack.com/<owner>/<repo>/site/<slug>/students/<slug>/index.html`,
   file list with sizes, and a **⚠ external resources** section listing any
   `<script src>`, `<iframe src>` or `<link href>` pointing off-site.
9. Respond 200 with the PR URL.

Unhandled errors → 500 `{ ok:false, error:"Something went wrong on our
side — try again in a minute, or tell your teacher." }` and `console.error`.

Known limitation (accepted): any student with the passcode can submit to
any slug. Names in the PR body make this visible; fine for one week.

## 4. Review queue (teacher)

GitHub PR list filtered `is:open Site:`. Open the preview link → **Merge**
(any merge method) → live within ~1 minute. Reject → close with a comment;
students can read the public PR page without an account and resubmit
(creates a new PR). `gh pr list --search "Site:"` / `gh pr merge N` for
batching.

## 5. Index auto-discovery

`.github/workflows/manifest.yml`: on `push` to `main` with paths
`students/**` (ignoring `students/sites.json`), run
`node scripts/build-manifest.mjs`, commit `students/sites.json` back as
`github-actions[bot]` if changed. `.github/` is removed from `.gitignore`.

`build-manifest.mjs` (no dependencies): for each `students/*/index.html`,
merge `meta.json` (if valid JSON) over defaults
`{ title: <Title Case slug>, description: "Student site", category: "a",
popular: false, tags: ["HTML","CSS"] }`, set `name`, `path`
(`./students/<slug>/index.html`), `thumbnail`
(`./thumbnails/<slug>.jpg`), sort by slug, write `{ "sites": [...] }`.
`api.js` already prefers `sites.json`; its hardcoded fallback list is
emptied.

## 6. Existing sites

The six folders under `students/` are deleted in the setup commit. They
remain in git history.

## 7. Testing

- `worker/test/validate.test.js`: zip normalisation, each rejection rule,
  external-resource detection (build fixtures with `fflate.zipSync`).
- `worker/test/github.test.js`: tree entries include deletions for stale
  files, branch create-vs-update, PR create-vs-update and submission
  numbering, with a mocked `fetch`.
- `scripts/build-manifest.mjs`: run against a temp `students/` tree.
- Manual end-to-end before class: submit a zip to slug `test-site`,
  confirm PR + preview, merge, confirm the site appears in the index, then
  delete the folder.

## 8. One-time setup (teacher)

1. Create a fine-grained GitHub PAT (repo: `achakerian/student-sites`;
   Contents RW, Pull requests RW; 14 days).
2. Cloudflare account; `npx wrangler login`.
3. `cd worker && npx wrangler secret put GITHUB_TOKEN` / `PASSCODE`,
   `npx wrangler deploy`; paste the Worker URL into `submit/index.html`.
4. After the week: revoke the PAT.
