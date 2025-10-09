import { loginPage } from '../support/pages/loginPage';

let username = Cypress.env('CYPRESS_USERNAME');
let password = Cypress.env('CYPRESS_PASSWORD');

describe('Login Test with Logo and Profile Image Validation', () => {
  beforeEach(() => {
    cy.visit('/web/index.php/auth/login');
  });

  it('should login successfully and validate dashboard', () => {
    // Intercept login API
    //cy.intercept('POST', '**/auth/validate').as('loginAPI');
    cy.intercept('GET', '**/web/index.php/core/i18n/messages').as('loginAPI');

    // Login using POM
    loginPage.getUsername().type(username);
    loginPage.getPassword().type(password);
    loginPage.getLoginBtn().click();

    // Wait & assert login API
    cy.wait('@loginAPI', { timeout: 15000 })
      .its('response.statusCode')
      .should('eq', 304);

    // Validate Dashboard URL & heading
    cy.url().should('include', '/dashboard');
    cy.get('.oxd-topbar-header-breadcrumb h6').should('have.text', 'Dashboard');
  });

  it('should display profile image after login', () => {
    // Login using POM
    loginPage.getUsername().type(username);
    loginPage.getPassword().type(password);
    loginPage.getLoginBtn().click();

    cy.get('.oxd-userdropdown-tab', { timeout: 10000 }).should('be.visible');
    cy.get('img.oxd-userdropdown-img', { timeout: 10000 })
      .should('be.visible')
      .and('have.attr', 'alt', 'profile picture')
      .and(($img) => {
        expect($img.attr('src')).to.include('/viewPhoto/empNumber');
      });
  });

  it('should display profile image after login', () => {
    // Login using POM
    loginPage.getUsername().type(username);
    loginPage.getPassword().type(password);
    loginPage.getLoginBtn().click();

    cy.get('.oxd-userdropdown-tab', { timeout: 10000 }).should('be.visible');
    cy.get('img.oxd-userdropdown-img', { timeout: 10000 })
      .should('be.visible')
      .and('have.attr', 'alt', 'profile picture')
      .and(($img) => {
        expect($img.attr('src')).to.include('/viewPhoto/empNumber');
      });
  });
});
