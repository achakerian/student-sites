# Student Sites

A dynamic, self-maintaining index of student websites hosted on GitHub Pages. This site automatically discovers and displays student projects in an organized, searchable grid with live previews.

## Purpose

This platform serves as a centralized showcase for student web development projects, making it easy to:
- Browse and discover student websites
- Search for specific projects or topics
- Preview sites without leaving the main index
- Filter content by categories
- Switch between light and dark themes for comfortable viewing

## How It Works

1. **Page loads** → API scans known directories in the `students/` folder
2. **For each directory** → Checks if `index.html` exists
3. **Loads metadata** → From `site.json` or HTML title extraction
4. **Generates cards** → Creates responsive HTML cards for each discovered site
5. **Filtering** → CSS-based category filtering and live search
6. **Preview** → Modal iframe viewer for interactive site previews

## Features

- **🔍 Live Search** - Filter sites by name or description in real-time
- **🌙 Dark/Light Mode** - Toggle between themes with smooth transitions
- **📋 Site Index** - Organized grid layout of all available sites
- **🖥️ Live Previews** - View sites in modal overlays without navigation
- **📱 Responsive Design** - Works seamlessly on all devices
- **⚡ Auto-Discovery** - Automatically finds and displays new sites

## Adding New Sites

Simply create a new folder in `students/` with:
- `index.html` (required)
- `site.json` or `meta.json` (optional metadata)

The API automatically discovers and displays new sites on the next page load.

## Technical Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Hosting**: GitHub Pages
- **Discovery**: Client-side directory scanning via fetch API
- **Styling**: CSS Grid, CSS Variables for theming
- **No Dependencies**: Pure web standards, no build process required