const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  viewportWidth: 1280,
  viewportHeight: 1280,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
