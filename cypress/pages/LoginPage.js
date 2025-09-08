/**
 * Login Page Object Model
 * Extends BasePage and contains login-specific methods
 */

import BasePage from './BasePage.js';

class LoginPage extends BasePage {
  constructor() {
    super();
    this.url = '/login';
    this.pageTitle = 'Login';
  }

  // ============================================
  // ELEMENT SELECTORS
  // ============================================

  get usernameInput() {
    return '[data-test="username"], [data-cy="username"], #username';
  }

  get passwordInput() {
    return '[data-test="password"], [data-cy="password"], #password';
  }

  get loginButton() {
    return '[data-test="login-button"], [data-cy="login-btn"], #login-button';
  }

  get errorMessage() {
    return '[data-test="error"], [data-cy="error-message"], .error-message';
  }

  get forgotPasswordLink() {
    return '[data-test="forgot-password"], [data-cy="forgot-password"], a[href*="forgot"]';
  }

  get rememberMeCheckbox() {
    return '[data-test="remember"], [data-cy="remember-me"], #remember-me';
  }

  get signUpLink() {
    return '[data-test="signup"], [data-cy="signup-link"], a[href*="signup"]';
  }

  get loadingSpinner() {
    return '[data-cy="loading"], .spinner, .loading';
  }

  // ============================================
  // PAGE ACTIONS
  // ============================================

  /**
   * Navigate to login page
   * @returns {LoginPage} - Returns this instance for chaining
   */
  visitLoginPage() {
    this.visit();
    this.waitForPageLoad();
    return this;
  }

  /**
   * Enter username
   * @param {string} username - Username to enter
   * @returns {LoginPage} - Returns this instance for chaining
   */
  enterUsername(username) {
    this.typeText(this.usernameInput, username);
    return this;
  }

  /**
   * Enter password
   * @param {string} password - Password to enter
   * @returns {LoginPage} - Returns this instance for chaining
   */
  enterPassword(password) {
    this.typeText(this.passwordInput, password);
    return this;
  }

  /**
   * Click login button
   * @returns {LoginPage} - Returns this instance for chaining
   */
  clickLogin() {
    this.clickElement(this.loginButton);
    return this;
  }

  /**
   * Complete login process
   * @param {string} username - Username (optional, uses env var if not provided)
   * @param {string} password - Password (optional, uses env var if not provided)
   * @returns {LoginPage} - Returns this instance for chaining
   */
  login(username, password) {
    const user = username || Cypress.env('CYPRESS_USERNAME');
    const pass = password || Cypress.env('CYPRESS_PASSWORD');

    this.enterUsername(user).enterPassword(pass).clickLogin();

    // Wait for login to complete
    this.waitForLoadingToComplete(this.loadingSpinner);

    return this;
  }

  /**
   * Login with session (for performance)
   * @param {string} username - Username (optional, uses env var if not provided)
   * @param {string} password - Password (optional, uses env var if not provided)
   * @returns {LoginPage} - Returns this instance for chaining
   */
  loginWithSession(username, password) {
    cy.login(username, password);
    return this;
  }

  /**
   * Click forgot password link
   * @returns {LoginPage} - Returns this instance for chaining
   */
  clickForgotPassword() {
    this.clickElement(this.forgotPasswordLink);
    return this;
  }

  /**
   * Toggle remember me checkbox
   * @returns {LoginPage} - Returns this instance for chaining
   */
  toggleRememberMe() {
    this.clickElement(this.rememberMeCheckbox);
    return this;
  }

  /**
   * Click sign up link
   * @returns {LoginPage} - Returns this instance for chaining
   */
  clickSignUp() {
    this.clickElement(this.signUpLink);
    return this;
  }

  /**
   * Clear login form
   * @returns {LoginPage} - Returns this instance for chaining
   */
  clearForm() {
    cy.get(this.usernameInput).clear();
    cy.get(this.passwordInput).clear();
    return this;
  }

  // ============================================
  // VALIDATIONS
  // ============================================

  /**
   * Verify login page is displayed
   * @returns {LoginPage} - Returns this instance for chaining
   */
  verifyLoginPageDisplayed() {
    this.verifyUrl('/login');
    this.verifyElementVisible(this.usernameInput);
    this.verifyElementVisible(this.passwordInput);
    this.verifyElementVisible(this.loginButton);
    return this;
  }

