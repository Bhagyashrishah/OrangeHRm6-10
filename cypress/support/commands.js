// ***********************************************
// Enhanced Custom Commands for Cypress Automation
// Following best practices and common patterns
// ***********************************************

// ============================================
// AUTHENTICATION COMMANDS
// ============================================

/**
 * Login command with session management for performance
 * @param {string} username - Username (optional, uses env var if not provided)
 * @param {string} password - Password (optional, uses env var if not provided)
 */
Cypress.Commands.add('login', (username, password) => {
  const user = username || Cypress.env('CYPRESS_USERNAME');
  const pass = password || Cypress.env('CYPRESS_PASSWORD');

  cy.session([user, pass], () => {
    cy.visit('/');
    cy.get("[data-test='username']", { timeout: 10000 })
      .should('be.visible')
      .type(user);
    cy.get("[data-test='password']", { timeout: 10000 })
      .should('be.visible')
      .type(pass);
    cy.get('#login-button').click();

    // Wait for successful login
    cy.url().should('not.include', '/login');
  });
});

/**
 * Logout command
 */
Cypress.Commands.add('logout', () => {
  cy.get('[data-cy="logout-btn"]', { timeout: 10000 })
    .should('be.visible')
    .click();
  cy.url().should('include', '/login');
});

// ============================================
// ELEMENT INTERACTION COMMANDS
// ============================================

/**
 * Click element with retry logic and better error handling
 * @param {string} selector - Element selector
 * @param {object} options - Options for click action
 */
Cypress.Commands.add('clickElement', (selector, options = {}) => {
  cy.get(selector, { timeout: 10000 })
    .should('be.visible')
    .and('not.be.disabled')
    .click(options);
});

/**
 * Type text with clear and validation
 * @param {string} selector - Input field selector
 * @param {string} text - Text to type
 * @param {object} options - Options for type action
 */
Cypress.Commands.add('typeText', (selector, text, options = {}) => {
  cy.get(selector, { timeout: 10000 }).should('be.visible');
  cy.get(selector).should('not.be.disabled');
  cy.get(selector).clear();
  cy.get(selector).type(text, options); // It is unsafe to chain further commands that rely on the subject after this command. It is best to split the chain, chaining again from `cy.` in a next command line.
  cy.get(selector).should('have.value', text);
});

/**
 * Select dropdown option
 * @param {string} selector - Dropdown selector
 * @param {string} value - Value to select
 */
Cypress.Commands.add('selectDropdown', (selector, value) => {
  cy.get(selector, { timeout: 10000 }).should('be.visible').select(value);
  cy.get(selector) // Re-get the element to ensure the value assertion is on the selected element
    .should('have.value', value); // Assert the value after selection
});

// ============================================
// WAIT AND LOADING COMMANDS
// ============================================

/**
 * Wait for loading spinner to disappear
 * @param {string} selector - Loading spinner selector
 * @param {number} timeout - Maximum time to wait
 */
Cypress.Commands.add(
  'waitForLoading',
  (selector = '[data-cy="loading"]', timeout = 30000) => {
    cy.get(selector, { timeout }).should('not.exist');
  }
);

/**
 * Wait for element to be visible and interactable
 * @param {string} selector - Element selector
 * @param {number} timeout - Maximum time to wait
 */
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible').and('not.be.disabled');
});

/**
 * Wait for API response
 * @param {string} alias - API alias created with cy.intercept()
 * @param {number} timeout - Maximum time to wait
 */
Cypress.Commands.add('waitForAPI', (alias, timeout = 30000) => {
  cy.wait(alias, { timeout });
});

// ============================================
// ASSERTION COMMANDS
// ============================================

/**
 * Verify element contains text
 * @param {string} selector - Element selector
 * @param {string} text - Expected text
 */
Cypress.Commands.add('verifyText', (selector, text) => {
  cy.get(selector, { timeout: 10000 })
    .should('be.visible')
    .and('contain.text', text);
});

/**
 * Verify element is visible
 * @param {string} selector - Element selector
 */
Cypress.Commands.add('verifyVisible', (selector) => {
  cy.get(selector, { timeout: 10000 }).should('be.visible');
});

/**
 * Verify element is not visible
 * @param {string} selector - Element selector
 */
