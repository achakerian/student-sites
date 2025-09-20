// Learning Materials Site - Interactive Accordion with Language Support
let currentLanguage = 'java'; // Default language

// Prerequisites and Learning Outcomes Data Structure
const topicData = {
    'variables': {
        prerequisites: {
            java: [
                'Basic understanding of what a computer program is',
                'Familiarity with typing and basic keyboard use',
                'No prior programming experience required!'
            ],
            processing: [
                'Basic understanding of visual concepts (shapes, colors)',
                'Familiarity with the Processing IDE',
                'No prior programming experience required!'
            ],
            python: [
                'Basic understanding of what a computer program is',
                'Familiarity with typing and basic keyboard use',
                'No prior programming experience required!'
            ]
        },
        learningOutcomes: {
            java: [
                'How to create and name variables',
                'Different types of data (numbers, text, true/false)',
                'How to change variable values',
                'Best practices for variable naming'
            ],
            processing: [
                'How to create variables for visual elements',
                'Understanding data types for graphics (int, float, color)',
                'Using variables for animation and interaction',
                'Working with built-in Processing variables'
            ],
            python: [
                'How to create and name variables',
                'Different types of data (numbers, strings, booleans)',
                'Dynamic typing in Python',
                'Best practices for variable naming in Python'
            ]
        }
    },
    'operations': {
        prerequisites: {
            java: [
                'Understanding of variables and data types',
                'Basic math skills (addition, subtraction, etc.)',
                'Knowledge of how to create simple variables'
            ],
            processing: [
                'Understanding of variables and data types',
                'Basic math concepts for visual calculations',
                'Familiarity with coordinate systems'
            ],
            python: [
                'Understanding of variables and data types',
                'Basic math skills (addition, subtraction, etc.)',
                'Knowledge of how to create simple variables'
            ]
        },
        learningOutcomes: {
            java: [
                'Arithmetic operations (+, -, *, /, %)',
                'String operations (combining text)',
                'Comparison operations (>, <, ==)',
                'Assignment and compound operations'
            ],
            processing: [
                'Arithmetic operations for visual calculations',
                'String operations for text display',
                'Mathematical functions (sin, cos, random)',
                'Color operations and blending'
            ],
            python: [
                'Arithmetic operations and operator precedence',
                'String operations and formatting',
                'Comparison and logical operations',
                'Python-specific operators (**, //)'
            ]
        }
    },
    'conditions': {
        prerequisites: {
            java: [
                'Understanding of variables and data types',
                'Knowledge of basic operations',
                'Familiarity with boolean values (true/false)'
            ],
            processing: [
                'Understanding of variables and operations',
                'Basic knowledge of mouse and keyboard interaction',
                'Familiarity with coordinate systems'
            ],
            python: [
                'Understanding of variables and data types',
                'Knowledge of basic operations',
                'Familiarity with boolean values and comparison operators'
            ]
        },
        learningOutcomes: {
            java: [
                'How to write if, else if, and else statements',
                'Understanding logical operators (&&, ||, !)',
                'Nested conditional structures',
                'Best practices for conditional logic'
            ],
            processing: [
                'Interactive conditionals with mouse and keyboard',
                'Visual feedback based on conditions',
                'Animation control with conditionals',
                'State management in interactive sketches'
            ],
            python: [
                'Python conditional syntax (if, elif, else)',
                'Logical operators (and, or, not)',
                'Truthiness and falsy values in Python',
                'Conditional expressions (ternary operator)'
            ]
        }
    },
    'loops': {
        prerequisites: {
            java: [
                'Understanding of variables and data types',
                'Knowledge of conditional statements',
                'Basic understanding of program flow'
            ],
            processing: [
                'Understanding of variables and conditionals',
                'Knowledge of coordinate systems',
                'Basic animation concepts'
            ],
            python: [
                'Understanding of variables and data types',
                'Knowledge of conditional statements',
                'Familiarity with sequences and iteration concepts'
            ]
        },
        learningOutcomes: {
            java: [
                'How to write for loops and while loops',
                'Understanding loop control (break, continue)',
                'Nested loops and common patterns',
                'Loop optimization and best practices'
            ],
            processing: [
                'Creating patterns with nested loops',
                'Animation loops and frame-based timing',
                'Processing arrays with loops',
                'Interactive loop control'
            ],
            python: [
                'For loops with ranges and iterables',
                'While loops and loop control',
                'List comprehensions as alternative to loops',
                'Pythonic iteration patterns'
            ]
        }
    },
    'functions': {
        prerequisites: {
            java: [
                'Understanding of variables, operations, and loops',
                'Knowledge of program structure and flow',
                'Basic understanding of code organization'
            ],
            processing: [
                'Understanding of variables, operations, and loops',
                'Knowledge of draw() and setup() functions',
                'Basic understanding of Processing sketch structure'
            ],
            python: [
                'Understanding of variables, operations, and loops',
                'Knowledge of program structure and flow',
                'Basic understanding of code organization'
            ]
        },
        learningOutcomes: {
            java: [
                'How to create and call functions/methods',
                'Understanding parameters and return values',
                'Method overloading and best practices',
                'Variable scope and access modifiers'
            ],
            processing: [
                'Creating custom functions for reusable code',
                'Functions with parameters for flexible graphics',
                'Organizing complex sketches with functions',
                'Combining functions for complex animations'
            ],
            python: [
                'Defining and calling functions',
                'Parameters, arguments, and return values',
                'Default parameters and keyword arguments',
                'Function scope and variable visibility'
            ]
        }
    },
    'arrays': {
        prerequisites: {
            java: [
                'Understanding of variables, loops, and functions',
                'Knowledge of data types and operations',
                'Basic understanding of memory and indexing'
            ],
            processing: [
                'Understanding of variables, loops, and functions',
                'Knowledge of coordinate systems and graphics',
                'Basic understanding of data organization'
            ],
            python: [
                'Understanding of variables, loops, and functions',
                'Knowledge of basic data types',
                'Familiarity with indexing concepts'
            ]
        },
        learningOutcomes: {
            java: [
                'How to create and initialize arrays',
                'Array access and modification techniques',
                'Working with ArrayList and collections',
                'Common array algorithms and patterns'
            ],
            processing: [
                'Creating arrays for multiple visual elements',
                'Animating arrays of objects',
                'Processing user input with arrays',
                'Advanced array techniques for complex graphics'
            ],
            python: [
                'Creating and manipulating lists',
                'List methods and operations',
                'List comprehensions and slicing',
                'Working with tuples and other sequences'
            ]
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeAccordion();
    initializeContentLoading();
    initializeKeyboardNavigation();
    initializeLanguageSelector();
    initializeSidebarToggle();
    initializeCollapsibleSections();
    initializeSidebarSections();
    initializeHomeButtons();
    updateLanguageDisplay();
    // Initialize breadcrumb to show Welcome
    updateStickyNavProgress('Welcome');
});

// Theme (light/dark) initialization and toggle
function initializeTheme() {
    const root = document.documentElement;
    const toggle = document.querySelector('.dark-mode-toggle');
    const iconEl = document.querySelector('.dark-mode-icon');

    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let theme = stored || (prefersDark ? 'dark' : 'light');

    applyTheme(theme);

    if (toggle) {
        toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        toggle.addEventListener('click', () => {
            theme = (root.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
            applyTheme(theme);
            localStorage.setItem('theme', theme);
            if (toggle) toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        });
    }

    function applyTheme(next) {
        if (next === 'dark') {
            root.setAttribute('data-theme', 'dark');
            if (iconEl) iconEl.textContent = '☀️';
            if (toggle) toggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            root.removeAttribute('data-theme');
            if (iconEl) iconEl.textContent = '🌙';
            if (toggle) toggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
}

// Initialize language selector functionality
function initializeLanguageSelector() {
    const languageButtons = document.querySelectorAll('.language-icon-small');

    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLanguage = this.getAttribute('data-language');

            if (selectedLanguage !== currentLanguage) {
                // Update active state
                languageButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Update current language
                currentLanguage = selectedLanguage;

                // Refresh content if a topic is currently loaded
                const contentArea = document.querySelector('.content-area');
                const activeTopicLink = document.querySelector('.topic-list a.active');

                if (activeTopicLink) {
                    const topicId = activeTopicLink.getAttribute('href').substring(1);
                    loadTopicContent(topicId, contentArea);
                } else {
                    // Update welcome message with language info
                    updateWelcomeMessage();
                    // Reset sidebar sections to default state
                    resetSidebarSections();
                }

                // Update language display
                updateLanguageDisplay();

                // Add visual feedback
                showLanguageChangeNotification(selectedLanguage);
            }
        });
    });
}

