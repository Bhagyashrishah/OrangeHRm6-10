import { extractPriceAsNumber } from "../../helpers/dashboard/dashboard-helper";
import { DASHBOARD_ENDPOINTS } from "../../support/dashboard/dashboard-services";
import FooterPage from "../common/FooterPage";
import { DashboardSelector } from "./DashboardSelecors";

const FirstProductPrice = 29.99;
const footerPage = new FooterPage();
class DashboardPage {
  // Arrange

  interceptProduct() {
    cy.intercept("GET", DASHBOARD_ENDPOINTS.GET_PRODUCTS.URL).as(
      DASHBOARD_ENDPOINTS.GET_PRODUCTS.NAME,
    );
  }
  waitForInterceptProduct() {
    cy.wait(`@${DASHBOARD_ENDPOINTS.GET_PRODUCTS.NAME}`).then(($dashboard) => {
      cy.wrap($dashboard).should("have.property", "id").and("not.be.empty");
    });
  }

  // Assurance
  verifyUrl() {
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
