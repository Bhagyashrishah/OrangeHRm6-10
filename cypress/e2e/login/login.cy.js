import LoginPage from "../../pages/login-page/LoginPage";

const loginPage = new LoginPage();
describe("template spec", () => {
  it("passes", () => {
    loginPage.login();
  });
});
