# Quick Start Guide

Get your Emerging Technologies website up and running in minutes!

## Step 1: View Locally

Since the site loads data from JSON, you need a local server:

### Option A: Python (Recommended)
```bash
cd "emerging technologies"
python -m http.server 8000
```
Open: http://localhost:8000

### Option B: Node.js
```bash
npx http-server
```
Open: http://localhost:8080

### Option C: PHP
```bash
php -S localhost:8000
```
Open: http://localhost:8000

## Step 2: Add a New Technology

### Quick Method: Edit JSON

Open `technologies.json` and add:

```json
{
  "id": "edge-computing",
  "name": "Edge Computing",
  "fullName": "Edge Computing",
  "icon": "☁️",
  "year": 2010,
  "yearLabel": "Since 2010",
  "description": "Processing data closer to where it's generated for faster response times.",
  "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
  "detailPage": "technologies/edge-computing.html"
}
```

### Create Detail Page

1. Copy any existing page from `technologies/` folder
2. Rename to `edge-computing.html`
3. Update the content
4. Save!

Refresh the browser - your new technology appears automatically! ✨

## Step 3: Customize

### Change Colors
Edit `styles.css`:
```css
:root {
    --primary-color: #667eea;  /* Change this */
    --secondary-color: #764ba2; /* And this */
}
```

### Change Images
Find images on [Unsplash](https://unsplash.com), copy the URL, paste in `technologies.json`

### Add More Particles
In `index.html`, add more `<div class="particle"></div>` inside `.hero-background`

## Step 4: Deploy

### GitHub Pages (Free)
1. Create GitHub repository
2. Push your code
3. Settings > Pages > Select main branch
4. Visit `https://yourusername.github.io/repo-name`

### Netlify (Free)
1. Drag & drop folder to [Netlify](https://app.netlify.com)
2. Done! Get instant URL

### Vercel (Free)
```bash
npm i -g vercel
vercel
```

## Adding RSS Auto-Updates

### Quick Setup

1. Install Python dependencies:
```bash
pip install feedparser requests
```

2. Edit `rss-to-json.py`:
```python
RSS_FEEDS = [
    "https://techcrunch.com/feed/",
    "https://www.wired.com/feed/"
]
```

3. Run it:
```bash
python rss-to-json.py
```

4. Check `technologies.json` - it's updated!

### Automate with GitHub Actions

1. Push to GitHub
2. Enable Actions in Settings
3. It runs daily at midnight automatically!

See `RSS-INTEGRATION.md` for more details.

## Tips & Tricks

### Search Test
- Type "AI" in the search bar
- Only AI-related cards show up
- Clear search to see all

### Sorted by Year
Technologies automatically sort oldest to newest

### Mobile Responsive
Try it on your phone - it adapts!

### Add Your Own Tech
Create a JSON entry, create a detail page, done!

## Troubleshooting

### Cards Not Showing?
- Check browser console (F12)
- Make sure local server is running
- Verify `technologies.json` is valid JSON

### Images Not Loading?
- Check Unsplash URLs are complete
- Try a different image URL
- Ensure you have internet connection

### Search Not Working?
- Clear browser cache
- Check `script.js` is loaded
- Look for JavaScript errors in console

## What's Next?

- Add more technologies to `technologies.json`
- Customize colors and styling
- Create your own detail pages
- Set up RSS automation
- Deploy to the web!

## Need Help?

Check out:
- `README.md` - Full documentation
- `RSS-INTEGRATION.md` - RSS feed guide
- GitHub Issues - Ask questions

---

**You're all set! 🚀 Start building!**
