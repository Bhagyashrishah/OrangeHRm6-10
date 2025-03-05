import DashboardHelper from "../../helpers/dashboard/DashboardHelper";
import { DASHBOARD_ENDPOINTS } from "../../support/dashboard/dashboard-services";
import { API_METHODS } from "../../utils/constants/global/API_CONSTANTS";
import FooterPage from "../common/FooterPage";
import DashboardSelector from "./DashboardSelecors";

const FirstProductPrice = 29.99;
const footerPage = new FooterPage();
class DashboardPage {
  // Arrange

  interceptProduct() {
    cy.intercept(API_METHODS.GET, DASHBOARD_ENDPOINTS.GET_PRODUCTS.URL).as(
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
        const priceNumber = DashboardHelper.extractPriceAsNumber($price.text());
        expect(priceNumber).to.equal(FirstProductPrice);
      });
  }
}

export default DashboardPage;