// Initialize sidebar toggle functionality
function initializeSidebarToggle() {
    const toggleButton = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.main-content .container');

    if (toggleButton && sidebar && container) {
        toggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            container.classList.toggle('sidebar-collapsed');

            // Update toggle button text
            const toggleText = this.querySelector('.toggle-text');
            if (sidebar.classList.contains('collapsed')) {
                toggleText.textContent = 'Expand';
            } else {
                toggleText.textContent = 'Menu';
            }
        });
    }
}

// Initialize collapsible sections
function initializeCollapsibleSections() {
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                const isExpanded = targetContent.classList.contains('expanded');

                if (isExpanded) {
                    targetContent.classList.remove('expanded');
                    this.setAttribute('aria-expanded', 'false');
                    this.querySelector('.collapse-icon').textContent = '+';
                } else {
                    targetContent.classList.add('expanded');
                    this.setAttribute('aria-expanded', 'true');
                    this.querySelector('.collapse-icon').textContent = '−';
                }
            }
        });
    });
}

// Initialize sidebar sections (Prerequisites, Learning Outcomes)
function initializeSidebarSections() {
    const sidebarHeaders = document.querySelectorAll('.sidebar-section-header');

    sidebarHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                const isExpanded = targetContent.classList.contains('expanded');

                if (isExpanded) {
                    targetContent.classList.remove('expanded');
                    this.setAttribute('aria-expanded', 'false');
                    this.querySelector('.section-icon').textContent = '+';
                } else {
                    targetContent.classList.add('expanded');
                    this.setAttribute('aria-expanded', 'true');
                    this.querySelector('.section-icon').textContent = '−';
                }
            }
        });
    });
}

// Update language display in welcome section
function updateLanguageDisplay() {
    const languageDisplay = document.getElementById('current-language-display');
    const languageDescription = document.getElementById('current-language-description');

    if (languageDisplay && languageDescription) {
        const languageInfo = getLanguageInfo(currentLanguage);
        languageDisplay.textContent = languageInfo.name;
        languageDescription.textContent = languageInfo.description;
    }
}

// Update welcome message based on selected language
function updateWelcomeMessage() {
    const welcomeSection = document.querySelector('.welcome-section');
    if (welcomeSection) {
        const languageInfo = getLanguageInfo(currentLanguage);
        welcomeSection.innerHTML = `
            <h2>Welcome to Learning Materials</h2>
            <div class="current-language-info">
                <h3>Currently Learning: ${languageInfo.name}</h3>
                <p>${languageInfo.description}</p>
            </div>
            <p>This comprehensive resource covers essential software development concepts through practical, hands-on learning. Each section includes:</p>
            <ul>
                <li><strong>Why it matters</strong> - Understanding the real-world context</li>
                <li><strong>Core concepts</strong> - Fundamental knowledge you need</li>
                <li><strong>Practical examples</strong> - Real applications in ${languageInfo.name}</li>
                <li><strong>Progressive learning</strong> - Building from basics to advanced topics</li>
            </ul>
            <p>Select a topic from the sidebar to begin your ${languageInfo.name} learning journey!</p>
        `;
    }
}

// Get language information
function getLanguageInfo(language) {
    const languages = {
        'java': {
            name: 'Java',
            description: 'A powerful, object-oriented programming language perfect for building enterprise applications, Android apps, and web services. Known for its "write once, run anywhere" philosophy.'
        },
        'processing': {
            name: 'Processing',
            description: 'A flexible software sketchbook and language for learning how to code within the visual arts. Perfect for creating interactive graphics, animations, and creative coding projects.'
        },
        'python': {
            name: 'Python',
            description: 'A readable, versatile programming language excellent for beginners and professionals alike. Used in web development, data science, AI, automation, and more.'
        }
    };

    return languages[language] || languages['java'];
}

// Show language change notification
function showLanguageChangeNotification(language) {
    const notification = document.createElement('div');
    notification.className = 'language-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>Switched to ${getLanguageInfo(language).name}</span>
            <button class="close-notification">&times;</button>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);

    // Manual close
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.remove();
    });
}

// Initialize accordion functionality
function initializeAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const isActive = this.classList.contains('active');

            // Toggle current section
            if (isActive) {
                closeAccordionSection(this, targetContent);
            } else {
                openAccordionSection(this, targetContent);
            }
        });
    });
}

