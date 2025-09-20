// CodeRunner Integration with Context-Sensitive Error Handling
let currentTopic = 'variables';
let currentLanguage = 'java';

// Error patterns and their corresponding study material suggestions
const errorPatterns = {
    java: {
        'cannot find symbol': {
            topics: ['variables', 'functions', 'syntax'],
            message: 'Variable or method not declared',
            suggestions: [
                'Check if you\'ve declared all variables before using them',
                'Verify method names and spelling',
                'Review variable scope and accessibility'
            ]
        },
        'incompatible types': {
            topics: ['variables', 'operations'],
            message: 'Type mismatch error',
            suggestions: [
                'Check data types match expected values',
                'Review type conversion and casting',
                'Ensure operations are compatible with data types'
            ]
        },
        'expected': {
            topics: ['syntax'],
            message: 'Syntax error - missing punctuation',
            suggestions: [
                'Check for missing semicolons (;)',
                'Verify parentheses and braces are balanced',
                'Review Java syntax rules'
            ]
        },
        'class, interface, or enum expected': {
            topics: ['syntax', 'functions'],
            message: 'Code structure error',
            suggestions: [
                'Ensure code is inside a class or method',
                'Check proper class/method declaration syntax',
                'Review Java program structure'
            ]
        }
    },
    python: {
        'NameError': {
            topics: ['variables', 'functions'],
            message: 'Variable or function not defined',
            suggestions: [
                'Check if variables are defined before use',
                'Verify function names and spelling',
                'Review variable scope and indentation'
            ]
        },
        'SyntaxError': {
            topics: ['syntax'],
            message: 'Python syntax error',
            suggestions: [
                'Check indentation levels',
                'Verify colons after if/for/while statements',
                'Review Python syntax rules'
            ]
        },
        'TypeError': {
            topics: ['variables', 'operations'],
            message: 'Type-related error',
            suggestions: [
                'Check data types in operations',
                'Review type conversion methods',
                'Ensure compatible types in comparisons'
            ]
        },
        'IndentationError': {
            topics: ['syntax', 'conditions', 'loops'],
            message: 'Incorrect indentation',
            suggestions: [
                'Use consistent indentation (4 spaces recommended)',
                'Check code blocks are properly indented',
                'Review Python indentation rules'
            ]
        }
    },
    processing: {
        'cannot find symbol': {
            topics: ['variables', 'functions'],
            message: 'Variable or function not recognized',
            suggestions: [
                'Check Processing-specific functions and variables',
                'Verify setup() and draw() function structure',
                'Review Processing reference documentation'
            ]
        },
        'The function': {
            topics: ['functions', 'syntax'],
            message: 'Function usage error',
            suggestions: [
                'Check function parameters and syntax',
                'Review Processing built-in functions',
                'Verify custom function definitions'
            ]
        }
    }
};

