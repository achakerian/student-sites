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
