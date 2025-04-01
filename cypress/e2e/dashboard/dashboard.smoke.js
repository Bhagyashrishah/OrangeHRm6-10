import DashboardPage from '../../pages/dashboard-page/DashboardPage';

const dashboardPage = new DashboardPage();

describe('Dashboard Test', () => {
  beforeEach(() => {
    dashboardPage.interceptProduct();
    dashboardPage.loadProducts();
  });

  it('Check first price', () => {
    cy.login();
    dashboardPage.checkFirstPrice();
  });
});
