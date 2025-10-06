import { UserManagementPage } from '../support/pages/userManagementPage';

const userPage = new UserManagementPage();

describe('Delete 5th User Record', () => {
  before(function () {
    cy.fixture('credentials').as('cred'); // Load test data
  });

  beforeEach(function () {
    // Intercept login page load
    cy.intercept('GET', '**/web/index.php/auth/login').as('loginPage');

    // Visit login
    cy.visit('/web/index.php/auth/login');

    // Perform login using custom command
    cy.login(this.cred.login.username, this.cred.login.password);

    // Wait for login page to load
    cy.wait('@loginPage', { timeout: 15000 })
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
  });

  it('should delete the 5th user record', () => {
    // Navigate to Admin menu
    cy.contains('span.oxd-main-menu-item--name', 'Admin').click();

    // Intercept the delete API call BEFORE clicking delete
    cy.intercept('DELETE', /\/web\/index\.php\/api\/v2\/admin\/users.*/).as(
      'deleteUser'
    );

    // Click delete icon on the 5th row (index 4)
    cy.get('.oxd-table-body .oxd-table-row--with-border')
      .eq(4) // 5th row
      .find('button i.bi-trash')
      .parent('button')
      .click();
    // Confirm deletion from popup
    cy.contains('button', 'Yes, Delete').click();

    // Wait for delete API response and assert status
    cy.wait('@deleteUser') // increase timeout
      .its('response.statusCode')
      .should('eq', 200);

    // Verify success message using UserManagementPage method
    userPage.verifyDeletionSuccess();
  });

  // Optional afterEach cleanup
  // afterEach(() => {
  //   userPage.clickLogout();
  // });
});