// Topic-specific code templates and exercises
const exerciseTemplates = {
    variables: {
        java: {
            title: 'Create Variables for Student Record',
            template: `// Create variables for a student record
int studentId = 12345;
String studentName = "Alex Smith";
double gpa = 3.75;
boolean isEnrolled = true;

System.out.println("Student: " + studentName);
System.out.println("ID: " + studentId);
System.out.println("GPA: " + gpa);
System.out.println("Enrolled: " + isEnrolled);`,
            expectedOutput: ['Student: Alex Smith', 'ID: 12345', 'GPA: 3.75', 'Enrolled: true']
        },
        python: {
            title: 'Create Variables for Student Record',
            template: `# Create variables for a student record
student_id = 12345
student_name = "Alex Smith"
gpa = 3.75
is_enrolled = True

print(f"Student: {student_name}")
print(f"ID: {student_id}")
print(f"GPA: {gpa}")
print(f"Enrolled: {is_enrolled}")`,
            expectedOutput: ['Student: Alex Smith', 'ID: 12345', 'GPA: 3.75', 'Enrolled: True']
        },
        processing: {
            title: 'Create Variables for Animation',
            template: `// Create variables for a bouncing ball
int ballX = 50;
int ballY = 50;
int ballSpeed = 3;
color ballColor = color(255, 100, 100);

void setup() {
  size(400, 300);
}

void draw() {
  background(220);
  fill(ballColor);
  ellipse(ballX, ballY, 30, 30);
  ballX += ballSpeed;

  if (ballX > width || ballX < 0) {
    ballSpeed *= -1;
  }
}`,
            expectedOutput: ['Creates animated bouncing ball']
        }
    },
    operations: {
        java: {
            title: 'Calculate Restaurant Bill',
            template: `// Calculate restaurant bill with tip
double mealCost = 25.50;
double tipPercent = 0.18;
int numberOfPeople = 2;

double tipAmount = mealCost * tipPercent;
double totalBill = mealCost + tipAmount;
double costPerPerson = totalBill / numberOfPeople;

System.out.println("Meal cost: $" + mealCost);
System.out.println("Tip amount: $" + tipAmount);
System.out.println("Total bill: $" + totalBill);
System.out.println("Cost per person: $" + costPerPerson);`,
            expectedOutput: ['Meal cost: $25.5', 'Tip amount: $4.59', 'Total bill: $30.09', 'Cost per person: $15.045']
        }
    },
    conditions: {
        java: {
            title: 'Grade Calculator with Conditions',
            template: `// Determine letter grade based on score
int score = 87;
String letterGrade;

if (score >= 90) {
    letterGrade = "A";
} else if (score >= 80) {
    letterGrade = "B";
} else if (score >= 70) {
    letterGrade = "C";
} else if (score >= 60) {
    letterGrade = "D";
} else {
    letterGrade = "F";
}

System.out.println("Score: " + score);
System.out.println("Letter Grade: " + letterGrade);`,
            expectedOutput: ['Score: 87', 'Letter Grade: B']
        }
    }
};

// Initialize CodeRunner integration
document.addEventListener('DOMContentLoaded', function() {
    initializeCodeRunner();
    initializeTopicSelection();
    initializeLanguageSelection();
});

function initializeCodeRunner() {
    const runButton = document.getElementById('run-code-btn');
    const clearButton = document.getElementById('clear-code-btn');
    const codeEditor = document.getElementById('code-editor');

    if (runButton) {
        runButton.addEventListener('click', executeCode);
    }

    if (clearButton) {
        clearButton.addEventListener('click', clearCode);
    }

    // Load initial exercise
    loadExercise(currentTopic, currentLanguage);
}

function initializeTopicSelection() {
    const topicButtons = document.querySelectorAll('.topic-btn');

    topicButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            topicButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update current topic
            currentTopic = this.getAttribute('data-topic');

            // Load new exercise
            loadExercise(currentTopic, currentLanguage);
        });
    });
}

function initializeLanguageSelection() {
    const languageButtons = document.querySelectorAll('.language-icon');

    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLanguage = this.getAttribute('data-language');

            if (selectedLanguage !== currentLanguage) {
                // Update active state
                languageButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Update current language
                currentLanguage = selectedLanguage;

                // Load exercise for new language
                loadExercise(currentTopic, currentLanguage);
            }
        });
    });
}

function loadExercise(topic, language) {
    const exercise = exerciseTemplates[topic]?.[language];
    const titleElement = document.getElementById('current-exercise-title');
    const codeEditor = document.getElementById('code-editor');

    if (exercise) {
        titleElement.textContent = `Exercise: ${exercise.title}`;
        codeEditor.value = exercise.template;
    } else {
        titleElement.textContent = `Exercise: ${topic} (${language})`;
        codeEditor.value = `// Write your ${language} code for ${topic} here...`;
    }

    // Clear previous results
    clearResults();
}

function executeCode() {
    const codeEditor = document.getElementById('code-editor');
    const code = codeEditor.value.trim();

    if (!code) {
        showFeedback('No code to execute', 'warning');
        return;
    }

    // Show loading state
    setLoadingState(true);

    // Simulate code execution (in real implementation, this would call CodeRunner API)
    setTimeout(() => {
        simulateCodeExecution(code);
        setLoadingState(false);
    }, 1000);
}