Cypress.Commands.add('verifyNotVisible', (selector) => {
  cy.get(selector).should('not.be.visible');
});

/**
 * Verify URL contains path
 * @param {string} path - Expected URL path
 */
Cypress.Commands.add('verifyURL', (path) => {
  cy.url().should('include', path);
});

// ============================================
// FILE UPLOAD COMMANDS
// ============================================

/**
 * Upload file from fixtures
 * @param {string} selector - File input selector
 * @param {string} fileName - File name in fixtures folder
 */
Cypress.Commands.add('uploadFile', (selector, fileName) => {
  cy.get(selector, { timeout: 10000 })
    .should('be.visible')
    .selectFile(`cypress/fixtures/${fileName}`);
});

// ============================================
// FORM COMMANDS
// ============================================

/**
 * Fill form with data object
 * @param {object} formData - Object containing form field data
 * Example: { username: 'user', email: 'user@example.com' }
 */
Cypress.Commands.add('fillForm', (formData) => {
  Object.keys(formData).forEach((fieldName) => {
    const selector = `[data-cy="${fieldName}"], [data-test="${fieldName}"], [name="${fieldName}"]`;
    cy.get(selector, { timeout: 10000 }).should('be.visible').clear();
    cy.get(selector).type(formData[fieldName]);
  });
});

// ============================================
// NAVIGATION COMMANDS
// ============================================

/**
 * Navigate to page and wait for load
 * @param {string} url - URL to navigate to
 * @param {object} options - Options for visit
 */
Cypress.Commands.add('navigateTo', (url, options = {}) => {
  cy.visit(url, options);
  cy.get('body', { timeout: 10000 }).should('be.visible');
});

// ============================================
// UTILITY COMMANDS
// ============================================

/**
 * Take screenshot with timestamp
 * @param {string} name - Screenshot name
 */
Cypress.Commands.add('takeScreenshot', (name) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  cy.screenshot(`${name}-${timestamp}`);
});

/**
 * Get element text content
 * @param {string} selector - Element selector
 */
Cypress.Commands.add('getElementText', (selector) => {
  return cy.get(selector, { timeout: 10000 }).invoke('text');
});

/**
 * Scroll to element
 * @param {string} selector - Element selector
 */
Cypress.Commands.add('scrollToElement', (selector) => {
  cy.get(selector, { timeout: 10000 }).scrollIntoView();
});

// ============================================
// DATABASE COMMANDS (if needed)
// ============================================

/**
 * Reset database to clean state
 */
Cypress.Commands.add('resetDB', () => {
  cy.task('db:reset');
});

/**
 * Seed database with test data
 * @param {string} seedType - Type of seed data
 */
Cypress.Commands.add('seedDB', (seedType) => {
  cy.task('db:seed', seedType);
});

// ============================================
// OVERWRITE EXISTING COMMANDS
// ============================================

/**
 * Enhanced visit command with better error handling
 */
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  const newOptions = {
    failOnStatusCode: false,
    timeout: 30000,
    ...options,
  };

  return originalFn(url, newOptions).then(() => {
    cy.get('body', { timeout: 10000 }).should('be.visible');
  });
});

// ============================================
// CHILD COMMANDS
// ============================================

/**
 * Clear and type into an element
 */
Cypress.Commands.add(
  'clearAndType',
  { prevSubject: 'element' },
  (subject, text) => {
    cy.wrap(subject).clear();
    cy.wrap(subject).type(text);
  }
);

/**
 * Click if visible
 */
Cypress.Commands.add(
  'clickIfVisible',
  { prevSubject: 'element' },
  (subject) => {
    cy.wrap(subject).then(($el) => {
      if ($el.is(':visible')) {
        cy.wrap($el).click();
      }
    });
  }
);

// ============================================
// DUAL COMMANDS
// ============================================

/**
 * Find element by text content
 */
Cypress.Commands.add(
  'findByText',
  { prevSubject: 'optional' },
  (subject, text) => {
    const context = subject ? cy.wrap(subject) : cy.get('body');
    return context.contains(text);
  }
);

/**
 * Find element by attribute value
 */
Cypress.Commands.add(
  'findByAttribute',
  { prevSubject: 'optional' },
  (subject, attr, value) => {
    const context = subject ? cy.wrap(subject) : cy.get('body');
    return context.find(`[${attr}="${value}"]`);
  }
);
