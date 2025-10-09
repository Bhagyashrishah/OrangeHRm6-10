describe('File Read/write flow', () => {
  it('write file flow', () => {
    cy.writeFile(
      './cypress/fixtures/uploadfile.text',
      'This Text is generated using cypress code'
    );
    cy.writeFile('./cypress/fixtures/text.json', '{"name":"pratik"}');
  });

  it('File Read flow', () => {
    cy.readFile('./cypress/fixtures/uploadfile.text').should(
      'contain',
      'This Text is generated using cypress code'
    );
    // cy.readFile('./cypress/fixtures/text.json').should('have.property',"username")
    cy.readFile('./cypress/fixtures/text.json')
      .its('name')
      .should('eq', 'pratik');
  });
});
