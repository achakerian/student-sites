// Simple client-side directory scanner for GitHub Pages
// This reads the students folder structure and generates the site grid

class StudentSitesAPI {
  constructor() {
    this.studentsPath = './students/';
    this.sites = [];
  }

  // Fetch directory listing using GitHub Pages approach
  async loadSites() {
    try {
      // Try to fetch a sites.json manifest first (if it exists)
      const response = await fetch('./students/sites.json');
      if (response.ok) {
        const data = await response.json();
        this.sites = data.sites;
        return this.sites;
      }
    } catch (error) {
      console.log('No sites.json found, using fallback method');
    }

    // Fallback: Use predefined list (since we can't scan directories in browser)
    this.sites = await this.getFallbackSites();
    return this.sites;
  }

  // Fallback method that checks each known site
  async getFallbackSites() {
    const potentialSites = [
      'whiley-recipes',
      'futuristic-constructivist',
      'miami-vice-retro'
    ];

    const sites = [];

    for (const siteName of potentialSites) {
      try {
        // Try to fetch the index.html to see if site exists
        const response = await fetch(`${this.studentsPath}${siteName}/index.html`, { method: 'HEAD' });
        if (response.ok) {
          // Try to get metadata
          const metadata = await this.getSiteMetadata(siteName);
          sites.push({
            name: siteName,
            path: `${this.studentsPath}${siteName}/index.html`,
            ...metadata
          });
        }
      } catch (error) {
        console.log(`Site ${siteName} not found or inaccessible`);
      }
    }

    return sites;
  }

  // Get metadata for a site (title, description, category)
  async getSiteMetadata(siteName) {
    const defaultMetadata = {
      title: this.formatSiteName(siteName),
      description: 'Student site',
      category: 'a',
      popular: false,
      thumbnail: `./thumbnails/${siteName}.jpg`,
      tags: ['HTML', 'CSS']
    };

    try {
      // Try to fetch metadata from meta.json in site folder
      const response = await fetch(`${this.studentsPath}${siteName}/meta.json`);
      if (response.ok) {
        const metadata = await response.json();
        return { ...defaultMetadata, ...metadata };
      }
    } catch (error) {
      // Fallback to extracting from HTML title if available
      try {
        const htmlResponse = await fetch(`${this.studentsPath}${siteName}/index.html`);
        if (htmlResponse.ok) {
          const html = await htmlResponse.text();
          const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
          if (titleMatch) {
            defaultMetadata.title = titleMatch[1].trim();
          }
        }
      } catch (htmlError) {
        console.log(`Could not extract metadata for ${siteName}`);
      }
    }

    // Apply smart defaults based on site name
    return this.applySmartDefaults(siteName, defaultMetadata);
  }

  // Apply smart defaults based on site folder name
  applySmartDefaults(siteName, metadata) {
    return metadata;
  }

  // Format site name for display
  formatSiteName(siteName) {
    return siteName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Generate HTML for site grid
  generateSiteGrid(sites) {
    return sites.map(site => {
      const categories = [site.category];
      if (site.popular) categories.push('popular');

      return `
        <li class="card" data-cat="${categories.join(' ')}">
          <div class="card-thumbnail" data-site-url="${site.path}">
            <img src="${site.thumbnail}" alt="${site.title} thumbnail" onerror="this.parentElement.classList.add('fallback-preview')">
            <div class="live-preview-fallback">
              <iframe src="${site.path}" frameborder="0" scrolling="no" title="${site.title}"></iframe>
              <div class="preview-overlay">
                <span>Live Preview</span>
              </div>
            </div>
          </div>
          <div class="card-content">
            <h3>${site.title}</h3>
            <p class="muted">${site.description}</p>
            <div class="card-tags">
              ${(site.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="card-actions">
              <button class="card-btn preview-btn" data-iframe="true" data-url="${site.path}">Preview</button>
              <a href="${site.path}" target="_blank" class="card-btn fullsite-btn">Go to Full Site</a>
            </div>
          </div>
        </li>
      `;
    }).join('');
  }
}