function simulateCodeExecution(code) {
    // Simulate different execution scenarios
    const randomOutcome = Math.random();

    if (randomOutcome < 0.3) {
        // Simulate error
        simulateError(code);
    } else if (randomOutcome < 0.6) {
        // Simulate success with warnings
        simulateSuccessWithWarnings(code);
    } else {
        // Simulate complete success
        simulateSuccess(code);
    }
}

function simulateError(code) {
    const errors = [
        {
            line: 3,
            message: 'cannot find symbol: variable studentId',
            type: 'CompileError'
        },
        {
            line: 1,
            message: 'expected `;`',
            type: 'SyntaxError'
        }
    ];

    const error = errors[Math.floor(Math.random() * errors.length)];

    showOutput(`Error on line ${error.line}: ${error.message}`, 'error');
    analyzeError(error, code);
    generateStudySuggestions(error.message, code);
}

function simulateSuccessWithWarnings(code) {
    const exercise = exerciseTemplates[currentTopic]?.[currentLanguage];
    const output = exercise?.expectedOutput || ['Code executed successfully'];

    showOutput(output.join('\n'), 'success');

    const warnings = [
        'Consider using more descriptive variable names',
        'Add comments to explain your code',
        'Consider using constants for fixed values'
    ];

    const warning = warnings[Math.floor(Math.random() * warnings.length)];
    showFeedback(warning, 'suggestion');
    generateStudySuggestions('improvement', code);
}

function simulateSuccess(code) {
    const exercise = exerciseTemplates[currentTopic]?.[currentLanguage];
    const output = exercise?.expectedOutput || ['Code executed successfully'];

    showOutput(output.join('\n'), 'success');
    showFeedback('Great job! Your code executed successfully.', 'success');
    generateStudySuggestions('success', code);
}

function analyzeError(error, code) {
    const patterns = errorPatterns[currentLanguage] || {};

    // Find matching error pattern
    for (const [pattern, info] of Object.entries(patterns)) {
        if (error.message.toLowerCase().includes(pattern.toLowerCase())) {
            showDetailedErrorAnalysis(info, error);
            return;
        }
    }

    // Default error analysis
    showFeedback(`Error: ${error.message}`, 'error');
}

