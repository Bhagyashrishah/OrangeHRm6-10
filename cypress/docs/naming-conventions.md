# Cypress Automation Framework - Naming Conventions

## 🎯 Overview

This document outlines the standardized naming conventions used throughout the Cypress automation framework. Consistent naming conventions ensure code readability, maintainability, and team collaboration.

## 📁 File and Folder Structure

### Directory Naming
```
cypress/
├── e2e/                          # End-to-end tests
│   ├── dashboard/               # Feature-based organization
│   │   ├── end-to-end/         # Full workflow tests
│   │   │   ├── module1/        # Sub-module organization
│   │   │   └── module2/
│   │   └── smoke/              # Smoke tests
│   │       ├── module1/
│   │       └── module2/
│   └── login/                  # Another feature
├── pages/                      # Page Object Model
│   ├── BasePage.js            # Base page class
│   ├── DashboardPage.js       # Feature page objects
│   └── LoginPage.js
├── support/                   # Support files
│   ├── commands.js            # Custom commands
│   └── e2e.js                 # E2E configuration
├── fixtures/                  # Test data
│   ├── dashboard/             # Feature-based fixtures
│   └── users.json             # Data files
└── utils/                     # Utility functions
    ├── date-time.js           # Utility modules
    └── testUtils.js
```

### File Naming Conventions

#### Test Files
- **Pattern**: `[feature].cy.js`
- **Examples**:
  ```bash
  dashboard.cy.js          # Smoke tests for dashboard
  login.cy.js         # Regression tests for login
  checkout.cy.js            # End-to-end checkout tests
  api.auth.cy.js                # API authentication tests
  ```

#### Page Object Files
- **Pattern**: `[Feature]Page.js`
- **Examples**:
  ```bash
  DashboardPage.js              # Dashboard page object
  LoginPage.js                  # Login page object
  CheckoutPage.js               # Checkout page object
  ProductPage.js                # Product page object
  ```

#### Utility Files
- **Pattern**: `[purpose]-[type].js` or `[Purpose]Utils.js`
- **Examples**:
  ```bash
  date-time.js                  # Date and time utilities
  testUtils.js                  # Test utilities
  api-helpers.js               # API helper functions
  string-utils.js              # String manipulation utilities
  ```

#### Configuration Files
- **Pattern**: `[purpose].config.js` or `[Purpose]Config.js`
- **Examples**:
  ```bash
  cypress.config.js             # Main Cypress configuration
  eslint.config.mjs            # ESLint configuration
  prettier.config.js           # Prettier configuration
  ```

## 🧪 Test Naming Conventions

### Test Suite Names (describe blocks)
- **Pattern**: `"[Feature/Action] - [Purpose/Scenario]"`
- **Examples**:
  ```javascript
  describe('Dashboard - User Management', () => {
    // Tests related to user management on dashboard
  });

  describe('Login - Authentication Flow', () => {
    // Tests for login authentication
  });

  describe('Checkout - Payment Processing', () => {
    // Tests for checkout and payment
  });
  ```

### Test Case Names (it blocks)
- **Pattern**: `"should [action] [when/when] [expected result]"`
- **Examples**:
  ```javascript
  it('should display dashboard when user logs in successfully', () => {
    // Test implementation
  });

  it('should show error message when invalid credentials are entered', () => {
    // Test implementation
  });

  it('should redirect to checkout page when add to cart is clicked', () => {
    // Test implementation
  });
  ```

### Test Case Naming Best Practices
- **Start with "should"** for consistency
- **Use descriptive action verbs**: display, show, redirect, validate, submit, etc.
- **Include context**: when user logs in, when button is clicked, etc.
- **Specify expected outcome**: successfully, with error, to checkout page, etc.

## 🔧 Code Naming Conventions

### Variables and Constants

#### JavaScript Variables
- **Pattern**: `camelCase` for variables, `UPPER_SNAKE_CASE` for constants
- **Examples**:
  ```javascript
  const userName = 'john.doe';
  const API_BASE_URL = 'https://api.example.com';
  const MAX_RETRY_ATTEMPTS = 3;

  let currentUser;
  let isLoggedIn = false;
  let selectedProducts = [];
  ```

#### Cypress-Specific Variables
- **Pattern**: Descriptive names with context
- **Examples**:
  ```javascript
  const validCredentials = { email: 'test@example.com', password: 'password123' };
  const dashboardElements = { header: '[data-cy="dashboard-header"]' };
  const testTimeouts = { pageLoad: 10000, apiCall: 5000 };
  ```

