# Your student site — read me first

This folder is your website. Everything you build stays in here. Your tutor
reviews every submission before it goes live at https://student-sites.org.

## Steps

1. **Pick a site name** with your partner: lowercase letters, numbers and hyphens
   only, e.g. `sams-recipes`. Rename this folder to that name. It becomes your
   web address: `student-sites.org/students/sams-recipes/`.
2. **Build it with AI.**
   - *Claude Code:* open a terminal in this folder, run `claude`, describe the site
     you want. It reads the rules in `CLAUDE.md` automatically.
   - *ChatGPT:* paste the contents of `PROMPT.md` into the chat, then describe your
     site. Save each file it gives you into this folder.
3. **Check it.** Double-click `index.html` to open it in your browser. Keep
   iterating until you're happy.
4. **Fill in `meta.json`** — title, a one-sentence description, a few tags.
5. **Ask the AI: "Is there anything else I need before I submit?"** It will check
   this folder against the checklist below.
6. **Zip and submit.** Right-click this folder → *Compress* (Mac) or
   *Send to → Compressed folder* (Windows). Go to https://student-sites.org/submit,
   enter your site name, your first names, the class passcode (from your tutor),
   and upload the zip.
7. **Keep your review link.** It shows whether your site is waiting, published, or
   needs changes. Resubmit as often as you like — the newest upload replaces the
   previous one.

## Ready to submit? — the complete checklist

Your upload is rejected automatically if any of the first six fail. The rest are
checked by your tutor.

**Files**
- [ ] `index.html` is at the top level of this folder (not inside a subfolder).
- [ ] Every file is one of: html, css, js, json, md, txt, png, jpg, jpeg, gif, webp,
      svg, ico, woff, woff2. No videos, PDFs, zips, executables or anything else.
- [ ] The whole folder is under 10 MB.
- [ ] There are fewer than 200 files.
- [ ] No hidden files or folders (names starting with a dot) are needed by the site.
- [ ] You're zipping this folder itself — the zip contains your files, or one folder
      containing them. Not a folder inside a folder inside a folder.

**It works**
- [ ] `index.html` opens correctly by double-clicking it (no server needed).
- [ ] All links, images, styles and scripts use relative paths (`styles.css`,
      `images/photo.png`) — nothing points to `C:\`, `/Users/`, or `file://`.
- [ ] No plain HTML/CSS/JS build step is required — no npm, no frameworks, no bundlers.
- [ ] External fonts or libraries (if any) load only from Google Fonts, jsDelivr,
      unpkg or cdnjs. No other remote scripts.

**meta.json**
- [ ] `title` is your site's real name (not "Site Title").
- [ ] `description` is one real sentence.
- [ ] `tags` has 1–4 short tags.
- [ ] The file is still valid JSON (no trailing commas, quotes around keys).

**Content**
- [ ] Classroom-appropriate — nothing lewd, hateful, violent, or targeting a real person.
- [ ] First names only. No surnames, phone numbers, emails, addresses, social handles
      or student IDs anywhere in the site.
- [ ] You have the right to use every image and piece of text.

**For the submit form**
- [ ] Your site name (the folder name) — same one every time you resubmit.
- [ ] Both partners' first names.
- [ ] The class passcode from your tutor.

## If the upload is rejected

- **"No index.html found at the top level"** — zip the folder that contains
  `index.html` directly.
- **"… isn't an allowed file type"** — remove that file from the folder and re-zip.
- **"Your zip is over 10 MB"** — compress or remove large images.
- **"That passcode isn't right"** — check with your tutor; it's case-sensitive.
- Anything else — ask your tutor.
