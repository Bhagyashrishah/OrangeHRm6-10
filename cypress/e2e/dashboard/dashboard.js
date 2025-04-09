import DashboardPage from '../../pages/dashboard-page/DashboardPage';
import TAGS from '../../utils/constants/tags';

const dashboardPage = new DashboardPage();

describe('Dashboard Test', { tags: TAGS.DASHBOARD }, () => {
  beforeEach(() => {
    dashboardPage.interceptProduct();
    dashboardPage.loadProducts();
  });
  it('Check for the Dashboard header', { tags: [TAGS.WIP, TAGS.FLAKY] }, () => {
    cy.login();
    dashboardPage.waitForInterceptProduct();
    dashboardPage.verifyDashboardPage();
  });

  it('Check first price', { tags: TAGS.SMOKE }, () => {
    cy.login();
    dashboardPage.checkFirstPrice();
  });
});
