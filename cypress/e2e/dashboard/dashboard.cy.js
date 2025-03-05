import DashboardPage from "../../pages/dashboard-page/DashboardPage";
import { DASHBOARD_ENDPOINTS } from "../../support/dashboard/dashboard-services";

const dashboardPage = new DashboardPage();

describe("Dashboard Test", () => {
  beforeEach(() => {
    dashboardPage.interceptProduct();
  });
  it("Check for the Dashboard header", () => {
    cy.login();
    dashboardPage.waitForInterceptProduct();
    dashboardPage.verifyDashboardPage();
  });

  it("Check first price", () => {
    cy.login();
    dashboardPage.checkFirstPrice();
  });
});
