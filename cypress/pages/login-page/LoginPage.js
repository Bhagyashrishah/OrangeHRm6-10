import { LoginSelector } from "./LoginSelecors";

class LoginPage {
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

  // TODO: Take values from fixtures
  login(username = "standard_user", password = "secret_sauce") {
    this.visitLoginPage();
    this.enterUser(username);
    this.enterPassword(password);
    this.submitLogin();
  }

  // Assurance
}

export default LoginPage;
