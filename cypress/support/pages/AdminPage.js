class AdminPage {
  // Element selectors
  elements = {
    adminMenu: () => cy.get('span').contains('Admin'),
    addButton: () => cy.get('button').contains('Add'),
    userRoleDropdown: () => cy.get('.oxd-select-wrapper').eq(0),
    employeeNameInput: () => cy.get('.oxd-autocomplete-text-input > input'),
    usernameInput: () => cy.get('input[autocomplete="off"]').eq(0),
    statusDropdown: () => cy.get('.oxd-select-wrapper').eq(1),
    passwordInput: () => cy.get('input[type="password"]').eq(0),
    confirmPasswordInput: () => cy.get('input[type="password"]').eq(1),
    submitButton: () => cy.get('button[type="submit"]'),
    searchInput: () => cy.get('input[placeholder="Search"]'),
    toasterMessage: () => cy.get('.oxd-toast'),
  };

  // Actions
  navigateToAdminModule() {
    this.elements.adminMenu().click();
  }

  clickAddButton() {
    this.elements.addButton().click();
    cy.get('form').should('be.visible'); // ensure form is open
  }

  selectUserRole(role) {
    this.elements.userRoleDropdown().click();
    cy.get('.oxd-select-dropdown').contains(role).click();
  }

  enterEmployeeName(name) {
    this.elements.employeeNameInput().type(name);
    // cy.wait(3000)
    cy.get('.oxd-autocomplete-dropdown').should('be.visible');
    cy.get('.oxd-autocomplete-option').first().click();
  }

  enterUsername(username) {
    this.elements.usernameInput().type(username);
  }

  selectStatus(status) {
    this.elements.statusDropdown().click();
    cy.get('.oxd-select-dropdown').contains(status).click();
  }

  enterPassword(password) {
    this.elements.passwordInput().type(password);
    this.elements.confirmPasswordInput().type(password);
  }

  submitForm() {
    this.elements.submitButton().click();
  }

  searchUser(username) {
    this.elements.searchInput().clear().type(username);
    cy.get('button').contains('Search').click();
  }

  validateSuccessToast(message = 'Successfully Saved') {
    this.elements.toasterMessage().should('contain.text', message);
  }
}

export default new AdminPage();
