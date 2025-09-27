describe('OrangeHRM - Login Feature', () => {
  const baseUrl = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
  const validUser = { username: "Admin", password: "admin123" };

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Func-001 -> Memastikan halaman login pada OrangeHRM', () => {
    cy.url().should('include', '/auth/login');
    cy.get("input[name='username']",{ timeout: 10000 }).should('be.visible');
    cy.get("input[name='password']").should('be.visible');
    cy.get("button[type='submit']").should('be.visible');
  });

  it('Func-002 -> User dapat login ke web OrangeHRM dengan akun yang valid', () => {
     cy.login(validUser.username, validUser.password);
    cy.get("h6.oxd-text--h6").should('have.text', 'Dashboard');
  });
  
  it('Func-003 -> Login dengan Username case-insensitive (admin)', () => {
    cy.get("input[name='username']",{ timeout: 10000 }).type(validUser.username.toLowerCase());
    cy.get("input[name='password']").type(validUser.password);
    cy.get("button[type='submit']").click();
    cy.get("h6.oxd-text--h6").should('have.text', 'Dashboard');
  });

  it('Func-004 -> Klik "Forgot your password?"', () => {
    cy.contains("Forgot your password?").click();
    cy.url().should('include', '/auth/requestPasswordResetCode');
    cy.get("h6.oxd-text--h6").should('have.text', 'Reset Password');
  });

  it('Func-005 -> Klik sosial media Linkedin pada halaman login OrangeHRM', () => {
    cy.get("a[href='https://www.linkedin.com/company/orangehrm/mycompany/']").should('have.attr', 'target', '_blank');
    cy.get("a[href='https://www.linkedin.com/company/orangehrm/mycompany/']").then(($link) => {
      const url = $link.prop('href');
      expect(url).to.eq('https://www.linkedin.com/company/orangehrm/mycompany/');
    });
  });

   it('Func-006 - Input textbox username dengan alfanumerik dan simbol', () => {
    const testUsername = 'User123!@#';

    cy.get('input[name="username"]')
      .clear()
      .type(testUsername)
      .should('have.value', testUsername);

    // Pastikan password tetap bisa diisi hanya untuk kelengkapan form
    cy.get('input[name="password"]').type('SomePassword123!');
  });

  it('Func-007 - Input textbox password dengan alfanumerik dan simbol', () => {
    const testPassword = 'Pass123!@#';

    cy.get('input[name="password"]')
      .clear()
      .type(testPassword)
      .should('have.value', testPassword);

    cy.get('input[name="username"]').type('SomeUser123!');
  });

  it('Func-008 -> User dapat logout dari OrangeHRM', () => {

  cy.login(validUser.username, validUser.password);
  cy.contains('Dashboard').should('be.visible');

  cy.get('.oxd-userdropdown-tab').click();

  cy.contains('Logout').click();

  cy.url().should('include', '/auth/login');
  cy.get("button[type='submit']").should('be.visible');

  //negative case
});
it('Func-009 -> Login dengan password salah', () => {
  cy.get("input[name='username']",{ timeout: 4000 }).type("Admin");
  cy.get("input[name='password']").type("wrongPassword");
  cy.get("button[type='submit']").click();

  cy.get(".oxd-alert-content-text")
    .should('be.visible')
    .and('contain', 'Invalid credentials');
});

it('Func-010 -> Login dengan username kosong', () => {
  cy.get("input[name='password']",{ timeout: 4000 }).type("admin123");
  cy.get("button[type='submit']").click();

  cy.get(".oxd-input-group__message")
    .should('be.visible')
    .and('contain', 'Required');
});
it('Func-011 -> Login dengan username & password salah', () => {
  cy.get("input[name='username']",{ timeout: 4000 }).type("WrongUser");
  cy.get("input[name='password']").type("WrongPass123");
  cy.get("button[type='submit']").click();

  cy.get(".oxd-alert-content-text")
    .should('be.visible')
    .and('contain', 'Invalid credentials');
});

});
