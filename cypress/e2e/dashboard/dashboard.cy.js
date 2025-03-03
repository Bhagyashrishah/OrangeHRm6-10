import DashboardPage from "../../pages/dashboard-page/DashboardPage";

const dashboardPage = new DashboardPage();
describe("Dashboard Test", () => {
  it("Check for the Dashboard header", () => {
    cy.login();
    dashboardPage.verifyDashboardPage();
  });

  it("Check first price", () => {
    cy.login();
    dashboardPage.checkFirstPrice();
  });
});
