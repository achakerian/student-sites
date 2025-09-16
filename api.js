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
      'portfolio-site',
      'blog-template',
      'docs-site',
      'landing-page'
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
      popular: false
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
    const smartDefaults = {
      'portfolio-site': {
        title: 'Portfolio Template',
        description: 'Professional portfolio showcase',
        category: 'template'
      },
      'blog-template': {
        title: 'Blog Template',
        description: 'Personal blog with articles',
        category: 'template'
      },
      'docs-site': {
        title: 'Documentation Site',
        description: 'API documentation template',
        category: 'template'
      },
      'landing-page': {
        title: 'Landing Page',
        description: 'Product landing page template',
        category: 'template'
      }
    };

    if (smartDefaults[siteName]) {
      return { ...metadata, ...smartDefaults[siteName] };
    }

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
          <a href="${site.path}" data-iframe="true">
            <h3>${site.title}</h3>
            <p class="muted">${site.description}</p>
          </a>
        </li>
      `;
    }).join('');
  }
}