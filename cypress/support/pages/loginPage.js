class LoginPage {
  getUsername() {
    return cy.get('input[name="username"]');
  }
  getPassword() {
    return cy.get('input[name="password"]');
  }
  getLoginBtn() {
    return cy.get('button[type="submit"]');
  }
}

export const loginPage = new LoginPage();