// Open accordion section
function openAccordionSection(header, content) {
    // Add active classes
    header.classList.add('active');
    content.classList.add('active');

    // Calculate and set max-height for smooth animation
    const scrollHeight = content.scrollHeight;
    content.style.maxHeight = scrollHeight + 'px';

    // Update icon
    const icon = header.querySelector('.icon');
    icon.textContent = '×';

    // Smooth scroll to section if needed
    setTimeout(() => {
        const headerRect = header.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (headerRect.top < 100 || headerRect.bottom > viewportHeight - 100) {
            header.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    }, 150);
}

// Close accordion section
function closeAccordionSection(header, content) {
    // Remove active classes
    header.classList.remove('active');
    content.classList.remove('active');

    // Reset max-height
    content.style.maxHeight = '0px';

    // Update icon
    const icon = header.querySelector('.icon');
    icon.textContent = '+';
}

// Initialize content loading functionality
function initializeContentLoading() {
    const topicLinks = document.querySelectorAll('.topic-list a');
    const contentArea = document.querySelector('.content-area');

    topicLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const topicId = this.getAttribute('href').substring(1);
            loadTopicContent(topicId, contentArea);

            // Update active state
            document.querySelectorAll('.topic-list a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Auto-collapse sidebar for more content space
            autoCollapseSidebar();

        });
    });
}

// Auto-collapse sidebar when content is loaded
function autoCollapseSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.main-content .container');
    const toggleButton = document.querySelector('.sidebar-toggle');

    if (sidebar && container) {
        // Always collapse when content is loaded
        sidebar.classList.add('collapsed');
        container.classList.add('sidebar-collapsed');

        // Update toggle button text
        if (toggleButton) {
            const toggleText = toggleButton.querySelector('.toggle-text');
            if (toggleText) {
                toggleText.textContent = 'Expand';
            }
        }
    }
}


// Find parent category for a topic
function findParentCategory(topicId) {
    const categories = {
        'variables': 'Programming Fundamentals',
        'operations': 'Programming Fundamentals',
        'input-output': 'Programming Fundamentals',
        'syntax': 'Programming Fundamentals',
        'conditions': 'Decision Making & Control Flow',
        'boolean': 'Decision Making & Control Flow',
        'loops': 'Decision Making & Control Flow',
        'nested': 'Decision Making & Control Flow',
        'functions': 'Organizing Code & Logic',
        'parameters': 'Organizing Code & Logic',
        'algorithms': 'Organizing Code & Logic',
        'program-design': 'Organizing Code & Logic',
        'scope': 'Organizing Code & Logic',
        'arrays': 'Working with Collections of Data',
        'collections': 'Working with Collections of Data',
        'searching': 'Working with Collections of Data',
        'sorting': 'Working with Collections of Data',
        'data-structures': 'Working with Collections of Data',
        'classes': 'Object-Oriented Programming',
        'encapsulation': 'Object-Oriented Programming',
        'inheritance': 'Object-Oriented Programming',
        'recursion': 'Object-Oriented Programming',
        'design-patterns': 'Object-Oriented Programming',
        'debugging': 'Professional Development Practices',
        'testing': 'Professional Development Practices',
        'code-style': 'Professional Development Practices',
        'version-control': 'Professional Development Practices',
        'collaboration': 'Professional Development Practices'
    };

    return categories[topicId] || 'Learning Topics';
}

// Go back to home
function goHome() {
    location.reload(); // Simple way to return to home state
}

