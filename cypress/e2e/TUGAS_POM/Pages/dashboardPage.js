class DashboardPage {
  dashboardHeader = "h6.oxd-text--h6";
  userDropdown = ".oxd-userdropdown-tab";

  verifyDashboard() {
    cy.get(this.dashboardHeader).should('have.text', 'Dashboard');
  }

  logout() {
    cy.get(this.userDropdown).click();
    cy.contains('Logout').click();
  }
}

export default new DashboardPage();
