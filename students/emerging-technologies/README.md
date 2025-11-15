# Emerging Technology Website

A modern, dynamic website showcasing emerging technologies with exceptional UI/UX.

## Features

- **Dynamic Content Loading**: Technologies are loaded from a JSON data feed
- **Animated Particle Background**: Floating particles across all pages
- **Search Functionality**: Real-time filtering of technologies
- **Year-Based Sorting**: Technologies automatically ordered by emergence year
- **Responsive Design**: Works seamlessly on all devices
- **Clickable Tech Cards**: Each card links to a detailed page

## Project Structure

```
emerging technologies/
├── index.html              # Main homepage
├── styles.css              # All styling and animations
├── script.js               # JavaScript functionality
├── technologies.json       # Data feed (RSS/JSON format)
├── technologies/           # Technology detail pages
│   ├── ai.html
│   ├── quantum.html
│   ├── blockchain.html
│   ├── ar-vr.html
│   ├── iot.html
│   └── biotech.html
└── README.md              # This file
```

## Adding New Technologies

### Method 1: Update JSON File (Recommended)

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
      "description": "Brief description of the technology.",
      "image": "https://images.unsplash.com/your-image-url",
      "detailPage": "technologies/new-tech.html"
    }
  ]
}
```

### Method 2: RSS Feed Integration (Future Enhancement)

To integrate with an external RSS feed:

1. **Create a feed parser script** (feed-parser.js):
```javascript
async function fetchRSSFeed(feedUrl) {
    const response = await fetch(feedUrl);
    const xml = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    // Parse RSS items and convert to technologies.json format
}
```

2. **Automated Updates**: Set up a scheduled task (cron job or GitHub Actions) to:
   - Fetch RSS feed
   - Parse new technologies
   - Update technologies.json
   - Generate detail pages automatically

### Method 3: API Integration

For real-time data, replace the JSON fetch with an API call:

```javascript
async function loadTechnologies() {
    const response = await fetch('https://api.your-domain.com/technologies');
    const data = await response.json();
    // Process and render...
}
```

## Creating Detail Pages

When adding a new technology, create a corresponding HTML file in the `technologies/` folder:

1. Copy an existing detail page (e.g., `technologies/ai.html`)
2. Update the content:
   - Hero background image
   - Icon and title
   - Overview and sections
   - Timeline and applications
3. Save as `technologies/your-tech-name.html`

## Local Development

To run locally, you'll need a local server (due to CORS restrictions on JSON loading):

### Option 1: Python
```bash
python -m http.server 8000
# Visit http://localhost:8000
```

### Option 2: Node.js (http-server)
```bash
npx http-server
# Visit http://localhost:8080
```

### Option 3: VS Code Live Server
Install the "Live Server" extension and click "Go Live"

## Customization

### Colors and Styling
Edit `styles.css` CSS variables:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
}
```

### Particle Animation
Adjust particle count and behavior in `index.html` (hero-background section)

### Search Behavior
Modify `initializeSearch()` function in `script.js`

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern animations and effects
- **Vanilla JavaScript**: No frameworks, pure performance
- **JSON**: Data feed format
- **Unsplash**: High-quality images

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] CMS integration for easy content management
- [ ] RSS feed auto-population
- [ ] Admin dashboard for adding technologies
- [ ] Newsletter subscription
- [ ] Technology comparison tool
- [ ] Filter by category/industry
- [ ] Dark/light mode toggle
- [ ] Multilingual support

## License

MIT License - feel free to use and modify as needed.

## Credits

- Images: [Unsplash](https://unsplash.com)
- Icons: Emoji unicode characters
- Design: Custom UI/UX

---

**Need help?** Open an issue or contact the development team.