// Load topic content
function loadTopicContent(topicId, contentArea) {
    // Show loading state
    contentArea.innerHTML = `
        <div class="loading-content">
            <h2>Loading ${getTopicTitle(topicId)}...</h2>
            <div class="loading-spinner"></div>
        </div>
    `;

    // Simulate content loading (in real app, this would fetch from server)
    setTimeout(() => {
        const content = getTopicContent(topicId);
        contentArea.innerHTML = content;

        // Update sidebar sections with topic-specific data
        updateSidebarSections(topicId);

        // Scroll to top of content area
        contentArea.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 300);
}

// Update sidebar sections with topic-specific data
function updateSidebarSections(topicId) {
    const topic = topicData[topicId];
    if (!topic) return;

    // Update Prerequisites
    const prerequisitesContent = document.getElementById('sidebar-prerequisites');
    const prerequisites = topic.prerequisites[currentLanguage];

    if (prerequisites && prerequisites.length > 0) {
        prerequisitesContent.innerHTML = `
            <div style="padding: 1.5rem;">
                <ul style="margin: 0; padding-left: 1.5rem;">
                    ${prerequisites.map(item => `<li style="margin-bottom: 0.5rem; color: var(--text-slate); font-size: 0.9rem; line-height: 1.5;">${item}</li>`).join('')}
                </ul>
            </div>
        `;
    } else {
        prerequisitesContent.innerHTML = `
            <div class="section-placeholder">
                <p>No specific prerequisites for this topic</p>
            </div>
        `;
    }

    // Update Learning Outcomes
    const outcomesContent = document.getElementById('sidebar-outcomes');
    const outcomes = topic.learningOutcomes[currentLanguage];

    if (outcomes && outcomes.length > 0) {
        outcomesContent.innerHTML = `
            <div style="padding: 1.5rem;">
                <ul style="margin: 0; padding-left: 1.5rem;">
                    ${outcomes.map(item => `<li style="margin-bottom: 0.5rem; color: var(--text-slate); font-size: 0.9rem; line-height: 1.5;">${item}</li>`).join('')}
                </ul>
            </div>
        `;
    } else {
        outcomesContent.innerHTML = `
            <div class="section-placeholder">
                <p>Learning outcomes not available for this topic</p>
            </div>
        `;
    }

    // Update Progress
    const topicTitle = getTopicTitle(topicId);
    const categoryName = findParentCategory(topicId);

    document.getElementById('current-topic-name').textContent = topicTitle;
    document.getElementById('current-category-name').textContent = categoryName;

    // Update sticky navigation breadcrumb to show current topic
    updateStickyNavProgress(topicTitle);
}

// Reset sidebar sections to default state
function resetSidebarSections() {
    const prerequisitesContent = document.getElementById('sidebar-prerequisites');
    const outcomesContent = document.getElementById('sidebar-outcomes');

    prerequisitesContent.innerHTML = `
        <div class="section-placeholder">
            <p>Select a topic to view its prerequisites</p>
        </div>
    `;

    outcomesContent.innerHTML = `
        <div class="section-placeholder">
            <p>Select a topic to view its learning outcomes</p>
        </div>
    `;

    // Reset progress to default
    document.getElementById('current-topic-name').textContent = 'Welcome';
    document.getElementById('current-category-name').textContent = 'Getting Started';

    // Update sticky nav to show Welcome
    updateStickyNavProgress('Welcome');
}

// Get topic title for display
function getTopicTitle(topicId) {
    const titles = {
        'variables': 'Variables & Data Types',
        'operations': 'Basic Operations',
        'input-output': 'Input & Output',
        'syntax': 'Programming Syntax',
        'conditions': 'Conditional Statements',
        'boolean': 'Boolean Logic',
        'loops': 'Loops & Iteration',
        'nested': 'Nested Structures',
        'functions': 'Functions & Methods',
        'parameters': 'Parameters & Return Values',
        'algorithms': 'Algorithm Design',
        'program-design': 'Program Structure',
        'scope': 'Variable Scope',
        'arrays': 'Arrays & Lists',
        'collections': 'Advanced Collections',
        'searching': 'Searching & Filtering',
        'sorting': 'Sorting Algorithms',
        'data-structures': 'Data Structures',
        'classes': 'Classes & Objects',
        'encapsulation': 'Encapsulation',
        'inheritance': 'Inheritance',
        'recursion': 'Recursive Thinking',
        'design-patterns': 'Common Patterns',
        'debugging': 'Debugging Techniques',
        'testing': 'Unit Testing',
        'code-style': 'Code Style & Standards',
        'version-control': 'Version Control',
        'collaboration': 'Team Collaboration'
    };

    return titles[topicId] || 'Learning Content';
}

// Get topic content with comprehensive structure and language support
function getTopicContent(topicId) {
    // Get language-specific content
    const content = getLanguageSpecificContent(currentLanguage, topicId);
    if (content) {
        return content;
    }

    // Fallback to default content
    return getDefaultTopicContent(topicId);
}

// Get language-specific content for topics
function getLanguageSpecificContent(language, topicId) {
    const languageContent = {
        'java': getJavaContent(topicId),
        'processing': getProcessingContent(topicId),
        'python': getPythonContent(topicId)
    };

    return languageContent[language];
}

// Java-specific content
function getJavaContent(topicId) {
    const contentTemplates = {
        'variables': `
            <div class="topic-content">
                <h2>Variables & Data Types</h2>

                <div class="why-section">
                    <h3>🎯 Why This Matters</h3>
                    <p>Variables are the foundation of all programming. Every program you'll ever write will store and manipulate data - from a simple calculator to complex video games. Understanding variables is like learning the alphabet before reading.</p>
                </div>


                <div class="content-section">
                    <h3>What are Variables?</h3>
                    <p>Variables are containers that store data values. Think of them as labeled boxes where you can put different types of information and retrieve it later.</p>

                    <h3>Common Data Types</h3>
                    <ul>
                        <li><strong>Numbers (int, double):</strong> For calculations, ages, scores</li>
                        <li><strong>Text (String):</strong> For names, messages, addresses</li>
                        <li><strong>Boolean:</strong> For true/false decisions, yes/no questions</li>
                        <li><strong>Arrays:</strong> For collections of similar items</li>
                    </ul>

                    <h3>Example Code</h3>
                    <pre><code>// Number variables
int playerScore = 1250;
double temperature = 98.6;

// String variable
String userName = "Alex";

// Boolean variable
boolean isLoggedIn = true;

// Using variables together
System.out.println("Welcome " + userName);
System.out.println("Your score: " + playerScore);
System.out.println("Logged in: " + isLoggedIn);</code></pre>
                </div>

                <div class="examples-section">
                    <h3>🌟 Real-World Examples</h3>
                    <ul>
                        <li><strong>Banking App:</strong> Account balance, customer name, transaction amounts</li>
                        <li><strong>Social Media:</strong> Post content, like counts, user profiles</li>
                        <li><strong>Gaming:</strong> Player health, level progress, inventory items</li>
                        <li><strong>E-commerce:</strong> Product prices, quantities, customer addresses</li>
                    </ul>
                </div>

                <div class="practice-section">
                    <h3>🔧 Practice Exercise</h3>
                    <p><strong>Create a Personal Profile Program:</strong></p>
                    <p>Write code that stores your name, age, favorite hobby, and whether you're a student. Display this information in a nicely formatted profile card.</p>
                </div>

                <div class="next-steps">
                    <h3>➡️ Next Steps</h3>
                    <p>Once you're comfortable with variables, try: <strong>Basic Operations</strong> to learn how to perform calculations with your data.</p>
                </div>
            </div>
        `,
        'operations': `
            <div class="topic-content">
                <h2>Basic Operations</h2>

                <div class="why-section">
                    <h3>🎯 Why This Matters</h3>
                    <p>Operations are how programs actually DO things with data. Whether you're calculating a tip, determining if a password is strong enough, or processing user input, you're using operations. They're the "verbs" in programming.</p>
                </div>


                <div class="content-section">
                    <h3>Arithmetic Operations</h3>
                    <pre><code>// Basic math operations
int a = 10;
int b = 3;

int sum = a + b;        // Addition: 13
int difference = a - b;  // Subtraction: 7
int product = a * b;     // Multiplication: 30
int quotient = a / b;    // Division: 3
int remainder = a % b;   // Modulus: 1</code></pre>

                    <h3>String Operations</h3>
                    <pre><code>// Working with text
String firstName = "Sarah";
String lastName = "Johnson";
String fullName = firstName + " " + lastName;

int age = 25;
String message = "Hello, " + fullName + "! You are " + age + " years old.";</code></pre>

                    <h3>Comparison Operations</h3>
                    <pre><code>// Comparing values
int score1 = 85;
int score2 = 92;

boolean isHigher = score2 > score1;    // true
boolean isEqual = score1 == score2;    // false
boolean isLowerOrEqual = score1 <= 90; // true</code></pre>
                </div>

                <div class="examples-section">
                    <h3>🌟 Real-World Examples</h3>
                    <ul>
                        <li><strong>Calculator Apps:</strong> All basic math operations</li>
                        <li><strong>Shopping Carts:</strong> Adding prices, calculating tax, applying discounts</li>
                        <li><strong>Game Scores:</strong> Points addition, level calculations, ranking comparisons</li>
                        <li><strong>Data Analysis:</strong> Averaging numbers, finding percentages</li>
                    </ul>
                </div>

                <div class="practice-section">
                    <h3>🔧 Practice Exercise</h3>
                    <p><strong>Build a Tip Calculator:</strong></p>
                    <p>Create a program that calculates the tip and total bill for a restaurant meal. Include the meal cost, tip percentage, and number of people splitting the bill.</p>
                </div>

                <div class="next-steps">
                    <h3>➡️ Next Steps</h3>
                    <p>Ready to make your programs interactive? Try: <strong>Input & Output</strong> to learn how to get information from users.</p>
                </div>
            </div>
        `,
        'conditions': `
            <div class="topic-content">
                <h2>Conditional Statements</h2>

                <div class="why-section">
                    <h3>🎯 Why This Matters</h3>
                    <p>Conditionals give your programs the power to make intelligent decisions. Without them, programs would just follow the same steps every time. Conditionals enable personalization, error handling, and smart responses to user input.</p>
                </div>


                <div class="content-section">
                    <h3>Basic Conditional Structure</h3>
                    <pre><code>// Simple if statement
int temperature = 75;

if (temperature > 80) {
    System.out.println("It's hot outside!");
} else if (temperature > 60) {
    System.out.println("Perfect weather!");
} else {
    System.out.println("It's cold - grab a jacket!");
}</code></pre>

                    <h3>Logical Operators</h3>
                    <pre><code>// Combining conditions
int age = 25;
boolean hasLicense = true;

// AND operator (&&) - both must be true
if (age >= 18 && hasLicense) {
    System.out.println("You can drive!");
}

// OR operator (||) - either can be true
if (age < 13 || age > 65) {
    System.out.println("Discounted movie ticket!");
}

// NOT operator (!) - reverses true/false
if (!hasLicense) {
    System.out.println("You need to get a license first.");
}</code></pre>

                    <h3>Nested Conditionals</h3>
                    <pre><code>// Conditions inside conditions
String weather = "sunny";
int temperature = 85;

if (weather.equals("sunny")) {
    if (temperature > 80) {
        System.out.println("Perfect beach day!");
    } else {
        System.out.println("Nice day for a walk!");
    }
} else {
    System.out.println("Maybe stay inside today.");
}</code></pre>
                </div>

                <div class="examples-section">
                    <h3>🌟 Real-World Examples</h3>
                    <ul>
                        <li><strong>Login Systems:</strong> Check username and password validity</li>
                        <li><strong>E-commerce:</strong> Apply discounts based on purchase amount or membership</li>
                        <li><strong>Games:</strong> Different actions based on player level or inventory</li>
                        <li><strong>Banking:</strong> Approve or deny transactions based on account balance</li>
                    </ul>
                </div>

                <div class="practice-section">
                    <h3>🔧 Practice Exercise</h3>
                    <p><strong>Create a Grade Calculator with Feedback:</strong></p>
                    <p>Write a program that takes a test score and provides both a letter grade and personalized feedback (encouraging message for high scores, study tips for low scores).</p>
                </div>

                <div class="next-steps">
                    <h3>➡️ Next Steps</h3>
                    <p>Want to repeat actions multiple times? Learn about: <strong>Loops & Iteration</strong> to automate repetitive tasks.</p>
                </div>
            </div>
        `,
        'loops': `
            <div class="topic-content">
                <h2>Loops & Iteration</h2>

                <div class="why-section">
                    <h3>🎯 Why This Matters</h3>
                    <p>Loops eliminate repetitive code and make programs efficient. Instead of writing the same code 100 times, you write it once and tell the computer to repeat it. This is essential for processing lists, handling user input, and creating interactive experiences.</p>
                </div>


                <div class="content-section">
                    <h3>For Loops</h3>
                    <pre><code>// Counting from 1 to 5
for (int i = 1; i <= 5; i++) {
    System.out.println("Count: " + i);
}

// Processing arrays
String[] names = {"Alice", "Bob", "Charlie"};
for (int i = 0; i < names.length; i++) {
    System.out.println("Hello, " + names[i]);
}

// Enhanced for loop (for-each)
for (String name : names) {
    System.out.println("Hi " + name + "!");
}</code></pre>

                    <h3>While Loops</h3>
                    <pre><code>// Keep asking until valid input
Scanner scanner = new Scanner(System.in);
int number = 0;
while (number < 1 || number > 10) {
    System.out.print("Enter a number between 1 and 10: ");
    number = scanner.nextInt();
}

// Countdown timer
int countdown = 5;
while (countdown > 0) {
    System.out.println("Time remaining: " + countdown);
    countdown--;
}
System.out.println("Time's up!");</code></pre>

                    <h3>Loop Control</h3>
                    <pre><code>// Using break to exit early
for (int i = 1; i <= 10; i++) {
    if (i == 7) {
        break; // Exit loop when i equals 7
    }
    System.out.println(i);
}

// Using continue to skip iterations
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue; // Skip when i equals 3
    }
    System.out.println("Number: " + i);
}</code></pre>
                </div>

                <div class="examples-section">
                    <h3>🌟 Real-World Examples</h3>
                    <ul>
                        <li><strong>Video Games:</strong> Game loops that update graphics and check input continuously</li>
                        <li><strong>Web Servers:</strong> Processing requests from multiple users</li>
                        <li><strong>Data Processing:</strong> Analyzing thousands of records in a database</li>
                        <li><strong>User Interfaces:</strong> Displaying menu options until user makes a valid choice</li>
                    </ul>
                </div>

                <div class="practice-section">
                    <h3>🔧 Practice Exercise</h3>
                    <p><strong>Build a Number Guessing Game:</strong></p>
                    <p>Create a program where the computer picks a random number between 1-100, and the user has to guess it. Use loops to keep asking for guesses and provide "higher" or "lower" hints.</p>
                </div>

                <div class="next-steps">
                    <h3>➡️ Next Steps</h3>
                    <p>Ready to organize your code better? Learn about: <strong>Functions & Methods</strong> to create reusable code blocks.</p>
                </div>
            </div>
        `,
        'functions': `
            <div class="topic-content">
                <h2>Functions & Methods</h2>

                <div class="why-section">
                    <h3>🎯 Why This Matters</h3>
                    <p>Functions are the building blocks of well-organized programs. They allow you to break complex problems into smaller, manageable pieces, avoid repeating code, and create programs that are easier to understand, test, and maintain.</p>
                </div>


                <div class="content-section">
                    <h3>Basic Function Structure</h3>
                    <pre><code>// Function that performs an action
public static void greetUser(String name) {
    System.out.println("Welcome, " + name + "!");
    System.out.println("Hope you have a great day!");
}

// Function that returns a value
public static int calculateSquare(int number) {
    return number * number;
}

// Function with multiple parameters
public static double calculateTip(double billAmount, double tipPercentage) {
    return billAmount * (tipPercentage / 100);
}

// Using the functions
public static void main(String[] args) {
    greetUser("Alice");

    int result = calculateSquare(5);
    System.out.println("5 squared is: " + result);

    double tip = calculateTip(50.0, 18.0);
    System.out.println("Tip amount: $" + tip);
}</code></pre>

                    <h3>Function Overloading</h3>
                    <pre><code>// Same function name, different parameters
public static int add(int a, int b) {
    return a + b;
}

public static double add(double a, double b) {
    return a + b;
}

public static String add(String a, String b) {
    return a + " " + b;
}

// Java automatically chooses the right version
int intSum = add(5, 3);           // Uses int version
double doubleSum = add(2.5, 3.7); // Uses double version
String combined = add("Hello", "World"); // Uses String version</code></pre>

                    <h3>Variable Scope</h3>
                    <pre><code>public class ScopeExample {
    static int globalVariable = 100; // Accessible everywhere in class

    public static void demonstrateScope() {
        int localVariable = 50; // Only accessible in this function

        if (true) {
            int blockVariable = 25; // Only accessible in this block
            System.out.println("Block: " + blockVariable);
            System.out.println("Local: " + localVariable);
            System.out.println("Global: " + globalVariable);
        }

        // blockVariable is not accessible here
        System.out.println("Local: " + localVariable);
        System.out.println("Global: " + globalVariable);
    }
}</code></pre>
                </div>

                <div class="examples-section">
                    <h3>🌟 Real-World Examples</h3>
                    <ul>
                        <li><strong>Web Development:</strong> Functions for user login, data validation, page rendering</li>
                        <li><strong>Mobile Apps:</strong> Functions for button clicks, data saving, network requests</li>
                        <li><strong>Games:</strong> Functions for player movement, collision detection, score calculation</li>
                        <li><strong>Business Software:</strong> Functions for calculating taxes, generating reports, processing orders</li>
                    </ul>
                </div>

                <div class="practice-section">
                    <h3>🔧 Practice Exercise</h3>
                    <p><strong>Create a Simple Calculator:</strong></p>
                    <p>Build a calculator with separate functions for add, subtract, multiply, and divide. Include a main function that presents a menu and calls the appropriate calculation function based on user choice.</p>
                </div>

                <div class="next-steps">
                    <h3>➡️ Next Steps</h3>
                    <p>Want to work with collections of data? Explore: <strong>Arrays & Lists</strong> to handle multiple values efficiently.</p>
                </div>
            </div>
        `,
        'arrays': `
            <div class="topic-content">
                <h2>Arrays & Lists</h2>

                <div class="why-section">
                    <h3>🎯 Why This Matters</h3>
                    <p>Arrays and lists let you store and manage multiple pieces of related data efficiently. Instead of creating separate variables for each item, you can group them together. This is essential for everything from storing user data to managing game inventories.</p>
                </div>


                <div class="content-section">
                    <h3>Array Basics</h3>
                    <pre><code>// Creating arrays
int[] scores = new int[5];           // Array of 5 integers
String[] names = {"Alice", "Bob", "Charlie"}; // Array with initial values
double[] prices = {19.99, 29.50, 15.75};

// Accessing elements (0-based indexing)
System.out.println("First name: " + names[0]);  // "Alice"
System.out.println("Last price: " + prices[2]); // 15.75

// Modifying elements
scores[0] = 95;
scores[1] = 87;
names[1] = "Robert"; // Changes "Bob" to "Robert"

// Getting array length
System.out.println("Number of scores: " + scores.length);</code></pre>

                    <h3>Looping Through Arrays</h3>
                    <pre><code>// Traditional for loop
int[] numbers = {10, 20, 30, 40, 50};
for (int i = 0; i < numbers.length; i++) {
    System.out.println("Position " + i + ": " + numbers[i]);
}

// Enhanced for loop (for-each)
String[] fruits = {"apple", "banana", "orange"};
for (String fruit : fruits) {
    System.out.println("I like " + fruit);
}

// Finding the maximum value
int[] grades = {88, 92, 76, 95, 89};
int maxGrade = grades[0];
for (int grade : grades) {
    if (grade > maxGrade) {
        maxGrade = grade;
    }
}
System.out.println("Highest grade: " + maxGrade);</code></pre>

                    <h3>ArrayList (Dynamic Arrays)</h3>
                    <pre><code>import java.util.ArrayList;

// Creating an ArrayList
ArrayList<String> shoppingList = new ArrayList<>();

// Adding items
shoppingList.add("milk");
shoppingList.add("bread");
shoppingList.add("eggs");

// Accessing items
System.out.println("First item: " + shoppingList.get(0));

// Modifying items
shoppingList.set(1, "whole wheat bread");

// Removing items
shoppingList.remove("eggs");
shoppingList.remove(0); // Remove by index

// Checking if item exists
if (shoppingList.contains("milk")) {
    System.out.println("Don't forget the milk!");
}

// Size of the list
System.out.println("Items on list: " + shoppingList.size());</code></pre>
                </div>

                <div class="examples-section">
                    <h3>🌟 Real-World Examples</h3>
                    <ul>
                        <li><strong>Social Media:</strong> Lists of friends, posts, comments, likes</li>
                        <li><strong>E-commerce:</strong> Shopping cart items, product catalogs, order history</li>
                        <li><strong>Gaming:</strong> Player inventory, high scores, enemy locations</li>
                        <li><strong>Education:</strong> Student rosters, grade books, course schedules</li>
                    </ul>
                </div>

                <div class="practice-section">
                    <h3>🔧 Practice Exercise</h3>
                    <p><strong>Build a Simple Gradebook:</strong></p>
                    <p>Create a program that stores student names and their test scores in arrays. Calculate and display the class average, highest score, and allow searching for a specific student's grade.</p>
                </div>

                <div class="next-steps">
                    <h3>➡️ Next Steps</h3>
                    <p>Ready for more advanced concepts? Learn about: <strong>Classes & Objects</strong> to create your own custom data types.</p>
                </div>
            </div>
        `
    };

    return contentTemplates[topicId] || null;
}

// Processing-specific content
function getProcessingContent(topicId) {
    const contentTemplates = {
        'variables': `
            <div class="topic-content">
                <h2>Variables & Data Types</h2>

                <div class="why-section">
                    <h3>🎯 Why This Matters</h3>
                    <p>In Processing, variables store information about your visual creations - colors, positions, sizes, and animation states. Every interactive artwork you create will use variables to manage what appears on screen and how it changes over time.</p>
                </div>


                <div class="content-section">
                    <h3>Basic Variable Types</h3>
                    <pre><code>// Number variables
int circleX = 200;        // Whole numbers
float circleSpeed = 2.5;  // Decimal numbers

// Color variables
color backgroundColor = color(100, 150, 255);
color circleColor = color(255, 100, 100);

// Boolean for true/false states
boolean isMoving = true;

// Using variables in drawing
void setup() {
  size(400, 400);
}

void draw() {
  background(backgroundColor);
  fill(circleColor);
  circle(circleX, 200, 50);

  if (isMoving) {
    circleX = circleX + circleSpeed;
  }
}</code></pre>

                    <h3>Built-in Processing Variables</h3>
                    <pre><code>void setup() {
  size(500, 300);
}

void draw() {
  background(220);

  // Built-in size variables
  println("Canvas width: " + width);   // 500
  println("Canvas height: " + height); // 300

  // Mouse position variables
  fill(255, 0, 0);
  circle(mouseX, mouseY, 30);  // Circle follows mouse

  // Frame counting
  text("Frame: " + frameCount, 10, 20);
}</code></pre>
                </div>

                <div class="examples-section">
                    <h3>🌟 Real-World Examples</h3>
                    <ul>
                        <li><strong>Digital Art:</strong> Storing brush position, color palette, canvas size</li>
                        <li><strong>Interactive Installations:</strong> Sensor data, user input states</li>
                        <li><strong>Data Visualization:</strong> Chart values, axis positions, scale factors</li>
                        <li><strong>Game Development:</strong> Player position, score, health, power-ups</li>
                    </ul>
                </div>

                <div class="practice-section">
                    <h3>🔧 Practice Exercise</h3>
                    <p><strong>Create a Color-Changing Circle:</strong></p>
                    <p>Make a circle that changes color every time you click the mouse. Use variables to store the current color values and update them in the mousePressed() function.</p>
                </div>

                <div class="next-steps">
                    <h3>➡️ Next Steps</h3>
                    <p>Ready to make decisions in your art? Learn: <strong>Conditional Statements</strong> to create responsive visual experiences.</p>
                </div>
            </div>
        `,
        'operations': `
            <div class="topic-content">
                <h2>Basic Operations</h2>

                <div class="why-section">
                    <h3>🎯 Why This Matters</h3>
                    <p>Operations in Processing are how you create movement, calculate positions, mix colors, and create dynamic visual effects. Every animation, every interactive element, every generative pattern uses mathematical operations to bring your ideas to life.</p>
                </div>

                <div class="content-section">
                    <h3>Mathematical Operations for Animation</h3>
                    <pre><code>void setup() {
  size(400, 400);
}

void draw() {
  background(230);

  // Basic arithmetic for animation
  float time = millis() * 0.001;  // Convert to seconds

  // Oscillating position using sine wave
  float x = width/2 + sin(time) * 100;
  float y = height/2 + cos(time * 0.5) * 50;

  // Size that pulses
  float diameter = 50 + sin(time * 3) * 20;

  // Draw animated circle
  fill(255, 100, 150);
  circle(x, y, diameter);
}</code></pre>
                </div>

                <div class="examples-section">
                    <h3>🌟 Real-World Examples</h3>
                    <ul>
                        <li><strong>Motion Graphics:</strong> Smooth transitions, easing animations</li>
                        <li><strong>Interactive Art:</strong> Proximity-based effects, gesture recognition</li>
                        <li><strong>Data Visualization:</strong> Scaling data to screen coordinates</li>
                        <li><strong>Generative Art:</strong> Mathematical patterns, algorithmic compositions</li>
                    </ul>
                </div>

                <div class="practice-section">
                    <h3>🔧 Practice Exercise</h3>
                    <p><strong>Create a Solar System:</strong></p>
                    <p>Use trigonometric functions to make planets orbit around a central sun. Calculate positions using sine and cosine, and vary orbital speeds and distances.</p>
                </div>

                <div class="next-steps">
                    <h3>➡️ Next Steps</h3>
                    <p>Want to make your art respond to conditions? Learn: <strong>Conditional Statements</strong> to create interactive behaviors.</p>
                </div>
            </div>
        `
    };

    return contentTemplates[topicId] || null;
}

// Python-specific content
function getPythonContent(topicId) {
    const contentTemplates = {
        'variables': `
            <div class="topic-content">
                <h2>Variables & Data Types</h2>

                <div class="why-section">
                    <h3>🎯 Why This Matters</h3>
                    <p>Python variables are like labeled containers that store information. Python's simple, readable syntax makes working with variables intuitive, which is why it's perfect for beginners and used by professionals in data science, web development, and AI.</p>
                </div>

                <div class="content-section">
                    <h3>Python Variables - No Declaration Needed!</h3>
                    <pre><code># Python figures out the type automatically
player_score = 1250        # Integer
temperature = 98.6         # Float
user_name = "Alex"         # String
is_logged_in = True        # Boolean

# You can change types easily
score = 100        # Integer
score = "High"     # Now it's a string!

# Multiple assignment
x, y, z = 10, 20, 30
name, age = "Sarah", 25

# Using variables
print(f"Welcome {user_name}!")
print(f"Your score: {player_score}")
print(f"Logged in: {is_logged_in}")

# Check the type of a variable
print(type(temperature))  # <class 'float'></code></pre>
                </div>

                <div class="examples-section">
                    <h3>🌟 Real-World Examples</h3>
                    <ul>
                        <li><strong>Data Science:</strong> Storing datasets, analysis results, model parameters</li>
                        <li><strong>Web Development:</strong> User sessions, form data, database records</li>
                        <li><strong>Automation:</strong> File paths, configuration settings, task lists</li>
                        <li><strong>AI/Machine Learning:</strong> Training data, neural network weights, predictions</li>
                    </ul>
                </div>

                <div class="practice-section">
                    <h3>🔧 Practice Exercise</h3>
                    <p><strong>Create a Student Information System:</strong></p>
                    <p>Build a program that stores student names, ages, and grades in lists. Practice adding new students, calculating average grades, and displaying formatted information using f-strings.</p>
                </div>

                <div class="next-steps">
                    <h3>➡️ Next Steps</h3>
                    <p>Ready to perform calculations and manipulate data? Learn: <strong>Basic Operations</strong> to work with your variables effectively.</p>
                </div>
            </div>
        `,
        'operations': `
            <div class="topic-content">
                <h2>Basic Operations</h2>

                <div class="why-section">
                    <h3>🎯 Why This Matters</h3>
                    <p>Python operations are the tools for manipulating data - from simple calculations to complex data transformations. Python's intuitive operators and powerful built-in functions make it excellent for everything from basic math to data analysis and scientific computing.</p>
                </div>

                <div class="content-section">
                    <h3>Arithmetic Operations</h3>
                    <pre><code># Basic arithmetic
a = 10
b = 3

print(a + b)    # Addition: 13
print(a - b)    # Subtraction: 7
print(a * b)    # Multiplication: 30
print(a / b)    # Division: 3.333...
print(a // b)   # Floor division: 3
print(a % b)    # Modulus (remainder): 1
print(a ** b)   # Exponentiation: 1000

# Working with different number types
import math

radius = 5.5
area = math.pi * radius ** 2
print(f"Circle area: {area:.2f}")  # Format to 2 decimal places</code></pre>

                    <h3>String Operations</h3>
                    <pre><code># String manipulation
text = "Python Programming"
name = "Alice"
age = 25

# String formatting (multiple methods)
message = f"Hello, {name}! You are {age} years old."

# String methods
print(text.lower())                    # "python programming"
print(text.upper())                    # "PYTHON PROGRAMMING"
print(text.split())                    # ["Python", "Programming"]
print("-".join(["Python", "is", "fun"]))  # "Python-is-fun"</code></pre>
                </div>

                <div class="examples-section">
                    <h3>🌟 Real-World Examples</h3>
                    <ul>
                        <li><strong>Data Analysis:</strong> Processing CSV files, calculating statistics, filtering datasets</li>
                        <li><strong>Web Development:</strong> Form validation, URL manipulation, template rendering</li>
                        <li><strong>Financial Applications:</strong> Interest calculations, currency conversions, budget analysis</li>
                        <li><strong>Scientific Computing:</strong> Mathematical modeling, statistical analysis, data visualization</li>
                    </ul>
                </div>

                <div class="practice-section">
                    <h3>🔧 Practice Exercise</h3>
                    <p><strong>Build a Grade Calculator:</strong></p>
                    <p>Create a program that calculates GPA from a list of grades. Include features to add/remove grades, calculate averages, and format the output with appropriate decimal places.</p>
                </div>

                <div class="next-steps">
                    <h3>➡️ Next Steps</h3>
                    <p>Want to make your programs make decisions? Learn: <strong>Conditional Statements</strong> to create smart, responsive Python programs.</p>
                </div>
            </div>
        `
    };

    return contentTemplates[topicId] || null;
}

// Fallback content function
function getDefaultTopicContent(topicId) {
    return `
        <div class="topic-content">
            <h2>${getTopicTitle(topicId)}</h2>
            <div class="content-section">
                <p>Content for ${getTopicTitle(topicId)} in ${currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)} is being prepared. This will include:</p>
                <ul>
                    <li>Language-specific explanations</li>
                    <li>Code examples and syntax</li>
                    <li>Practice exercises</li>
                    <li>Real-world applications</li>
                </ul>
                <p>Check back soon for the complete ${currentLanguage} learning materials!</p>
            </div>
        </div>
    `;
}

// Initialize keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Allow Enter and Space to activate accordion headers
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('accordion-header')) {
            e.preventDefault();
            e.target.click();
        }

        // Allow Escape to close all accordion sections
        if (e.key === 'Escape') {
            closeAllAccordionSections();
        }
    });
}

