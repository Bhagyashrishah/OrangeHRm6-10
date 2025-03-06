import LoginSelector from "./LoginSelecors";

class LoginPage {
  // Arrange

  // Actions
  visitLoginPage() {
    cy.visit("/");
  }
  enterUser(username) {
    cy.get(LoginSelector.usernameInput).type(username);
  }

  enterPassword(password) {
    cy.get(LoginSelector.passwordInput).type(password);
  }

  submitLogin() {
    cy.get(LoginSelector.loginButton).click();
  }

  login(username = null, password = null) {
    cy.login(username, password);
  }

  // Assurance
}

export default LoginPage;
