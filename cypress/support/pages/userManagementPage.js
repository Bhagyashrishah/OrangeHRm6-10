export class UserManagementPage {
  getUserTableRows() {
    return cy.get('.oxd-table-body .oxd-table-row--with-border');
  }

  // Edit functionality (already present)
  getEditButtonByRow(rowIndex) {
    return this.getUserTableRows()
      .eq(rowIndex)
      .find('button i.bi-pencil-fill')
      .parent('button');
  }

  clickEditOnRow(rowIndex) {
    this.getEditButtonByRow(rowIndex).click();
  }

  // ✅ Add Delete functionality
  getDeleteButtonByRow(rowIndex) {
    return this.getUserTableRows().eq(rowIndex).find('button.delete');
  }

  clickDeleteOnRow(rowIndex) {
    this.getDeleteButtonByRow(rowIndex).click();
  }

  confirmDelete() {
    cy.get('button.confirm').contains('Yes').click();
  }

  verifyDeletionSuccess() {
    cy.contains('Successfully Deleted').should('be.visible');
  }

  clickLogout() {
    cy.get('button.logout').click();
  }
}
