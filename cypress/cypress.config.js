const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Add spec pattern
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
