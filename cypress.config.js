// fixture file use karayche asle tr // const { defineConfig } = require('cypress');

// module.exports = defineConfig({
//   e2e: {
//     //baseUrl: 'https://opensource-demo.orangehrmlive.com',
//     baseurl: cypress.env(CYPRESS_BASEURL),
//     setupNodeEvents(on, config) {
//       // implement node events if needed
//     },
//     watchForFileChanges: true
//   }
// });
//env - baseural use kela 
// const { defineConfig } = require('cypress');
// module.exports = defineConfig({
//   e2e: {
//     baseUrl: process.env.CYPRESS_BASEURL || 'https://opensource-demo.orangehrmlive.com',
//     setupNodeEvents(on, config) {
//       // implement node events if needed

//     },
//     watchForFileChanges: true
//   }
// });

//.env file use so dotenv pulgin install 

// const { defineConfig } = require('cypress');
// const dotenvPlugin = require('cypress-dotenv');

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: process.env.CYPRESS_BASEURL || 'https://opensource-demo.orangehrmlive.com',
//     defaultCommandTimeout: 10000,
//     setupNodeEvents(on, config) {
//       // Load .env variables and merge into Cypress.env()
//       return dotenvPlugin(config);
//     },
//   },
// });
// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     reporter: "mochawesome",
//     reporterOptions: {
//       reportDir: "cypress/reports",   // Folder to save reports
//       overwrite: false,
//       html: true,                     // Generate HTML report
//       json: true                      // Generate JSON report
//     },
//     setupNodeEvents(on, config) {
//       return config;
//     }
//   }
// });

const { defineConfig } = require('cypress');
const dotenvPlugin = require('cypress-dotenv');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASEURL || 'https://opensource-demo.orangehrmlive.com',
    defaultCommandTimeout: 10000,

    // ✅ Add env block here
    env: {
      CYPRESS_USERNAME: process.env.CYPRESS_USERNAME || 'Admin',
      CYPRESS_PASSWORD: process.env.CYPRESS_PASSWORD || 'admin123',
      CYPRESS_BASEURL: process.env.CYPRESS_BASEURL || 'https://opensource-demo.orangehrmlive.com'
    },

    // Reporter config
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    },

    // Node event setup
    setupNodeEvents(on, config) {
      // Load .env variables
      config = dotenvPlugin(config);

      // You can add more event listeners here if needed
      return config;
    }
  }
});













