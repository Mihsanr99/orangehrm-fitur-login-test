// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Cypress.Commands.add('login', (username = 'Admin', password = 'admin123') => {
//   cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
//   cy.get("input[name='username']",{ timeout: 3000 }).should('be.visible').type(username)
//   // cy.get('input[name="username"]').clear()
//   cy.get("input[name='password']").type(password)
//   // cy.get('input[name="password"]').clear().type('123456')
//   cy.get("button[type='submit']").click()
// })

// Cypress.Commands.add('login',(username, password)=>{
//   cy.get("input[name='username']",{ timeout: 4000 }).type(username);
//   cy.get("input[name='password']").type(password);
//   cy.get("button[type='submit']").click();
// })

import LoginPage from '../e2e/TUGAS_POM/Pages/loginPage';

// Custom command login
Cypress.Commands.add('login', (username, password) => {
  LoginPage.visit();
  LoginPage.fillUsername(username);
  LoginPage.fillPassword(password);
  LoginPage.clickLogin();
});

//untuk test api
Cypress.Commands.add('logResponse', (response) => {
  cy.log(`Status: ${response.status}`);
 cy.log(`Body: ${JSON.stringify(response.body, null, 2)}`);
  
  // Untuk detail lebih lengkap di console browser (F12)
  console.log('=== API Response ===');
  console.log('Status:', response.status);
  console.log('Body:', response.body);
  console.log('Duration:', response.duration, 'ms');
  console.log('Headers:', response.headers);
});
