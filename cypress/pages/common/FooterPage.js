class FooterPage {
  verifyCopyrightText() {
    cy.get('.footer > .footer_copy').should(
      'contain',
      '© 2020 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy'
    );
  }
}

export default FooterPage;