// Close all accordion sections
function closeAllAccordionSections() {
    const activeHeaders = document.querySelectorAll('.accordion-header.active');
    activeHeaders.forEach(header => {
        const targetId = header.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        closeAccordionSection(header, targetContent);
    });
}

// Utility function to handle smooth transitions
function smoothTransition(element, property, targetValue, duration = 300) {
    const startValue = parseFloat(getComputedStyle(element)[property]);
    const difference = targetValue - startValue;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (difference * easeOut);

        element.style[property] = currentValue + 'px';

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}


// Initialize home button functionality
function initializeHomeButtons() {
    const homeButtons = document.querySelectorAll('.home-button, .sticky-home-btn');

    homeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Return to home state
            goHome();

            // Update sticky nav to show welcome state
            updateStickyNavProgress('Welcome');

            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Update sticky navigation to show current page
function updateStickyNavProgress(currentPageTitle) {
    const stickyCategory = document.getElementById('sticky-category');
    const stickyTopic = document.getElementById('sticky-topic');

    if (stickyCategory && stickyTopic) {
        // Hide the separator and second element, just show the current page
        stickyCategory.textContent = currentPageTitle || 'Welcome';
        stickyTopic.style.display = 'none';
        stickyCategory.nextElementSibling.style.display = 'none'; // Hide separator
    }
}


// Calculate progress based on topic position in category
function calculateTopicProgress(topicId) {
    const categoryTopics = {
        'fundamentals': ['variables', 'operations', 'input-output', 'syntax'],
        'control-flow': ['conditions', 'boolean', 'loops', 'nested'],
        'organization': ['functions', 'parameters', 'algorithms', 'program-design', 'scope'],
        'collections': ['arrays', 'collections', 'searching', 'sorting', 'data-structures'],
        'oop': ['classes', 'encapsulation', 'inheritance', 'recursion', 'design-patterns'],
        'professional': ['debugging', 'testing', 'code-style', 'version-control', 'collaboration']
    };

    for (const [, topics] of Object.entries(categoryTopics)) {
        const topicIndex = topics.indexOf(topicId);
        if (topicIndex !== -1) {
            return Math.round((topicIndex + 1) / topics.length * 100);
        }
    }

    return 0;
}

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Recalculate max-heights for open accordion sections
    const activeContents = document.querySelectorAll('.accordion-content.active');
    activeContents.forEach(content => {
        content.style.maxHeight = content.scrollHeight + 'px';
    });
});

// Intersection Observer for scroll animations (optional enhancement)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe accordion sections for entrance animations
    document.querySelectorAll('.accordion-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        observer.observe(section);
    });
}
