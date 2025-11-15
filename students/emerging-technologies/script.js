// ===== Global Variables =====
let technologiesData = [];

// ===== Load Technologies from JSON =====
async function loadTechnologies() {
    try {
        console.log('Starting to load technologies...');
        const response = await fetch('technologies.json');
        console.log('Response received:', response.status);
        const data = await response.json();
        console.log('Data parsed:', data);
        technologiesData = data.technologies;
        console.log('Technologies count:', technologiesData.length);

        // Sort by year (oldest first for main display)
        technologiesData.sort((a, b) => a.year - b.year);

        // Render newest technologies on home page
        if (document.getElementById('newestGrid')) {
            renderNewestTechnologies();
        }

        // Render all technologies on technologies page
        if (document.getElementById('techGrid')) {
            renderTechnologies(technologiesData, 'techGrid');
        }

        // Update overview stats
        updateOverviewStats();

        // Initialize search after loading
        initializeSearch();

        // Apply scroll animations
        applyScrollAnimations();
    } catch (error) {
        console.error('Error loading technologies:', error);
    }
}

// ===== Render Technologies =====
function renderTechnologies(technologies, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    grid.innerHTML = '';

    technologies.forEach(tech => {
        const card = document.createElement('a');
        card.href = tech.detailPage;
        card.className = 'tech-card';
        card.setAttribute('data-tech', tech.id);
        card.setAttribute('data-year', tech.year);
        card.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('${tech.image}')`;

        card.innerHTML = `
            <div class="tech-icon">${tech.icon}</div>
            <h3>${tech.name}</h3>
            <span class="tech-year">${tech.yearLabel}</span>
            <p>${tech.description}</p>
        `;

        grid.appendChild(card);
    });
}

// ===== Render Newest Technologies =====
function renderNewestTechnologies() {
    const grid = document.getElementById('newestGrid');
    if (!grid) return;

    // Get all technologies sorted by year (newest first)
    const newest = [...technologiesData]
        .sort((a, b) => b.year - a.year);

    grid.innerHTML = '';

    newest.forEach(tech => {
        const card = document.createElement('a');
        card.href = tech.detailPage;
        card.className = 'newest-card';

        card.innerHTML = `
            <div class="newest-thumbnail" style="background-image: url('${tech.image}')">
                <span class="newest-badge">NEW</span>
                <span class="newest-icon">${tech.icon}</span>
            </div>
            <div class="newest-info">
                <h3>${tech.name}</h3>
                <span class="newest-year">${tech.yearLabel}</span>
            </div>
        `;

        grid.appendChild(card);
    });
}

// ===== Render Example Technologies =====
function renderExampleTechnologies() {
    const grid = document.getElementById('examplesGrid');
    if (!grid) return;

    // Get 2-3 random technologies from middle range
    const middleStart = Math.floor(technologiesData.length / 3);
    const middleEnd = Math.floor(technologiesData.length * 2 / 3);
    const middleTechs = technologiesData.slice(middleStart, middleEnd);

    // Shuffle and take 2
    const examples = middleTechs.sort(() => 0.5 - Math.random()).slice(0, 2);

    grid.innerHTML = '';

    examples.forEach(tech => {
        const card = document.createElement('a');
        card.href = tech.detailPage;
        card.className = 'newest-card';

        card.innerHTML = `
            <div class="newest-thumbnail" style="background-image: url('${tech.image}')">
                <span class="newest-icon">${tech.icon}</span>
            </div>
            <div class="newest-info">
                <h3>${tech.name}</h3>
                <span class="newest-year">${tech.yearLabel}</span>
            </div>
        `;

        grid.appendChild(card);
    });
}

// ===== Update Overview Stats =====
function updateOverviewStats() {
    const totalTechEl = document.getElementById('totalTech');
    const oldestYearEl = document.getElementById('oldestYear');
    const newestYearEl = document.getElementById('newestYear');

    if (!totalTechEl || !oldestYearEl || !newestYearEl) return;

    // Total technologies
    totalTechEl.textContent = technologiesData.length;

    // Oldest technology
    const oldest = technologiesData.reduce((min, tech) =>
        tech.year < min.year ? tech : min
    , technologiesData[0]);
    oldestYearEl.textContent = oldest.year;

    // Newest technology
    const newest = technologiesData.reduce((max, tech) =>
        tech.year > max.year ? tech : max
    , technologiesData[0]);
    newestYearEl.textContent = newest.year;
}

// ===== Navigation Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== Navbar Scroll Effect =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Search Functionality =====
function initializeSearch() {
    const searchBar = document.getElementById('techSearch');
    if (!searchBar) return;

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        const filteredTechs = technologiesData.filter(tech => {
            return tech.name.toLowerCase().includes(searchTerm) ||
                   tech.description.toLowerCase().includes(searchTerm) ||
                   tech.id.toLowerCase().includes(searchTerm);
        });

        renderTechnologies(filteredTechs, 'techGrid');
        applyScrollAnimations();
    });
}

// ===== Tech Cards Animation on Scroll =====
function applyScrollAnimations() {
    const techCards = document.querySelectorAll('.tech-card');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const techCardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                techCardsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    techCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        techCardsObserver.observe(card);

        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== Smooth Scroll with Offset =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const targetPosition = target.offsetTop - 80;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Parallax Effect for Hero Background =====
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});


// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Dynamic Year in Footer =====
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = `&copy; ${currentYear} EmergeTech. Innovation for tomorrow.`;
}

// ===== Keyboard Navigation Enhancement =====
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ===== Performance Optimization: Debounce Scroll Events =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedUpdateNav = debounce(updateActiveNav, 10);

window.addEventListener('scroll', debouncedUpdateNav);

// ===== Console Welcome Message =====
console.log('%c Welcome to EmergeTech! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px;');
console.log('%c Innovation for tomorrow. ', 'color: #667eea; font-size: 14px;');

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    loadTechnologies();
});
