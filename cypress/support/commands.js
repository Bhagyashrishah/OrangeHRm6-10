import './pages/loginPage';
import './pages/AdminPage';

// Custom Command: Login

// Cypress.Commands.add('login', (username, password) => {
//   cy.visit('/');
//   cy.get('input[name="username"]', { timeout: 10000 }).type(username);
//   cy.get('input[name="password"]').type(password);
//   cy.get('button[type="submit"]').click();
//   //cy.get('img[alt="OrangeHRM"]', { timeout: 10000 }).should('be.visible');
//   cy.get('img[alt="client brand banner"]').should('be.visible');

// });

Cypress.Commands.add('logout', () => {
  // Click on user profile dropdown (top right)
  cy.get('.oxd-userdropdown-tab').click();

  // Click Logout option
  cy.contains('Logout').click();

  // Verify redirected to login page
  cy.url().should('include', '/auth/login');
});

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get('input[name="username"]', { timeout: 20000 }).type(username);

  // cy.get('[placeholder="Username"]', { timeout: 10000 }).type(username);

  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();

  // ✅ Verify successful login
  cy.url({ timeout: 10000 }).should('include', '/dashboard');
  cy.get('.oxd-topbar-header-breadcrumb', { timeout: 10000 }).should(
    'be.visible'
  );
});
