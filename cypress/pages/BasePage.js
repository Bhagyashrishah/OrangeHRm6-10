/**
 * Base Page Object Model class
 * Contains common methods that can be inherited by all page objects
 */
class BasePage {
  constructor() {
    this.url = '';
    this.pageTitle = '';
  }

  /**
   * Navigate to the page
   * @param {string} url - URL to navigate to (optional, uses this.url if not provided)
   */
  visit(url = this.url) {
    cy.visit(url);
    return this;
  }

  /**
   * Wait for page to load completely
   * @param {number} timeout - Maximum time to wait in milliseconds
   */
  waitForPageLoad(timeout = 10000) {
    cy.get('body', { timeout }).should('be.visible');
    return this;
  }

  /**
   * Verify page title
   * @param {string} title - Expected page title
   */
  verifyPageTitle(title = this.pageTitle) {
    cy.title().should('contain', title);
    return this;
  }

  /**
   * Verify current URL contains expected path
   * @param {string} path - Expected URL path
   */
  verifyUrl(path) {
    cy.url().should('include', path);
    return this;
  }

  /**
   * Click element with retry logic
   * @param {string} selector - Element selector
   * @param {object} options - Options for click action
   */
  clickElement(selector, options = {}) {
    cy.get(selector, { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click(options);
    return this;
  }

  /**
   * Type text into input field
   * @param {string} selector - Input field selector
   * @param {string} text - Text to type
   * @param {object} options - Options for type action
   */
  typeText(selector, text, options = {}) {
    cy.get(selector, { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled');
    cy.get(selector).clear();
    cy.get(selector).type(text, options);
    return this;
  }

  /**
   * Select option from dropdown
   * @param {string} selector - Dropdown selector
   * @param {string} value - Value to select
   */
  selectOption(selector, value) {
    cy.get(selector, { timeout: 10000 }).should('be.visible').select(value);
    return this;
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - Element selector
   * @param {number} timeout - Maximum time to wait
   */
  waitForElement(selector, timeout = 10000) {
    cy.get(selector, { timeout }).should('be.visible');
    return this;
  }

  /**
   * Wait for element to disappear
   * @param {string} selector - Element selector
   * @param {number} timeout - Maximum time to wait
   */
  waitForElementToDisappear(selector, timeout = 10000) {
    cy.get(selector, { timeout }).should('not.exist');
    return this;
  }

  /**
   * Check if element exists
   * @param {string} selector - Element selector
   * @returns {boolean} - True if element exists, false otherwise
   */
  elementExists(selector) {
    return cy.get('body').then(($body) => {
      return $body.find(selector).length > 0;
    });
  }

  /**
   * Get element text
   * @param {string} selector - Element selector
   * @returns {string} - Element text content
   */
  getElementText(selector) {
    return cy.get(selector, { timeout: 10000 }).invoke('text');
  }

  /**
   * Verify element contains text
   * @param {string} selector - Element selector
   * @param {string} text - Expected text
   */
  verifyElementText(selector, text) {
    cy.get(selector, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', text);
    return this;
  }

  /**
   * Verify element is visible
   * @param {string} selector - Element selector
   */
  verifyElementVisible(selector) {
    cy.get(selector, { timeout: 10000 }).should('be.visible');
    return this;
  }

  /**
   * Verify element is not visible
   * @param {string} selector - Element selector
   */
  verifyElementNotVisible(selector) {
    cy.get(selector).should('not.be.visible');
    return this;
  }

  /**
   * Scroll to element
   * @param {string} selector - Element selector
   */
  scrollToElement(selector) {
    cy.get(selector, { timeout: 10000 }).scrollIntoView();
    return this;
  }

  /**
   * Upload file
   * @param {string} selector - File input selector
   * @param {string} filePath - Path to file in fixtures
   */
  uploadFile(selector, filePath) {
    cy.get(selector, { timeout: 10000 })
      .should('be.visible')
      .selectFile(`cypress/fixtures/${filePath}`);
    return this;
  }

  /**
   * Wait for loading spinner to disappear
   * @param {string} selector - Loading spinner selector
   */
  waitForLoadingToComplete(selector = '[data-cy="loading"]') {
    cy.get(selector, { timeout: 30000 }).should('not.exist');
    return this;
  }

  /**
   * Take screenshot with custom name
   * @param {string} name - Screenshot name
   */
  takeScreenshot(name) {
    cy.screenshot(name);
    return this;
  }

  /**
   * Verify alert message
   * @param {string} message - Expected alert message
   */
  verifyAlert(message) {
    cy.on('window:alert', (alertMessage) => {
      expect(alertMessage).to.equal(message);
    });
    return this;
  }

  /**
   * Handle confirmation dialog
   * @param {boolean} accept - Whether to accept or dismiss the dialog
   */
  handleConfirmation(accept = true) {
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(accept);
    });
    return this;
  }
}

export default BasePage;
