const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Add spec pattern
    baseUrl: "https://www.saucedemo.com/v1/",
    specPattern: "cypress/e2e/**/*cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
