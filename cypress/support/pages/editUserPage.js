export class EditUserPage {
  fillUserRole(role) {
    cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.get('select[name="userRole"]').select(role);
  }

  fillEmployeeName(name) {
    cy.get('.oxd-autocomplete-text-input > input').clear();
    cy.type(name);
    cy.wait(3000); //eslint-disable-line cypress/no-unnecessary-waiting
    cy.get('.oxd-autocomplete-dropdown').should('be.visible');
    cy.get('.oxd-autocomplete-option').first().click();
  }

  fillStatus(status) {
    cy.get('select[name="status"]').select(status);
  }

  fillUsername(username) {
    cy.get('input.oxd-input.oxd-input--active').eq(1).clear();
    cy.type(username);
  }

  toggleChangePassword(enable) {
    // cy.get('label input[type="checkbox"]').check(); // or .uncheck()
    if (enable) {
      cy.get('label input[type="checkbox"]').check();
    } else {
      cy.get('label input[type="checkbox"]').uncheck();
    }
  }

  clickSave() {
    cy.get('button[type="submit"]').contains('Save').click();
  }

  verifySuccessMessage() {
    cy.contains('Successfully Updated').should('be.visible');
  }
}
