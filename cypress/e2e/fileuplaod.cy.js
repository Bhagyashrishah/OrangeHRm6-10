describe('File uplaod flow', () => {
  it('File upload with fixture file', () => {
    cy.visit('https://webdriveruniversity.com/');
    cy.get('[id="file-upload"]').invoke('removeAttr', 'target').click();
    //upload file

    cy.get('[id="myFile"]').selectFile('cypress/fixtures/uploadfile.text');
    cy.get('[id="submit-button"]').click();
    cy.on('window:alert', (message) => {
      expect(message).to.include('Your file has now been uploaded!');
    });
  });
  it('File upload from desktop', () => {
    cy.visit('https://webdriveruniversity.com/');
    cy.get('[id="file-upload"]').invoke('removeAttr', 'target').click();
    //upload file
    //  cy.get('[id="myFile"]').selectFile('"C:\Users\Bhagyashri\Desktop\testing.txt"',{force:true})
    cy.get('[id="myFile"]').selectFile(
      'C:\\Users\\Bhagyashri\\Desktop\\testing.txt',
      { force: true }
    );
    //   cy.get('[id="myFile"]').selectFile('C:\\Users\\Bhagyashri\\Downloads\\my shopping List.docx',{force:true})

    cy.get('[id="submit-button"]').click();
    cy.on('window:alert', (message) => {
      expect(message).to.include('Your file has now been uploaded!');
    });
  });
});
