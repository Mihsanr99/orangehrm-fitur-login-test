// describe('Intercept Example', () => {
//   it('Pantau XHR i18n messages', () => {
//     //buat intercept untuk request get ke endpoint messages
//     cy.intercept('GET', '/web/index.php/core/i18n/messages').as('getMessages')

//     //untuk buka halaman orangeHRM
//     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

//     // tunggu XHR response
//     // cy.wait('@getMessages').its('response.statusCode').should('eq', 304)
//     cy.wait('@getMessages').its('response.statusCode').should('be.oneOf', [200, 304])

//   })
// })

describe('Intercept Example', () => {
  it('Pantau XHR i18n messages', () => {
    cy.intercept('GET', '/web/index.php/core/i18n/messages').as('getMessages')

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // tunggu XHR response
    cy.wait('@getMessages').then((interception) => {
      // tampilkan semua detail di console
      console.log('Interception:', interception)

      // contoh akses data spesifik
      cy.log('Status Code: ' + interception.response.statusCode)
      cy.log('Body: ' + JSON.stringify(interception.response.body))
    })
  })
})