describe('Extract Excel file from desktop', () => {
  // const filepath = "C:\\Users\\Bhagyashri\\Desktop\\Book1.xlsx";
  const filepath = 'C:\\Users\\Bhagyashri\\Downloads\\Book1.xlsx';

  it('use data from excel', () => {
    cy.task('exceltoJson', filepath).then((reqdata) => {
      cy.visit('https://webdriveruniversity.com/');
      cy.get('#contact-us').invoke('removeAttr', 'target').click();
      cy.get('[placeholder="First Name"]')
        .should('be.empty')
        .type(reqdata.Sheet3[1].A);
      cy.get('[placeholder="Last Name"]').type(reqdata.Sheet3[1].B);
      cy.get('[placeholder="Email Address"]').type(reqdata.Sheet3[1].C);
      cy.get('[placeholder="Comments"]').type(reqdata.Sheet3[1].D);
      cy.get('[type="submit"]').click();
    });
  });
});

// describe("Extract Excel file from desktop", () => {
//   const filepath = "C:\\Users\\Bhagyashri\\Desktop\\Book1.xlsx";

//   it('use data from excel', () => {
//     cy.task('exceltoJson', filepath).then((reqdata) => {
//       const row = reqdata.Sheet1?.[0]; // First data row (after header)

//       expect(row, 'Excel row should exist').to.not.be.undefined;

//       cy.visit("https://webdriveruniversity.com/");
//       cy.get('#contact-us').invoke('removeAttr', 'target').click();

//       cy.get('[placeholder="First Name"]').should('be.empty').type(row.A);
//       cy.get('[placeholder="Last Name"]').type(row.B);
//       cy.get('[placeholder="Email Address"]').type(row.C);
//       cy.get('[placeholder="Comments"]').type(row.D);

//       cy.get('[type="submit"]').click();
//     });
//   });
// });
