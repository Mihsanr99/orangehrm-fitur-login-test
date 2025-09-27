// describe('OrangeHRM Login Test', () => {
//   it('Login menggunakan Admin dan masuk ke Dashboard', () => {
//     // buka halaman login
//     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

//     // input username 
//     cy.get("input[name='username']").type('Admin')

//     // input password 
//     cy.get("input[name='password']").type('admin123')
//     // cy.get('input[name="password"]').clear().type('123456')

//     // klik tombol login
//     cy.get("button[type='submit']").click()

//     // verifikasi berhasil login -> cek teks "Dashboard" 
//     cy.get("h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module")
//       .should('have.text', 'Dashboard')
//   })
// })
