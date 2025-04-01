import DashboardPage from '../../pages/dashboard-page/DashboardPage';

const dashboardPage = new DashboardPage();

describe('Dashboard Test', () => {
  beforeEach(() => {
    dashboardPage.interceptProduct();
    dashboardPage.loadProducts();
  });
  it('Check for the Dashboard header', () => {
    cy.login();
    dashboardPage.waitForInterceptProduct();
    dashboardPage.verifyDashboardPage();
  });

  it('Check first price', () => {
    cy.login();
    dashboardPage.checkFirstPrice();
  });
});