### Functions and Methods

#### Page Object Methods
- **Pattern**: `camelCase` with descriptive action verbs
- **Examples**:
  ```javascript
  class LoginPage {
    enterUsername(username) {
      // Implementation
    }

    enterPassword(password) {
      // Implementation
    }

    clickLoginButton() {
      // Implementation
    }

    verifyLoginSuccess() {
      // Implementation
    }
  }
  ```

#### Custom Commands
- **Pattern**: `camelCase` with clear purpose
- **Examples**:
  ```javascript
  Cypress.Commands.add('login', (credentials) => {
    // Implementation
  });

  Cypress.Commands.add('createTestUser', (userData) => {
    // Implementation
  });

  Cypress.Commands.add('waitForPageLoad', () => {
    // Implementation
  });
  ```

#### Utility Functions
- **Pattern**: `camelCase` with descriptive names
- **Examples**:
  ```javascript
  function generateRandomEmail() {
    // Implementation
  }

  function formatDateForDisplay(date) {
    // Implementation
  }

  function validateEmailFormat(email) {
    // Implementation
  }
  ```

## 🎯 Selector Naming Conventions

### Data Attributes (Recommended)
- **Pattern**: `data-cy="[feature]-[element]-[state]"`
- **Examples**:
  ```html
  <!-- Login Page -->
  <input data-cy="login-username-input" />
  <input data-cy="login-password-input" />
  <button data-cy="login-submit-button" />

  <!-- Dashboard -->
  <div data-cy="dashboard-header" />
  <button data-cy="dashboard-logout-button" />
  <table data-cy="dashboard-users-table" />
  ```

### Selector Constants
- **Pattern**: `UPPER_SNAKE_CASE` grouped by feature
- **Examples**:
  ```javascript
  // selectors/loginSelectors.js
  export const LOGIN_SELECTORS = {
    USERNAME_INPUT: '[data-cy="login-username-input"]',
    PASSWORD_INPUT: '[data-cy="login-password-input"]',
    SUBMIT_BUTTON: '[data-cy="login-submit-button"]',
    ERROR_MESSAGE: '[data-cy="login-error-message"]'
  };

  // selectors/dashboardSelectors.js
  export const DASHBOARD_SELECTORS = {
    HEADER: '[data-cy="dashboard-header"]',
    USER_TABLE: '[data-cy="dashboard-users-table"]',
    LOGOUT_BUTTON: '[data-cy="dashboard-logout-button"]'
  };
  ```

## 📊 Test Data Naming

### Fixture Files
- **Pattern**: `[data-type].json` or `[feature]-[data-type].json`
- **Examples**:
  ```bash
  fixtures/
  ├── users.json                 # User test data
  ├── products.json             # Product test data
  ├── dashboard-users.json      # Dashboard-specific user data
  ├── login-credentials.json    # Login test credentials
  └── api-responses.json        # API response mocks
  ```

### Test Data Structure
- **Pattern**: Descriptive object keys with consistent naming
- **Examples**:
  ```json
  {
    "validUser": {
      "email": "test@example.com",
      "password": "password123",
      "firstName": "John",
      "lastName": "Doe"
    },
    "invalidCredentials": [
      {
        "email": "invalid@email",
        "password": "wrong"
      }
    ]
  }
  ```

## 🏷️ Test Tags and Grouping

### Cypress Grep Tags
- **Pattern**: `@[category]:[subcategory]` or `@[type]`
- **Examples**:
  ```javascript
  it('should login with valid credentials @smoke @login', () => {
    // Smoke test for login
  });

  it('should handle invalid credentials @regression @login @negative', () => {
    // Regression test for login error handling
  });

  it('should validate email format @api @validation', () => {
    // API validation test
  });
  ```

### Tag Categories
- **Test Types**: `@smoke`, `@regression`, `@e2e`, `@api`
- **Features**: `@login`, `@dashboard`, `@checkout`, `@profile`
- **Test Characteristics**: `@critical`, `@blocker`, `@performance`, `@accessibility`
- **Environments**: `@staging`, `@production`

## 🔄 Environment and Configuration

### Environment Variables
- **Pattern**: `CYPRESS_[PURPOSE]_[DETAIL]`
- **Examples**:
  ```bash
  CYPRESS_BASEURL=https://myapp.com
  CYPRESS_ENVIRONMENT=staging
  CYPRESS_USERNAME=testuser
  CYPRESS_PASSWORD=testpass
  CYPRESS_API_KEY=your-api-key
  CYPRESS_TIMEOUT_PAGELOAD=10000
  ```

