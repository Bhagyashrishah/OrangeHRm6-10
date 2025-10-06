import { UserManagementPage } from '../support/pages/userManagementPage';
import { EditUserPage } from '../support/pages/editUserPage';
const { faker } = require('@faker-js/faker');

const userPage = new UserManagementPage();
const editPage = new EditUserPage();

describe('Edit 3rd User and Save Changes', () => {
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

  it('should edit the 3rd user and save changes', () => {
    const userName = `autoUser_${faker.string.alphanumeric(6)}`;
    cy.contains('span.oxd-main-menu-item--name', 'Admin').click();
    // Intercept save request  /web/index.php/api/v2/admin/users/71
    cy.intercept('PUT', /\/web\/index\.php\/api\/v2\/admin\/users.*/).as(
      'saveUser'
    );

    // Click Edit on 3rd row (index 2)
    userPage.clickEditOnRow(2);

    // Fill form
    cy.get('div.oxd-select-text-input').eq(0).click(); // open dropdown
    cy.contains('div.oxd-select-option', 'Admin').eq(0).click(); // select an option
    //cy.get('div.oxd-autocomplete-text-input input').clear().type('John A Doe');
    editPage.fillEmployeeName('James  Butler');

    cy.get('div.oxd-select-text-input').eq(1).click(); // open dropdown
    //    editPage.fillStatus('Enabled');
    editPage.fillUsername(userName);
    editPage.toggleChangePassword(false);

    // Save
    editPage.clickSave();

    // Wait for network response
    cy.wait('@saveUser').its('response.statusCode').should('eq', 200);

    // Verify success
    editPage.verifySuccessMessage();
  });

  //   afterEach(() => {
  //     cy.logout();
  //   });
});
