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

  // TODO: Take values from fixtures
  login(username = null, password = null) {
    this.visitLoginPage();
    // TODO: Use this from .env
    cy.fixture("login").then((user) => {
      this.enterUser(username || user.username);
      this.enterPassword(password || user.password);
    });
    this.submitLogin();
  }

  // Assurance
}

export default LoginPage;