### Configuration Objects
- **Pattern**: Descriptive names with consistent structure
- **Examples**:
  ```javascript
  const TEST_CONFIG = {
    timeouts: {
      pageLoad: 10000,
      apiCall: 5000,
      elementWait: 3000
    },
    credentials: {
      admin: { username: 'admin', password: 'admin123' },
      user: { username: 'user', password: 'user123' }
    },
    urls: {
      baseUrl: 'https://myapp.com',
      apiUrl: 'https://api.myapp.com'
    }
  };
  ```

## 📝 Documentation Naming

### Documentation Files
- **Pattern**: `[topic]-[type].md` or `[Topic]Guide.md`
- **Examples**:
  ```bash
  docs/
  ├── setup-guide.md            # Setup instructions
  ├── api-reference.md          # API documentation
  ├── troubleshooting.md        # Troubleshooting guide
  ├── best-practices.md         # Best practices
  ├── ci-cd-integration.md      # CI/CD documentation
  ├── NamingConventions.md      # This file
  └── FrameworkGuide.md         # Main framework guide
  ```

## 🌿 Git Branch and Commit Naming

### Branch Naming
- **Pattern**: `[type]/[feature]-[description]`
- **Examples**:
  ```bash
  feature/add-login-tests       # New feature
  bugfix/fix-dashboard-loading  # Bug fix
  refactor/update-page-objects  # Code refactoring
  test/add-api-test-coverage    # Test improvements
  docs/update-naming-conventions # Documentation
  ```

### Commit Message Format
- **Pattern**: `[type]: [description]`
- **Examples**:
  ```bash
  feat: add login page object with authentication methods
  fix: resolve dashboard loading timeout issue
  test: add smoke tests for user registration
  docs: update naming conventions documentation
  refactor: improve custom command structure
  ```

## 🎨 Code Style and Formatting

### ESLint Configuration
- **Pattern**: Consistent with JavaScript standards
- **Examples**:
  ```javascript
  // Good: Descriptive variable names
  const userAuthenticationService = new AuthService();

  // Bad: Non-descriptive names
  const x = new AuthService();

  // Good: Consistent function naming
  function validateUserCredentials(credentials) {
    // Implementation
  }

  // Bad: Inconsistent naming
  function checkUserCreds(creds) {
    // Implementation
  }
  ```

## 📋 Naming Convention Checklist

### ✅ File Organization
- [ ] Test files follow `[feature].[type].cy.js` pattern
- [ ] Page objects use `[Feature]Page.js` pattern
- [ ] Utilities follow `[purpose]-[type].js` pattern
- [ ] Documentation uses descriptive names

### ✅ Code Quality
- [ ] Variables use `camelCase`
- [ ] Constants use `UPPER_SNAKE_CASE`
- [ ] Functions use descriptive `camelCase` names
- [ ] Selectors use `data-cy` attributes with consistent naming

### ✅ Test Structure
- [ ] Test suites have descriptive names
- [ ] Test cases start with "should"
- [ ] Tags are used consistently
- [ ] Fixtures have meaningful names

### ✅ Documentation
- [ ] All files have appropriate naming
- [ ] Configuration is well-documented
- [ ] Git commits follow conventional format

## 🚀 Benefits of Consistent Naming

### 🔍 **Improved Readability**
- Code is self-documenting
- Easy to understand purpose and context
- Reduces cognitive load when reviewing code

### 🤝 **Better Collaboration**
- Team members can quickly understand code structure
- Consistent patterns across the codebase
- Easier code reviews and knowledge sharing

### 🛠️ **Enhanced Maintainability**
- Easy to locate files and functions
- Predictable code organization
- Simplified refactoring and updates

### 📊 **Better Testing**
- Clear test organization and categorization
- Easy to run specific test suites
- Improved debugging and troubleshooting

## 📚 Related Documentation

- [Setup Guide](./setup-guide.md) - Framework setup instructions
- [API Reference](./api-reference.md) - Custom commands and utilities
- [Best Practices](./best-practices.md) - Testing best practices
- [Troubleshooting](./troubleshooting.md) - Common issues and solutions
- [Framework Guide](../FRAMEWORK_GUIDE.md) - Complete framework overview

---

**Following these naming conventions ensures a professional, maintainable, and scalable test automation framework!** 🎯