function showDetailedErrorAnalysis(errorInfo, error) {
    const feedbackContent = document.getElementById('feedback-content');

    feedbackContent.innerHTML = `
        <div class="feedback-item feedback-type-error">
            <div class="feedback-title">
                🚨 ${errorInfo.message}
            </div>
            <div class="feedback-description">
                <p><strong>What happened:</strong> ${error.message}</p>
                <p><strong>How to fix it:</strong></p>
                <ul>
                    ${errorInfo.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function generateStudySuggestions(errorType, code) {
    const suggestionsContent = document.getElementById('study-suggestions');
    let suggestions = [];

    if (errorType === 'success') {
        suggestions = [
            {
                title: 'Next Challenge',
                description: 'Try the next topic to continue your learning journey',
                link: getNextTopic()
            },
            {
                title: 'Advanced Techniques',
                description: 'Learn more advanced concepts for this topic',
                link: `#${currentTopic}-advanced`
            }
        ];
    } else if (errorType === 'improvement') {
        suggestions = [
            {
                title: 'Code Style Guide',
                description: 'Learn best practices for writing clean, readable code',
                link: '#code-style'
            },
            {
                title: 'Debugging Techniques',
                description: 'Master debugging skills to catch errors early',
                link: '#debugging'
            }
        ];
    } else {
        // Error-based suggestions
        const patterns = errorPatterns[currentLanguage] || {};

        for (const [pattern, info] of Object.entries(patterns)) {
            if (errorType.toLowerCase().includes(pattern.toLowerCase())) {
                suggestions = info.topics.map(topic => ({
                    title: getTopicTitle(topic),
                    description: `Review ${topic} concepts to understand this error better`,
                    link: `../index.html#${topic}`
                }));
                break;
            }
        }
    }

    if (suggestions.length === 0) {
        suggestions = [
            {
                title: 'Programming Fundamentals',
                description: 'Review basic programming concepts',
                link: '../index.html#fundamentals'
            }
        ];
    }

    suggestionsContent.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item">
            <div class="suggestion-title">${suggestion.title}</div>
            <div class="suggestion-description">${suggestion.description}</div>
            <a href="${suggestion.link}" class="suggestion-link">Study This Topic</a>
        </div>
    `).join('');
}

function showOutput(content, type) {
    const outputContent = document.getElementById('code-output');
    const className = type === 'error' ? 'output-error' : 'output-success';

    outputContent.innerHTML = `
        <div class="${className}">
            <pre class="output-line">${content}</pre>
        </div>
    `;
}

function showFeedback(message, type) {
    const feedbackContent = document.getElementById('feedback-content');
    const icon = type === 'error' ? '🚨' : type === 'warning' ? '⚠️' : type === 'suggestion' ? '💡' : '✅';

    feedbackContent.innerHTML = `
        <div class="feedback-item feedback-type-${type}">
            <div class="feedback-title">
                ${icon} ${message}
            </div>
        </div>
    `;
}

function clearCode() {
    const codeEditor = document.getElementById('code-editor');
    codeEditor.value = '';
    clearResults();
}

function clearResults() {
    const outputContent = document.getElementById('code-output');
    const feedbackContent = document.getElementById('feedback-content');
    const suggestionsContent = document.getElementById('study-suggestions');

    outputContent.innerHTML = '<div class="output-placeholder">Click "Run Code" to see output here...</div>';
    feedbackContent.innerHTML = '<div class="feedback-placeholder"><p>💡 <strong>Getting Started:</strong></p><p>Write some code and click "Run Code" to get personalized feedback and suggestions for improvement!</p></div>';
    suggestionsContent.innerHTML = '<div class="suggestions-placeholder"><p>📚 Based on your code, we\'ll suggest relevant study materials to help you learn more effectively.</p></div>';
}

function setLoadingState(isLoading) {
    const runButton = document.getElementById('run-code-btn');
    const editorSection = document.querySelector('.code-editor-section');

    if (isLoading) {
        runButton.textContent = '⏳ Running...';
        runButton.disabled = true;
        editorSection.classList.add('running-code');

        // Show spinner in output
        document.getElementById('code-output').innerHTML = '<div class="loading-spinner"></div>';
    } else {
        runButton.textContent = '▶ Run Code';
        runButton.disabled = false;
        editorSection.classList.remove('running-code');
    }
}

function getTopicTitle(topicId) {
    const titles = {
        'variables': 'Variables & Data Types',
        'operations': 'Basic Operations',
        'conditions': 'Conditional Statements',
        'loops': 'Loops & Iteration',
        'functions': 'Functions & Methods',
        'arrays': 'Arrays & Lists',
        'syntax': 'Programming Syntax'
    };
    return titles[topicId] || 'Programming Concepts';
}

function getNextTopic() {
    const topicOrder = ['variables', 'operations', 'conditions', 'loops', 'functions', 'arrays'];
    const currentIndex = topicOrder.indexOf(currentTopic);
    const nextIndex = (currentIndex + 1) % topicOrder.length;
    return `../index.html#${topicOrder[nextIndex]}`;
}

// Error modal functionality
function showErrorModal(error) {
    const modal = document.getElementById('error-modal');
    const explanation = document.getElementById('error-explanation');
    const suggestions = document.getElementById('error-suggestions');

    explanation.innerHTML = `<h4>Error Details:</h4><p>${error.message}</p>`;

    modal.style.display = 'flex';

    // Close modal handlers
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.querySelector('.error-modal-close').addEventListener('click', function() {
        modal.style.display = 'none';
    });
}