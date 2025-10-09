/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const dotenv = require('dotenv');
dotenv.config(); // Load .env file variables
const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  env: {
    CYPRESS_USERNAME: process.env.CYPRESS_USERNAME,
    CYPRESS_PASSWORD: process.env.CYPRESS_PASSWORD,
    grepFilterSpecs: true,
  },
  e2e: {
    watchForFileChanges: false,
    baseUrl: process.env.CYPRESS_BASEURL,
    specPattern: getSpecPattern(),
    setupNodeEvents(on, config) {
      // Register the mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);
      // Register grep plugin for the node process
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  },
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 50000,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/mochaReports',
    overwrite: true,
    saveJson: true,
    html: true, // Ensure HTML is enabled
    reportFilename: 'mochawesome-report',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
});

function getEnvironment() {
  const env = process.env.CYPRESS_ENVIRONMENT;
  if (!env) {
    throw new Error('CYPRESS_ENVIRONMENT is required but not set.');
  }
  return env;
}

function getSpecPattern() {
  const isDev = getEnvironment() === 'dev';
  const testType = isDev ? 'end-to-end' : 'smoke';

  console.log(
    `Executing ${testType} Tests in ${isDev ? 'DEV' : 'PROD'} environment`
  );

  return path.join('cypress', 'e2e', '**', `${testType}`, `**`, `*.js`);
}