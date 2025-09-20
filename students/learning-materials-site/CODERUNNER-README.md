# CodeRunner Integration - Learning Materials

## Overview

This CodeRunner integration provides context-sensitive error handling and study material suggestions for the Learning Materials website. It helps students get immediate feedback on their code with personalized suggestions for improvement.

## Features

### 🎯 Context-Sensitive Error Analysis
- **Smart Error Detection**: Recognizes common programming errors across Java, Python, and Processing
- **Detailed Explanations**: Provides clear explanations of what went wrong and why
- **Targeted Suggestions**: Offers specific advice on how to fix each type of error

### 📚 Study Material Suggestions
- **Dynamic Recommendations**: Suggests relevant study materials based on detected errors
- **Topic Mapping**: Links errors to specific learning topics in the main curriculum
- **Progressive Learning**: Recommends next steps for successful code execution

### 🔄 Multi-Language Support
- **Java**: Full support for common Java errors and syntax issues
- **Python**: Handles Python-specific errors including indentation and type issues
- **Processing**: Specialized support for visual programming and graphics errors

### 💻 Interactive Code Testing
- **Real-time Feedback**: Immediate analysis of code as students write and execute
- **Exercise Templates**: Pre-loaded exercises for each learning topic
- **Visual Feedback**: Color-coded output and feedback panels

## File Structure

```
learning-materials-site/
├── coderunner-test.html        # Main test interface
├── coderunner-styles.css       # Styling for CodeRunner interface
├── coderunner-integration.js   # Core integration logic
├── images/                     # Language icon images
│   ├── java-icon.png
│   ├── processing-icon.png
│   └── python-icon.png
└── README.md                   # This file
```

## How It Works

### 1. Error Pattern Recognition
The system uses predefined error patterns to identify common mistakes:

```javascript
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
        }
        // ... more patterns
    }
};
```

### 2. Context-Aware Suggestions
Based on the current topic and detected errors, the system provides:
- **Immediate fixes** for the current error
- **Study material links** to relevant learning topics
- **Next steps** for continued learning

### 3. Adaptive Learning Path
The system tracks:
- Current learning topic
- Selected programming language
- Error patterns and frequency
- Success rate and progress

## Integration with CodeRunner.org.nz

### Current Implementation
The current version simulates CodeRunner functionality with:
- Mock code execution
- Simulated error responses
- Template-based feedback

### Real CodeRunner Integration
To integrate with actual CodeRunner.org.nz:

1. **API Configuration**:
```javascript
const CODERUNNER_CONFIG = {
    baseUrl: 'https://coderunner.org.nz/api',
    apiKey: 'your-api-key',
    timeout: 30000
};
```

2. **Replace Simulation Functions**:
```javascript
async function executeCodeReal(code, language, questionType) {
    const response = await fetch(`${CODERUNNER_CONFIG.baseUrl}/run`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CODERUNNER_CONFIG.apiKey}`
        },
        body: JSON.stringify({
            code: code,
            language: language,
            questionType: questionType
        })
    });

    return response.json();
}
```

3. **Error Processing Pipeline**:
```javascript
function processCodeRunnerResponse(response) {
    if (response.compilation_success) {
        if (response.test_results.every(test => test.passed)) {
            handleSuccess(response);
        } else {
            handleTestFailures(response.test_results);
        }
    } else {
        handleCompilationErrors(response.compilation_errors);
    }
}
```

## Usage Examples

### Basic Error Handling
When a student writes code with an error:
```java
// Student code with error
int score = 85
System.out.println("Score: " + score);
```

The system detects:
- **Error**: Missing semicolon
- **Suggestion**: Review Java syntax rules
- **Study Link**: Programming Syntax topic

### Success with Improvement Suggestions
For working code that could be improved:
```java
// Working but improvable code
int x = 10;
int y = 20;
int z = x + y;
System.out.println(z);
```

The system suggests:
- **Improvement**: Use descriptive variable names
- **Study Link**: Code Style & Standards
- **Next Topic**: More complex operations

## Configuration Options

### Error Sensitivity
```javascript
const CONFIG = {
    errorSensitivity: 'medium', // low, medium, high
    suggestionLevel: 'detailed', // brief, detailed, comprehensive
    autoSuggest: true,
    maxSuggestions: 3
};
```

### Language-Specific Settings
```javascript
const LANGUAGE_CONFIG = {
    java: {
        compileTimeout: 10000,
        runTimeout: 5000,
        memoryLimit: '128MB'
    },
    python: {
        runTimeout: 5000,
        memoryLimit: '64MB'
    },
    processing: {
        runTimeout: 10000,
        memoryLimit: '256MB',
        displayTimeout: 30000
    }
};
```

## Customization

### Adding New Error Patterns
```javascript
// Add to errorPatterns object
'your-new-error': {
    topics: ['relevant-topic'],
    message: 'Clear error description',
    suggestions: ['How to fix it', 'Prevention tips']
}
```

### Creating New Exercise Templates
```javascript
// Add to exerciseTemplates object
'new-topic': {
    'language': {
        title: 'Exercise Title',
        template: 'Starting code template',
        expectedOutput: ['Expected output lines']
    }
}
```

### Custom Study Suggestions
```javascript
function generateCustomSuggestions(errorType, code, topic) {
    // Your custom logic here
    return [
        {
            title: 'Custom Suggestion',
            description: 'Detailed explanation',
            link: 'path-to-resource'
        }
    ];
}
```

## Testing

### Local Testing
1. Start the local server: `python3 -m http.server 8080`
2. Open `http://localhost:8080/coderunner-test.html`
3. Test different error scenarios and language switching

### Error Scenarios to Test
- **Syntax Errors**: Missing semicolons, parentheses
- **Runtime Errors**: Division by zero, null references
- **Logic Errors**: Incorrect algorithm implementation
- **Style Issues**: Poor naming, missing comments

## Future Enhancements

### Planned Features
1. **Real-time Collaboration**: Share code and get peer feedback
2. **Progress Tracking**: Monitor learning progress over time
3. **Adaptive Difficulty**: Adjust exercise complexity based on performance
4. **AI-Powered Hints**: Use machine learning for smarter suggestions

### Integration Possibilities
1. **LMS Integration**: Connect with learning management systems
2. **Plagiarism Detection**: Check for code similarity
3. **Code Quality Metrics**: Analyze code complexity and maintainability
4. **Automated Testing**: Generate and run comprehensive test suites

## Support and Documentation

### Getting Help
- Review error messages carefully
- Check the study material suggestions
- Visit the main learning materials for detailed explanations
- Use the feedback system to report issues

### Contributing
To contribute to the CodeRunner integration:
1. Fork the repository
2. Create feature branches
3. Test thoroughly with all supported languages
4. Submit pull requests with clear descriptions

This integration transforms static learning materials into an interactive, responsive learning environment that adapts to each student's needs and provides immediate, actionable feedback.