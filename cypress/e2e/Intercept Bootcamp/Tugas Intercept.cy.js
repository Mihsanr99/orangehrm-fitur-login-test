describe('OrangeHRM - Login Feature dengan Intercept', () => {
  const baseUrl = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
  const validUser = { username: "Admin", password: "admin123" };

  beforeEach(() => {
    cy.intercept('GET', '**/core/i18n/messages').as('i18nMessages');
    cy.visit(baseUrl);
    cy.wait('@i18nMessages').its('response.statusCode').should('be.oneOf', [200, 304]);
  });

  it('Func-001 -> Pastikan halaman login tampil', () => {


    cy.url().should('include', '/auth/login');
    cy.get("input[name='username']").should('be.visible');
    cy.get("input[name='password']").should('be.visible');
  });

  it('Func-002 -> Login valid cek API validate', () => {
    cy.intercept('POST', '**/auth/validate').as('loginValidate');
    cy.login(validUser.username, validUser.password);
    cy.wait('@loginValidate').its('response.statusCode').should('be.oneOf', [200, 302]);

    cy.get("h6.oxd-text--h6").should('have.text', 'Dashboard');
  });

  it('Func-003 -> Login username case-insensitive cek i18n messages', () => {
    cy.intercept('GET', '**/core/i18n/messages').as('i18n');
    cy.get("input[name='username']").type(validUser.username.toLowerCase());
    cy.get("input[name='password']").type(validUser.password);
    cy.get("button[type='submit']").click();
    cy.wait('@i18n').its('response.statusCode').should('be.oneOf', [200, 304]);

    cy.get("h6.oxd-text--h6").should('have.text', 'Dashboard');
  });

  it('Func-004 -> Klik Forgot Password cek requestPasswordResetCode', () => {
    cy.intercept('GET', '**/requestPasswordResetCode').as('resetCode');
    cy.contains("Forgot your password?").click();
    cy.wait('@resetCode').its('response.statusCode').should('eq', 200);

    cy.url().should('include', '/auth/requestPasswordResetCode');
  });

  it('Func-005 -> Klik Linkedin cek external link', () => {
    cy.intercept('GET', 'https://www.linkedin.com/**').as('linkedin');
    cy.get("a[href*='linkedin']").invoke('removeAttr', 'target').click();
    cy.wait('@linkedin').its('response.statusCode').should('be.oneOf', [200, 301]);
  });

  it('Func-006 -> Cek login dengan input username Alfanumerik dan symbol', () => {
  cy.intercept('POST', '**/auth/validate').as('loginRequest');

  cy.get('input[name="username"]').type('User123!@#');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();

  cy.wait('@loginRequest')
    .its('response.statusCode')
    .should('be.oneOf', [200,302 , 400, 401]);
});

  it('Func-007 -> Cek login dengan input password Alfanumerik dan symbol', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('Pass123!@#');
    cy.get('button[type="submit"]').click();

  cy.wait('@loginRequest')
    .its('response.statusCode')
    .should('be.oneOf', [200, 302 ,400, 401]);
  });

  it('Func-008 -> Cek setelah Logout redirect ke login', () => {
  cy.intercept('GET', '**/auth/login').as('loginPage');

  cy.login(validUser.username, validUser.password);
  cy.get('.oxd-userdropdown-tab').click();
  cy.contains('Logout').click();

  // request GET /auth/login (redirect)
  cy.wait('@loginPage')
    .its('response.statusCode')
    .should('be.oneOf', [200, 304]);

  //  balik ke halaman login
  cy.url().should('include', '/auth/login');
  cy.get('button[type="submit"]').should('be.visible');
});

  it('Func-009 -> Login dengan password salah cek response error', () => {
    cy.intercept('POST', '**/auth/validate').as('wrongPass');
    cy.get("input[name='username']").type("Admin");
    cy.get("input[name='password']").type("wrongPassword");
    cy.get("button[type='submit']").click();
    cy.wait('@wrongPass').its('response.statusCode').should('be.oneOf', [200, 302]);

    cy.get(".oxd-alert-content-text").should('contain', 'Invalid credentials');
  });

  it('Func-010 -> Login dengan username kosong', () => {
  cy.intercept('GET', '**/core/i18n/messages').as('i18nMessages');

  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();

  cy.get('.oxd-input-group__message')
    .should('be.visible')
    .and('contain', 'Required');
});

  it('Func-011 -> Login dengan username & password salah', () => {
  cy.intercept('POST', '**/auth/validate').as('loginRequest');

  cy.get('input[name="username"]').type('WrongUser');
  cy.get('input[name="password"]').type('WrongPass123');
  cy.get('button[type="submit"]').click();

  cy.wait('@loginRequest')
    .its('response.statusCode')
    .should('be.oneOf', [200, 302]);

  cy.get('.oxd-alert-content-text')
    .should('be.visible')
    .and('contain', 'Invalid credentials');
});
});
