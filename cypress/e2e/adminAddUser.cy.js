/// <reference types="cypress" />

import adminPage from '../support/pages/AdminPage';
const { faker } = require('@faker-js/faker');

describe('Admin - Add User Flow', () => {
  before(function () {
    cy.fixture('credentials').as('cred'); // Load test data
  });

  beforeEach(function () {
    // Intercept login
    // cy.intercept('GET', '**/web/index.php/auth/login').as('loginPage');

    // Visit login
    cy.visit('/web/index.php/auth/login');
    cy.login(this.cred.login.username, this.cred.login.password);

    cy.wait('@loginPage', { timeout: 15000 })
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);

    // Ensure Dashboard
    cy.url().should('include', '/dashboard');
  });

  it('should add a new user and validate toaster message', function () {
    const { newUser } = this.cred;
    // 🔥 Generate random username
    const userName = `autoUser_${faker.string.alphanumeric(6)}`;
    // API intercepts
    cy.intercept('GET', /\/web\/index\.php\/api\/v2\/admin\/users.*/).as(
      'getUsers'
    );
    cy.intercept('GET', /\/web\/index\.php\/api\/v2\/admin\/employees.*/).as(
      'employeeSearch'
    );
    cy.intercept('POST', /\/web\/index\.php\/api\/v2\/admin\/users/).as(
      'saveUser'
    );

    // Navigate to Admin
    adminPage.navigateToAdminModule();
    cy.wait('@getUsers').its('response.statusCode').should('eq', 200);

    // Click Add button
    adminPage.clickAddButton();
    cy.get('form').should('be.visible');

    // Select User Role
    adminPage.selectUserRole(newUser.userRole);

    // Select Status
    adminPage.selectStatus(newUser.status);

    // Enter Employee Name (with autocomplete select)
    adminPage.enterEmployeeName(newUser.employeeName);
    //    cy.get('.oxd-autocomplete-option').first().click();

    // Enter Username
    adminPage.enterUsername(userName);

    // Enter Password + Confirm Password
    adminPage.enterPassword(newUser.password);

    // Submit
    adminPage.submitForm();

    // Wait for Save API
    cy.wait('@saveUser', { timeout: 15000 })
      .its('response.statusCode')
      .should('eq', 200);

    // Validate toaster
    adminPage.validateSuccessToast();

    // ✅ Search and verify user
    //cy.wait(2000); // small wait for page to settle
    adminPage.searchUser(userName);
    cy.get('button').contains('Search').click();

    // Wait for user table refresh
    cy.get('div.oxd-table-body', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains('div.oxd-table-cell', userName).should('be.visible');
      });
  });
});
