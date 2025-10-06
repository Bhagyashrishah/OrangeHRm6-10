describe('OrangeHRM CRUD API Tests', () => {
  let createdUserId;

  before(() => {
    cy.login();
  });

  it(' GET: Fetch all users', () => {
    cy.request({
      method: 'GET',
      url: '/web/index.php/api/v1/user',
      headers: { accept: 'application/json' },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('data');
    });
  });

  it(' POST: Create a new user', () => {
    cy.request({
      method: 'POST',
      url: '/web/index.php/api/v1/user',
      body: {
        username: 'testuser123',
        password: 'Test@123',
        userRole: 'Admin',
        status: 'Enabled',
      },
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      createdUserId = response.body.id;
    });
  });

  it(' PUT: Update the user', () => {
    cy.request({
      method: 'PUT',
      url: `/web/index.php/api/v1/user/${createdUserId}`,
      body: {
        status: 'Disabled',
      },
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('Disabled');
    });
  });

  it(' DELETE: Remove the user', () => {
    cy.request({
      method: 'DELETE',
      url: `/web/index.php/api/v1/user/${createdUserId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it(' UI Validation: Check user table loads', () => {
    cy.visit('/web/index.php/admin/viewSystemUsers');
    cy.get('table').should('be.visible');
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });
});
