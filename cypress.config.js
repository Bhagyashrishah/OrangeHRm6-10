const { defineConfig } = require("cypress");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");

module.exports = defineConfig({
  env: {
    // INFO: Keep env in setupNodeEvents if we have to change the value dynamically
    // Ref: https://docs.cypress.io/api/cypress-api/env#From-a-plugin
    CYPRESS_USERNAME: process.env.CYPRESS_USERNAME,
    CYPRESS_PASSWORD: process.env.CYPRESS_PASSWORD,
  },
  e2e: {
    // Add spec pattern
    watchForFileChanges: false,
    baseUrl: process.env.CYPRESS_BASEURL,
    specPattern: getSpecPattern(),
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

function getEnvironment() {
  const env = process.env.CYPRESS_ENVIRONMENT;
  if (!env) {
    throw new Error("CYPRESS_ENVIRONMENT is required but not set.");
  }
  return env;
}

function getSpecPattern() {
  const isDev = getEnvironment() === "dev";
  const testType = isDev ? "e2e" : "smoke";

  console.log(
    `Executing ${testType} Tests in ${isDev ? "DEV" : "PROD"} environment`,
  );

  return path.join(
    "cypress",
    "e2e",
    "**",
    `*.${isDev ? "js" : `${testType}.js`}`,
  );
}
