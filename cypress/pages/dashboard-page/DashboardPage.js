import DashboardHelper from '../../helpers/dashboard/DashboardHelper';
import FooterPage from '../common/FooterPage';
import DashboardSelector from './DashboardSelecors';

const footerPage = new FooterPage();
class DashboardPage {
  // Arrange

  loadProducts() {
    cy.fixture('dashboard/products').as('products');
  }

  // Assurance
  verifyUrl() {
    cy.url().should('include', DashboardSelector.dashboardUrl);
  }

  verifyTitle() {
    cy.get(DashboardSelector.dashboardHeader).should(
      'have.text',
      DashboardSelector.productText
    );
  }

  verifyDashboardPage() {
    this.verifyUrl();
    this.verifyTitle();

    // Just an example to Use common pages.
    footerPage.verifyCopyrightText();
  }

  checkFirstPrice(fixtureAliases) {
    cy.get(DashboardSelector.firstProductPrice)
      .first()
      .then(($price) => {
        const priceNumber = DashboardHelper.extractPriceAsNumber($price.text());

        cy.get(fixtureAliases).then(($products) => {
          // Get the price from the first product in the products array
          const expectedPrice = $products.products[0].price;
          expect(priceNumber).to.equal(expectedPrice);
        });
      });
  }
}

export default DashboardPage;
