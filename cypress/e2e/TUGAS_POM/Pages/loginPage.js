class LoginPage {
  // Selector
  usernameInput = "input[name='username']";
  passwordInput = "input[name='password']";
  loginButton = "button[type='submit']";
  forgotPasswordLink = "Forgot your password?";
  alertInvalid = ".oxd-alert-content-text";
  requiredField = ".oxd-input-group__message";

  // Action
  visit() {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  }

 fillUsername(username) {
  cy.get(this.usernameInput).clear();
  if (username) {
    cy.get(this.usernameInput).type(username);
  }
}
  fillPassword(password) {
    cy.get(this.passwordInput).clear().type(password);
  }

  clickLogin() {
    cy.get(this.loginButton).click();
  }

  clickForgotPassword() {
    cy.contains(this.forgotPasswordLink).click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
  }
}

export default new LoginPage();
