import { extractPriceAsNumber } from "../../helpers/dashboard/dashboard-helper";
import FooterPage from "../common/FooterPage";
import { DashboardSelector } from "./DashboardSelecors";

const FirstProductPrice = 29.99;
const footerPage = new FooterPage();
// const FooterPage = new Footer();
class DashboardPage {
  // Actions

  // Assurance
  verifyUrl() {
    // cy.url().should('include', '/inventory.html');
    cy.url().should("include", DashboardSelector.dashboardUrl);
  }

  verifyTitle() {
    cy.get(DashboardSelector.dashboardHeader).should(
      "have.text",
      DashboardSelector.productText,
    );
  }

  verifyDashboardPage() {
    this.verifyUrl();
    this.verifyTitle();

    // Just an example to Use common pages.
    footerPage.verifyCopyrightText();
  }

  checkFirstPrice() {
    cy.get(DashboardSelector.firstProductPrice)
      .first()
      .then(($price) => {
        const priceNumber = extractPriceAsNumber($price.text());
        expect(priceNumber).to.equal(FirstProductPrice);
      });
  }
}

export default DashboardPage;
