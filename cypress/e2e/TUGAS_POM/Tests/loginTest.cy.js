import LoginPage from '../Pages/loginPage';
import DashboardPage from '../Pages/dashboardPage';

describe('OrangeHRM - Login Feature (POM)', () => {
  let users;

  before(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
  });

  it('Func-001 -> Memastikan halaman login muncul', () => {
    cy.url().should('include', '/auth/login');
    cy.get(LoginPage.usernameInput).should('be.visible');
    cy.get(LoginPage.passwordInput).should('be.visible');
    cy.get(LoginPage.loginButton).should('be.visible');
  });

  it('Func-002 -> Login dengan kredensial valid', () => {
    cy.login(users.valid.username, users.valid.password);
    DashboardPage.verifyDashboard();
  });

  it('Func-003 -> Login dengan username case-insensitive', () => {
    cy.login(users.valid.username.toLowerCase(), users.valid.password);
    DashboardPage.verifyDashboard();
  });

  it('Func-004 -> Klik "Forgot your password?"', () => {
    LoginPage.clickForgotPassword();
    cy.url().should('include', '/requestPasswordResetCode');
    cy.get("h6.oxd-text--h6").should('have.text', 'Reset Password');
  });

  it('Func-005 -> Klik sosial media Linkedin di halaman login', () => {
    cy.get("a[href='https://www.linkedin.com/company/orangehrm/mycompany/']")
      .should('have.attr', 'target', '_blank')
      .and('have.prop', 'href', 'https://www.linkedin.com/company/orangehrm/mycompany/');
  });

  it('Func-006 -> Input textbox username dengan alfanumerik + simbol', () => {
    const testUsername = 'User123!@#';
    LoginPage.fillUsername(testUsername);
    cy.get(LoginPage.usernameInput).should('have.value', testUsername);

    // isi password agar form lengkap
    LoginPage.fillPassword('SomePassword123!');
  });

  it('Func-007 -> Input textbox password dengan alfanumerik + simbol', () => {
    const testPassword = 'Pass123!@#';
    LoginPage.fillPassword(testPassword);
    cy.get(LoginPage.passwordInput).should('have.value', testPassword);

    LoginPage.fillUsername('SomeUser123!');
  });

  it('Func-008 -> User dapat logout', () => {
    cy.login(users.valid.username, users.valid.password);
    DashboardPage.verifyDashboard();

    DashboardPage.logout();
    cy.url().should('include', '/auth/login');
    cy.get(LoginPage.loginButton).should('be.visible');
  });

  it('Func-009 -> Login dengan password salah', () => {
    cy.login(users.invalidPassword.username, users.invalidPassword.password);
    cy.get(LoginPage.alertInvalid)
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('Func-010 -> Login dengan username kosong', () => {
    cy.login(users.emptyUsername.username, users.emptyUsername.password);
    cy.get(LoginPage.requiredField)
      .should('be.visible')
      .and('contain', 'Required');
  });

  it('Func-011 -> Login dengan username & password salah', () => {
    cy.login(users.invalidUser.username, users.invalidUser.password);
    cy.get(LoginPage.alertInvalid)
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });
});
