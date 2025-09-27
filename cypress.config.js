const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
// const { defineConfig } = require('cypress');

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: 'https://opensource-demo.orangehrmlive.com',
//     supportFile: 'cypress/support/e2e.js',
//     viewportWidth: 1280,
//     viewportHeight: 720,
//     defaultCommandTimeout: 10000,
//   },
// });
