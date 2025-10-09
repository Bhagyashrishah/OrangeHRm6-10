/// <reference types="cypress" />

import adminPage from '../support/pages/AdminPage';
const { faker } = require('@faker-js/faker');
const selectors = {
  inlineErrorMsg: 'span.oxd-input-field-error-message',
  fieldErrorMsg: '.oxd-input-group__message',
  //   passwordInput: 'input[type="password"]',
};

let credData; // Shared variable for credentials

describe('Admin - Add User Flow', () => {
  before(() => {
    cy.fixture('credentials').then((data) => {
      credData = data;
    });
  });

  beforeEach(() => {
    cy.visit('/web/index.php/auth/login');
    cy.login(credData.login.username, credData.login.password);
    cy.url().should('include', '/dashboard');
  });

  it('should add a valid admin user', () => {
    //  const randomUsername = faker.internet.userName();
    const randomUsername =
      faker.person.firstName().toLowerCase() +
      faker.number.int({ min: 100, max: 999 });

    adminPage.navigateToAdminModule();
    adminPage.clickAddButton();
    adminPage.selectUserRole(credData.newUser.userRole);
    adminPage.enterEmployeeName(credData.newUser.employeeName);
    adminPage.enterUsername(randomUsername);
    adminPage.selectStatus(credData.newUser.status);
    adminPage.enterPassword(
      credData.newUser.password,
      credData.newUser.confirmPassword
    );
    adminPage.submitForm();
    // adminPage.validateSuccessToast('Successfully Saved');
  });

  it('should show error if username is blank', () => {
    adminPage.navigateToAdminModule();
    adminPage.clickAddButton();
    adminPage.selectUserRole(credData.newUser.userRole);
    adminPage.enterEmployeeName(credData.newUser.employeeName);
    adminPage.selectStatus(credData.newUser.status);
    adminPage.enterPassword(
      credData.newUser.password,
      credData.newUser.confirmPassword
    );
    adminPage.submitForm();

    cy.get('.oxd-input-group__message').should('contain.text', 'Invalid');
    //   cy.get(selectors.fieldErrorMsg).should('contain.text', 'Invalid');
  });

  it('should show error for short username', () => {
    adminPage.navigateToAdminModule();
    adminPage.clickAddButton();
    adminPage.selectUserRole(credData.newUser.userRole);
    adminPage.enterEmployeeName(credData.newUser.employeeName);
    adminPage.enterUsername('abc');
    adminPage.selectStatus(credData.newUser.status);
    adminPage.enterPassword(
      credData.newUser.password,
      credData.newUser.confirmPassword
    );
    adminPage.submitForm();

    cy.get('.oxd-input-group__message').should(
      'contain.text',
      'Should be at least 5 characters'
    );

    //   cy.get(selectors.fieldErrorMsg).should('contain.text','Should be at least 5 characters');
  });

  it('should show error for mismatched passwords', () => {
    // const randomUsername = faker.internet.userName();
    const randomUsername =
      faker.person.firstName().toLowerCase() +
      faker.number.int({ min: 100, max: 999 });

    adminPage.navigateToAdminModule();
    adminPage.clickAddButton();
    adminPage.selectUserRole(credData.newUser.userRole);
    adminPage.enterEmployeeName(credData.newUser.employeeName);
    adminPage.enterUsername(randomUsername);
    adminPage.selectStatus(credData.newUser.status);

    cy.get('input[type="password"]').eq(0).type('Admin@123');
    cy.get('input[type="password"]').eq(1).type('Mismatch@123');

    // cy.get(passwordInput).eq(0).type('Admin@123');
    // cy.get(passwordInput).eq(1).type('Mismatch@123');

    adminPage.submitForm();

    // cy.get('.oxd-input-group__message').should(//'contain.text', //'Passwords do not match'// );
    cy.get(selectors.fieldErrorMsg).should(
      'contain.text',
      'Passwords do not match'
    );
  });

  it('should show error for password shorter than 7 characters', () => {
    const shortPassword = 'abc123'; // 6 characters

    adminPage.navigateToAdminModule();
    adminPage.clickAddButton();
    adminPage.selectUserRole(credData.newUser.userRole);
    adminPage.enterEmployeeName(credData.newUser.employeeName);
    adminPage.enterUsername(faker.internet.username());
    adminPage.selectStatus(credData.newUser.status);
    adminPage.enterPassword(shortPassword, shortPassword);
    adminPage.submitForm();

    cy.get('.oxd-input-group__message').should(
      'contain.text',
      'Should have at least 7 characters'
    );
    //cy.get(selectors.fieldErrorMsg).should('contain.text','Should have at least 7 characters');
  });

  it('should show error if password does not contain a number', () => {
    const passwordWithoutNumber = 'PasswordOnly'; // No digits

    adminPage.navigateToAdminModule();
    adminPage.clickAddButton();
    adminPage.selectUserRole(credData.newUser.userRole);
    adminPage.enterEmployeeName(credData.newUser.employeeName);
    adminPage.enterUsername('testuser' + Date.now());
    adminPage.selectStatus(credData.newUser.status);
    adminPage.enterPassword(passwordWithoutNumber, passwordWithoutNumber);
    adminPage.submitForm();

    cy.get('.oxd-input-group__message').should(
      'contain.text',
      'Your password must contain minimum 1 number'
    );
    //cy.get(selectors.fieldErrorMsg).should('contain.text','Your password must contain minimum 1 number');
  });
});
