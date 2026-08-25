> **Using ChatGPT (or any chat AI)?** Paste everything below this line into
> the chat first, then describe the site you want. Ask it to give you the full
> contents of each file so you can save them into this folder.

---

# Rules for the AI helping build this site

You are helping a pair of students build a small static website for a class
showcase. Follow every rule below. If the students ask for something that
breaks a rule, explain why and offer an alternative.

## Files
- Everything lives in THIS folder. Never create or reference files outside it.
- `index.html` must stay at the top level of this folder — it is the entry page.
- Use relative paths only (`styles.css`, `images/photo.png`). Never absolute
  paths or `file://` URLs.
- Plain HTML, CSS and JavaScript only. No build tools, frameworks, bundlers,
  npm or package managers.
- Allowed file types: html, css, js, json, md, txt, png, jpg, jpeg, gif, webp,
  svg, ico, woff, woff2. Nothing else — no zips, videos, PDFs or executables.
- Keep the whole folder under 10 MB and under 200 files. Compress images.

## meta.json
Update `meta.json` so it describes the site:
- `title`: the site's name
- `description`: one sentence
- `tags`: 1–4 short tags, e.g. "HTML", "CSS", "JavaScript", "Portfolio"
Leave `category` and `popular` unchanged.

## Content
- Classroom-appropriate. Nothing lewd, hateful, violent, or that targets a
  real person. The teacher reviews every submission before it is published.
- First names only. No surnames, phone numbers, email addresses, home
  addresses, social-media handles or student IDs.
- Only use images and text the students have the right to use.

## External resources
- Prefer no external dependencies at all.
- If a font or library is genuinely needed, load it only from Google Fonts,
  jsDelivr, unpkg or cdnjs. Every external link is checked by the teacher.
- Never load scripts from anywhere else.

## Quality
- The site must work when `index.html` is opened directly from disk
  (double-click) with no server running.
- Keep the code readable — the students should be able to explain it.

## Before submitting — when the students ask "am I ready?" or "anything else I need?"
Check this folder against EVERY item below and report what passes and what
needs fixing. Offer to fix anything you can. Do not say they're ready unless
all items pass.

Automatic rejections (the upload fails if any of these are wrong):
1. `index.html` is at the top level of this folder.
2. Every file's extension is one of: html, css, js, json, md, txt, png, jpg,
   jpeg, gif, webp, svg, ico, woff, woff2.
3. Total folder size under 10 MB.
4. Fewer than 200 files.
5. No files or folders starting with a dot are needed by the site (they are
   dropped on upload).
6. The students will zip this folder itself, so `index.html` ends up at the
   root of the zip or inside exactly one folder.

Checked by the teacher:
7. `index.html` works when opened directly from disk — all paths relative, no
   `file://`, `/Users/`, `C:\` or absolute paths; no build step.
8. External resources (if any) come only from Google Fonts, jsDelivr, unpkg or
   cdnjs. No other remote scripts.
9. `meta.json` is valid JSON with a real `title` (not "Site Title"), a
   one-sentence `description`, and 1–4 `tags`.
10. Content is classroom-appropriate.
11. First names only — search every file for surnames, phone numbers, emails,
    addresses, social handles or student IDs.
12. Images and text are ones the students have the right to use.

Also remind them what the submit form asks for: their site name (this folder's
name — lowercase letters, numbers, hyphens), both first names, and the class
passcode from their teacher.
