import DashboardPage from '../../../../pages/dashboard-page/DashboardPage';
import { DASHBOARD_ENDPOINTS } from '../../../../support/dashboard/dashboard-services';
import { API_METHODS } from '../../../../utils/constants/global/API_CONSTANTS';
import TAGS from '../../../../utils/constants/tags';

const dashboardPage = new DashboardPage();

describe('Dashboard Test', { tags: TAGS.DASHBOARD }, () => {
  const productAlias = 'products';

  beforeEach(() => {
    // Intercept the products API call and mock the response
    cy.intercept(API_METHODS.GET, DASHBOARD_ENDPOINTS.GET_PRODUCTS.URL, {
      fixture: 'dashboard/products',
    }).as(DASHBOARD_ENDPOINTS.GET_PRODUCTS.NAME);

    // Load fixture data for additional validation
    cy.fixture('dashboard/products').as(productAlias);
  });

  it('Check for the Dashboard header', { tags: [TAGS.WIP, TAGS.FLAKY] }, () => {
    // Login first
    cy.login();

    // Visit the dashboard page to trigger the API call
    cy.visit('/inventory.html'); // or your dashboard URL

    // Wait for the API call with error handling
    cy.wait(`@${DASHBOARD_ENDPOINTS.GET_PRODUCTS.NAME}`, {
      timeout: 10000,
    }).then((interception) => {
      // Verify the response
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.not.be.empty;

      // Validate the response structure
      expect(interception.response.body).to.have.property('products');
      expect(interception.response.body.products).to.be.an('array');
      expect(interception.response.body.products).to.have.length.greaterThan(0);

      // Validate first product structure
      const firstProduct = interception.response.body.products[0];
      expect(firstProduct).to.have.property('id');
      expect(firstProduct).to.have.property('name');
      expect(firstProduct).to.have.property('price');
      expect(firstProduct).to.have.property('description');
    });

    // Verify dashboard page elements
    dashboardPage.verifyDashboardPage();
  });

  it('Check first price', { tags: TAGS.SMOKE }, () => {
    cy.login();
    cy.visit('/inventory.html'); // Ensure we visit the page that makes the API call

    // Wait for products to load
    // cy.wait(`@${DASHBOARD_ENDPOINTS.GET_PRODUCTS.NAME}`);

    // // Now check the first price
    // dashboardPage.checkFirstPrice(`@${productAlias}`);
  });
});