  /**
   * Verify error message is displayed
   * @param {string} expectedMessage - Expected error message (optional)
   * @returns {LoginPage} - Returns this instance for chaining
   */
  verifyErrorMessage(expectedMessage) {
    this.verifyElementVisible(this.errorMessage);
    if (expectedMessage) {
      this.verifyElementText(this.errorMessage, expectedMessage);
    }
    return this;
  }

  /**
   * Verify successful login (user redirected away from login page)
   * @param {string} expectedUrl - Expected redirect URL (optional)
   * @returns {LoginPage} - Returns this instance for chaining
   */
  verifySuccessfulLogin(expectedUrl = '/dashboard') {
    cy.url().should('not.include', '/login');
    if (expectedUrl) {
      cy.url().should('include', expectedUrl);
    }
    return this;
  }

  /**
   * Verify login form is empty
   * @returns {LoginPage} - Returns this instance for chaining
   */
  verifyFormIsEmpty() {
    cy.get(this.usernameInput).should('have.value', '');
    cy.get(this.passwordInput).should('have.value', '');
    return this;
  }

  /**
   * Verify login button is disabled
   * @returns {LoginPage} - Returns this instance for chaining
   */
  verifyLoginButtonDisabled() {
    cy.get(this.loginButton).should('be.disabled');
    return this;
  }

  /**
   * Verify login button is enabled
   * @returns {LoginPage} - Returns this instance for chaining
   */
  verifyLoginButtonEnabled() {
    cy.get(this.loginButton).should('not.be.disabled');
    return this;
  }

  /**
   * Verify remember me checkbox is checked
   * @returns {LoginPage} - Returns this instance for chaining
   */
  verifyRememberMeChecked() {
    cy.get(this.rememberMeCheckbox).should('be.checked');
    return this;
  }

  /**
   * Verify remember me checkbox is unchecked
   * @returns {LoginPage} - Returns this instance for chaining
   */
  verifyRememberMeUnchecked() {
    cy.get(this.rememberMeCheckbox).should('not.be.checked');
    return this;
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  /**
   * Get current username value
   * @returns {Cypress.Chainable<string>} - Username value
   */
  getUsernameValue() {
    return cy.get(this.usernameInput).invoke('val');
  }

  /**
   * Get current password value (for testing purposes only)
   * @returns {Cypress.Chainable<string>} - Password value
   */
  getPasswordValue() {
    return cy.get(this.passwordInput).invoke('val');
  }

  /**
   * Check if error message is visible
   * @returns {Cypress.Chainable<boolean>} - True if error message is visible
   */
  isErrorMessageVisible() {
    return cy.get('body').then(($body) => {
      return $body.find(this.errorMessage).is(':visible');
    });
  }

  /**
   * Wait for login process to complete
   * @param {number} timeout - Maximum time to wait
   * @returns {LoginPage} - Returns this instance for chaining
   */
  waitForLoginComplete(timeout = 10000) {
    cy.url({ timeout }).should('not.include', '/login');
    return this;
  }

  /**
   * Verify page accessibility (basic checks)
   * @returns {LoginPage} - Returns this instance for chaining
   */
  verifyAccessibility() {
    // Check for proper labels
    cy.get(this.usernameInput)
      .should('have.attr', 'aria-label')
      .or('have.attr', 'placeholder')
      .or('have.attr', 'title');

    cy.get(this.passwordInput)
      .should('have.attr', 'aria-label')
      .or('have.attr', 'placeholder')
      .or('have.attr', 'title');

    // Check for proper button text
    cy.get(this.loginButton)
      .should('contain.text', 'Login')
      .or('contain.text', 'Sign In')
      .or('have.attr', 'aria-label');

    return this;
  }

  /**
   * Test keyboard navigation
   * @returns {LoginPage} - Returns this instance for chaining
   */
  testKeyboardNavigation() {
    // Tab through form elements
    cy.get(this.usernameInput).focus();
    cy.tab();
    cy.get(this.passwordInput).should('be.focused');
    cy.tab();
    cy.get(this.loginButton).should('be.focused');

    // Test Enter key submission
    cy.get(this.passwordInput).focus();
    cy.focused().type('{enter}');

    return this;
  }

  /**
   * Simulate slow network for testing loading states
   * @returns {LoginPage} - Returns this instance for chaining
   */
  simulateSlowNetwork() {
    cy.intercept('POST', '**/login', (req) => {
      req.reply((res) => {
        res.delay(2000); // 2 second delay
        res.send(res.body);
      });
    }).as('slowLogin');

    return this;
  }
}

export default LoginPage;
