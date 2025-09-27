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
    cy.get("input[name='username']").type(validUser.username.toLowerCase());
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

});
