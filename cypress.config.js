const { defineConfig } = require("cypress");

module.exports = defineConfig({

  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome",
    mochawesomeReporterOptions: {
      reportDir: "cypress/results",
      quite: true,
      overwrite: false,
      html: false,
      json: true
    }
  },
  defaultCommandTimeout: 9000,
  video: false,
  viewportWidth: 1280,
  viewportHeight: 1280,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
