# RSS Feed Integration Guide

This guide explains how to set up automatic technology updates from RSS feeds.

## Overview

The website uses a JSON data file (`technologies.json`) to populate technology cards. You can:
1. Manually edit the JSON file
2. Use the RSS-to-JSON converter script
3. Set up automated updates via GitHub Actions

## Method 1: Manual Updates (Current)

Simply edit `technologies.json` to add new technologies:

```json
{
  "technologies": [
    {
      "id": "new-tech",
      "name": "New Technology",
      "fullName": "Full Technology Name",
      "icon": "🚀",
      "year": 2024,
      "yearLabel": "Since 2024",
      "description": "Brief description.",
      "image": "https://images.unsplash.com/...",
      "detailPage": "technologies/new-tech.html"
    }
  ]
}
```

## Method 2: RSS Feed Converter (Semi-Automated)

### Setup

1. Install Python dependencies:
```bash
pip install feedparser requests
```

2. Edit `rss-to-json.py` and add your RSS feed URLs:
```python
RSS_FEEDS = [
    "https://techcrunch.com/feed/",
    "https://www.wired.com/feed/",
    "https://example.com/your-feed.rss"
]
```

3. Run the converter:
```bash
python rss-to-json.py
```

This will:
- Fetch articles from RSS feeds
- Categorize them by technology type
- Update `technologies.json`
- Preserve existing data

### Popular Tech RSS Feeds

Here are some RSS feeds you can use:

**General Tech News:**
- TechCrunch: `https://techcrunch.com/feed/`
- Wired: `https://www.wired.com/feed/`
- The Verge: `https://www.theverge.com/rss/index.xml`
- Ars Technica: `https://feeds.arstechnica.com/arstechnica/index`

**AI/Machine Learning:**
- MIT Technology Review AI: `https://www.technologyreview.com/topic/artificial-intelligence/feed`
- AI News: `https://www.artificialintelligence-news.com/feed/`

**Blockchain:**
- CoinDesk: `https://www.coindesk.com/arc/outboundfeeds/rss/`
- Blockchain News: `https://blockchain.news/rss`

**Quantum Computing:**
- Quantum Computing Report: `https://quantumcomputingreport.com/feed/`

**IoT:**
- IoT World Today: `https://www.iotworldtoday.com/feed`

**Biotech:**
- GenomeWeb: `https://www.genomeweb.com/rss.xml`
- FierceBiotech: `https://www.fiercebiotech.com/rss`

## Method 3: Automated Updates (Fully Automated)

### GitHub Actions Setup

The repository includes a GitHub Actions workflow (`.github/workflows/update-technologies.yml`) that:
- Runs daily at midnight UTC
- Fetches RSS feeds
- Updates technologies.json
- Creates a pull request with changes

### Enable Automated Updates

1. Push your code to GitHub
2. Ensure workflow has write permissions:
   - Go to Settings > Actions > General
   - Under "Workflow permissions", select "Read and write permissions"
3. The workflow will run automatically every day

### Manual Trigger

You can manually trigger the workflow:
1. Go to Actions tab in your GitHub repository
2. Select "Update Technologies from RSS"
3. Click "Run workflow"

## Method 4: Custom API Integration

For real-time updates, integrate with a custom API:

```javascript
// In script.js, replace loadTechnologies function:
async function loadTechnologies() {
    try {
        const response = await fetch('https://api.your-domain.com/technologies');
        const data = await response.json();
        technologiesData = data.technologies;
        // Rest of the code...
    } catch (error) {
        console.error('Error loading technologies:', error);
    }
}
```

## Creating a Backend API

### Option 1: Node.js + Express

```javascript
const express = require('express');
const app = express();

app.get('/api/technologies', async (req, res) => {
    // Fetch from database or RSS feeds
    const technologies = await fetchTechnologies();
    res.json({ technologies });
});

app.listen(3000);
```

### Option 2: Python + Flask

```python
from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/api/technologies')
def get_technologies():
    with open('technologies.json') as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=3000)
```

### Option 3: Serverless (Netlify/Vercel Functions)

Create `netlify/functions/technologies.js`:

```javascript
exports.handler = async function(event, context) {
    const technologies = await fetchFromRSS();

    return {
        statusCode: 200,
        body: JSON.stringify({ technologies })
    };
};
```

## RSS Feed Format

Your RSS feed should follow standard RSS 2.0 format:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Emerging Technologies Feed</title>
    <link>https://example.com</link>
    <description>Latest emerging technology news</description>

    <item>
      <title>New AI Breakthrough</title>
      <link>https://example.com/article</link>
      <description>Description of the technology...</description>
      <pubDate>Mon, 01 Jan 2024 00:00:00 GMT</pubDate>
      <category>Artificial Intelligence</category>
    </item>

  </channel>
</rss>
```

## Customizing the Parser

Edit `rss-to-json.py` to customize:

### Add New Technology Categories

```python
def categorize_technology(title, description):
    text = (title + " " + description).lower()

    if any(word in text for word in ["5g", "6g", "network"]):
        return {
            "id": "5g",
            "name": "5G Networks",
            "icon": "📶",
            "category": "5g"
        }
    # Add more categories...
```

### Change Keyword Filters

```python
TECH_KEYWORDS = [
    "your keywords here",
    "machine learning",
    "quantum"
]
```

### Adjust Description Length

```python
"description": description[:300] + "..."  # Increase from 200 to 300 chars
```

## Testing

Test the RSS converter locally:

```bash
# Run the converter
python rss-to-json.py

# Check the output
cat technologies.json | python -m json.tool

# Start local server
python -m http.server 8000

# Visit http://localhost:8000
```

## Troubleshooting

### RSS Feed Not Parsing
- Check if the feed URL is accessible
- Verify RSS feed format is valid
- Check firewall/proxy settings

### Technologies Not Categorizing
- Add more keywords to `TECH_KEYWORDS`
- Improve the `categorize_technology` function
- Check RSS feed item descriptions

### Duplicate Technologies
- The merge function uses `id` as unique key
- Technologies with same ID will be merged
- Older years are preserved

## Best Practices

1. **Test First**: Always test RSS feeds locally before deploying
2. **Rate Limiting**: Respect RSS feed rate limits (don't poll too frequently)
3. **Validation**: Validate JSON output before committing
4. **Backup**: Keep backups of `technologies.json` before automated updates
5. **Review**: Review automated PRs before merging

## Advanced: CMS Integration

For a full CMS solution, consider:

### Headless CMS Options
- **Contentful**: Enterprise-grade CMS with great API
- **Strapi**: Open-source, self-hosted CMS
- **Sanity**: Real-time CMS with structured content
- **WordPress + REST API**: Traditional but powerful

### Example: Contentful Integration

```javascript
async function loadTechnologies() {
    const response = await fetch(
        'https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries?content_type=technology',
        {
            headers: {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
            }
        }
    );

    const data = await response.json();
    technologiesData = transformContentfulData(data);
    renderTechnologies(technologiesData, 'heroTechGrid');
}
```

## Support

For questions or issues:
1. Check the main README.md
2. Review this guide
3. Test with the provided example feeds
4. Open an issue on GitHub

---

**Happy automating! 🚀**
