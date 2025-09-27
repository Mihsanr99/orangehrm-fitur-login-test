describe('Intercept Example', () => {
  it('Pantau XHR i18n messages', () => {
    cy.intercept('GET', '/web/index.php/core/i18n/messages').as('getMessages')

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // tunggu XHR response
    cy.wait('@getMessages').its('response.statusCode').should('eq', 304)
  })
})
