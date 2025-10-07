/// <reference types="cypress" />

import adminPage from '../support/pages/AdminPage';
const { faker } = require('@faker-js/faker');

describe('Admin - Add User Flow', () => {
  before(function () {
    cy.fixture('credentials').then((data) => {
      this.cred = data;
    });
  });

  beforeEach(function () {
    cy.visit('/web/index.php/auth/login');
    cy.login(this.cred.login.username, this.cred.login.password);
    cy.url().should('include', '/dashboard');
  });

  it.skip('should add a valid admin user', function () {
    const randomUsername = faker.internet.userName();

    adminPage.navigateToAdminModule();
    adminPage.clickAddButton();
    adminPage.selectUserRole(this.cred.newUser.userRole);
    adminPage.enterEmployeeName(this.cred.newUser.employeeName);
    adminPage.enterUsername(randomUsername);
    adminPage.selectStatus(this.cred.newUser.status);
    adminPage.enterPassword(
      this.cred.newUser.password,
      this.cred.newUser.confirmPassword
    );
    adminPage.submitForm();
    adminPage.validateSuccessToast('Successfully Saved');
  });

  it('should show error if username is blank', function () {
    adminPage.navigateToAdminModule();
    adminPage.clickAddButton();
    adminPage.selectUserRole(this.cred.newUser.userRole);
    adminPage.enterEmployeeName(this.cred.newUser.employeeName);
    adminPage.selectStatus(this.cred.newUser.status);
    adminPage.enterPassword(
      this.cred.newUser.password,
      this.cred.newUser.confirmPassword
    );
    adminPage.submitForm();

    cy.get('.oxd-input-group__message').should('contain.text', 'Invalid');
  });

  it('should show error for short username', function () {
    adminPage.navigateToAdminModule();
    adminPage.clickAddButton();
    adminPage.selectUserRole(this.cred.newUser.userRole);
    adminPage.enterEmployeeName(this.cred.newUser.employeeName);
    adminPage.enterUsername('abc');
    adminPage.selectStatus(this.cred.newUser.status);
    adminPage.enterPassword(
      this.cred.newUser.password,
      this.cred.newUser.confirmPassword
    );
    adminPage.submitForm();

    cy.get('.oxd-input-group__message').should(
      'contain.text',
      'Should be at least 5 characters'
    );
  });

  it('should show error for mismatched passwords', function () {
    const randomUsername = faker.internet.userName();

    adminPage.navigateToAdminModule();
    adminPage.clickAddButton();
    adminPage.selectUserRole(this.cred.newUser.userRole);
    adminPage.enterEmployeeName(this.cred.newUser.employeeName);
    adminPage.enterUsername(randomUsername);
    adminPage.selectStatus(this.cred.newUser.status);

    cy.get('input[type="password"]').eq(0).type('Admin@123');
    cy.get('input[type="password"]').eq(1).type('Mismatch@123');
    adminPage.submitForm();

    cy.get('.oxd-input-group__message').should(
      'contain.text',
      'Passwords do not match'
    );
  });

  it('should show error for duplicate username', function () {
    const duplicateUsername = this.cred.newUser.username;

    adminPage.navigateToAdminModule();
    adminPage.clickAddButton();
    adminPage.selectUserRole(this.cred.newUser.userRole);
    adminPage.enterEmployeeName(this.cred.newUser.employeeName);
    adminPage.enterUsername(duplicateUsername);
    adminPage.selectStatus(this.cred.newUser.status);
    adminPage.enterPassword(
      this.cred.newUser.password,
      this.cred.newUser.confirmPassword
    );
    adminPage.submitForm();

    cy.get('.oxd-toast-content').should(
      'contain.text',
      'Username already exists'
    );
  });

  //   afterEach(() => {
  //     cy.logout();
  //   });
});
