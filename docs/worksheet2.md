# Grow your website with AI — Week 2: add an itinerary

**Your site lives at:** `student-sites.org/students/<site-name>/`
**Submit updates at:** student-sites.org/submit — **Class passcode:** `greatestclass`

This week you go back to the website you built, use your favourite LLM to add an
**itinerary page**, and republish it to Student Sites. The written parts of this
worksheet are raw material for **Assessment 1 — AI and Me: A Professional
Reflection** (individual, 800–1000 words). Fill them in as you go, not at the end.

---

## Part A — Before you touch the AI (5 min)

| | Write it here |
|---|---|
| My **site name** (exactly as published, e.g. `sams-recipes`) | ______________________ |
| My site address: `student-sites.org/students/` | ______________________ `/` |
| The **LLM I'll use** — name *and* version (e.g. ChatGPT — GPT-5, Claude — Fable 5) | ______________________ |
| My itinerary topic — an itinerary that fits my site's theme (food tour for a cooking site, movie-marathon schedule for a movie site, 3-day trip for a travel site…) | ______________________ |

**Prediction (write 2–3 sentences before you start):**
What do you expect the AI to do *well* when updating your site, and where do you
expect it to *struggle or get things wrong*?

> ____________________________________________________________
> ____________________________________________________________
> ____________________________________________________________

*(Keep this honest — you'll compare it against what actually happened in Part E.)*

---

## Part B — Get your files back (5 min)

You'll work from the **published** version of your site, so it doesn't matter if
you lost your Week 1 folder.

1. Go to **github.com/achakerian/student-sites**.
2. Click the green **Code** button → **Download ZIP**.
3. Unzip it, open the `students` folder, and find the folder matching your **site name**.
4. Copy that whole folder to your Desktop. This is your working folder — it has
   everything: `index.html`, `styles.css`, `script.js`, `meta.json`, any images,
   and the `CLAUDE.md` / `PROMPT.md` rules files from the starter kit.

---

## Part C — Add the itinerary with your LLM (25 min)

**Path 1 — chat LLM (ChatGPT, Claude, Gemini, Copilot):**
Upload (or paste) your site's files into the chat, then ask for the change.
A good first prompt:

> "Here is my website. Add a new page `itinerary.html` containing a
> [your topic] itinerary. Link to it from the navigation on `index.html`,
> and match the existing style in `styles.css`. Give me back the complete
> updated files."

Download every updated file the LLM gives you and save it into your working
folder, replacing the old versions.

**Path 2 — Claude Code:**
Open a terminal in your working folder, run `claude`, and describe the itinerary
page you want. It reads `CLAUDE.md` automatically and edits the files in place.

**Check it:** double-click `index.html` — can you reach the itinerary page from
the homepage? Does it look like it belongs to the same site? Keep iterating
until you're happy.

### Prompt log — fill in as you go (at least 3 rows)

| What I asked the AI | What it gave me | What I had to fix or ask again |
|---|---|---|
| | | |
| | | |
| | | |

*(This log is evidence for your reflection — "the AI hallucinated opening hours
for a café that doesn't exist" is worth far more in Assessment 1 than "it
worked fine".)*

---

## Part D — Republish to Student Sites (10 min)

Tick each box:

- [ ] The itinerary page opens and is linked from my homepage
- [ ] The style matches the rest of my site
- [ ] I **checked every fact** the AI put on my pages (places, times, prices, claims)
- [ ] `meta.json` still describes my site correctly (update it if the description or tags should change)
- [ ] My working folder contains **ALL my site's files, not just the new ones** — your upload *replaces* the published site completely, so a zip with only `itinerary.html` deletes everything else
- [ ] Zipped the whole folder (right-click → *Compress* on Mac, *Send to → Compressed folder* on Windows), under 10 MB
- [ ] Submitted at **student-sites.org/submit** with the **same site name** and the passcode
- [ ] Kept my **review link** — my update goes live once it's approved

Same rules as Week 1: plain HTML/CSS/JS, classroom-appropriate, first names
only, only images you're allowed to use.

---

## Part E — Reflection (15 min — do not skip)

These five boxes map directly onto the Assessment 1 rubric. Write in full
sentences; specific beats polished.

**1. Explain it plainly (ULO1).** In 2–3 sentences a non-technical friend would
understand: what did the AI actually *do* when it "updated your website"? Where
does its ability come from, and give **one concrete example from today** of a
limitation you ran into.

> ____________________________________________________________
> ____________________________________________________________
> ____________________________________________________________
> ____________________________________________________________

**2. Prediction vs reality (ULO5).** Reread your Part A prediction. What
surprised you? How has your view of what AI can and can't do shifted since
Week 1?

> ____________________________________________________________
> ____________________________________________________________
> ____________________________________________________________

**3. Opportunities and risks (ULO2).** Imagine a real business building its
website the way you just did. Name **one opportunity and one risk**, each tied
to something that actually happened in your session today.

> Opportunity: ______________________________________________
> ____________________________________________________________
> Risk: ______________________________________________________
> ____________________________________________________________

**4. Accountability stance (ULO3).** The itinerary is published under *your*
name on *your* site. Who is responsible if it contains something wrong,
copied, or inappropriate — you or the AI? Did you check everything it
produced? Name **one thing you would not let an AI decide** on your site, and
state your accountability stance in one sentence.

> ____________________________________________________________
> ____________________________________________________________
> ____________________________________________________________

**5. One step in your learning plan (ULO5).** Based on today, name **one AI
skill you want to improve** (e.g. writing better prompts, verifying AI output,
understanding how these models work), and **one concrete thing you'll do about
it, by when**.

> Skill: ______________________________________________________
> Action + date: ______________________________________________

**6. Attribution record.** Assessment 1 requires citing any GAIT you use. Fill
this in now so the reference is ready:

> Tool + version: ____________________ Date used: ____________
> Web address: ________________________________________________
>
> *APA 7 pattern: Author. (Year). Name of model (Version) [Large language
> model]. URL — e.g. OpenAI. (2022). ChatGPT (Dec 20 version) [Large language
> model]. https://chat.openai.com/*
