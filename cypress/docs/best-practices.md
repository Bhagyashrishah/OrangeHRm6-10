# Cypress Automation Framework - Best Practices

## 1. Test Organization

### Folder Structure

```
cypress/
├── e2e/
│   ├── smoke/          # Critical path tests
│   └── end-to-end/     # Comprehensive feature tests
├── fixtures/           # Test data files
├── support/           # Custom commands and utilities
├── pages/             # Page Object Models
├── helpers/           # Test helper functions
└── utils/             # Utility functions
```

### Test Categories

- **Smoke Tests**: Critical functionality that must work
- **End-to-End Tests**: Complete user journeys
- **API Tests**: Backend service validation
- **Integration Tests**: Component interaction tests

## 2. Writing Quality Tests

### Test Structure (AAA Pattern)

```javascript
it('should perform user action', () => {
  // Arrange - Set up test conditions
  cy.login();

  // Act - Perform the action
  cy.get('[data-cy="submit-btn"]').click();

  // Assert - Verify the outcome
  cy.get('[data-cy="success-message"]').should('be.visible');
});
```

### Data Attributes

- Use `data-cy`, `data-test`, or `data-testid` attributes
- Avoid selecting by CSS classes or IDs that might change
- Make selectors descriptive and maintainable

### Custom Commands

- Create reusable commands for common actions
- Keep commands focused and single-purpose
- Document command parameters and usage

## 3. Test Data Management

### Fixtures

- Store test data in JSON files
- Use dynamic data generation when needed
- Separate data by environment (dev/staging/prod)

### Environment Variables

- Keep sensitive data in environment variables
- Use different configs for different environments
- Never commit credentials to version control

## 4. Waiting Strategies

### Best Practices

- Use `cy.wait()` for network requests only
- Prefer assertions over arbitrary waits
- Use `cy.intercept()` for API testing
- Set appropriate timeouts for different scenarios

### Examples

```javascript
// Good: Wait for element to be visible
cy.get('[data-cy="loading"]').should('not.exist');
cy.get('[data-cy="content"]').should('be.visible');

// Good: Wait for API response
cy.intercept('GET', '/api/data').as('getData');
cy.wait('@getData');

// Avoid: Arbitrary waits
// cy.wait(5000); // Don't do this
```

## 5. Error Handling and Debugging

### Debugging Tips

- Use `cy.debug()` to pause execution
- Add meaningful test descriptions
- Use `cy.screenshot()` for visual debugging
- Implement proper error messages in assertions

### Retry Logic

```javascript
// Implement retry for flaky elements
cy.get('[data-cy="dynamic-element"]', { timeout: 10000 })
  .should('be.visible')
  .and('contain.text', 'Expected Text');
```

## 6. Performance Optimization

### Best Practices

- Use `baseUrl` in configuration
- Minimize unnecessary page visits
- Use `cy.session()` for login persistence
- Implement efficient test data setup/teardown

### Example Session Management

```javascript
// In commands.js
Cypress.Commands.add('loginWithSession', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/login');
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="login-btn"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

## 7. Continuous Integration

### CI/CD Best Practices

- Run tests in parallel
- Use docker containers for consistency
- Implement proper test reporting
- Set up notifications for test failures

### Example CI Configuration

```yaml
# .github/workflows/cypress.yml
name: Cypress Tests
on: [push, pull_request]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: cypress-io/github-action@v5
        with:
          build: npm run build
          start: npm start
          wait-on: 'http://localhost:3000'
          record: true
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
```

## 8. Reporting and Analytics

### Reporting Strategy

- Use Mochawesome for detailed HTML reports
- Implement dashboard integration
- Track test metrics and flakiness
- Set up automated report distribution

## 9. Maintenance and Scalability

### Code Quality

- Follow consistent naming conventions
- Implement proper code reviews
- Use TypeScript for better type safety
- Regular refactoring of test code

### Scalability

- Implement Page Object Model
- Use factory patterns for test data
- Modularize common functionalities
- Implement proper test isolation

## 10. Security Testing

### Security Considerations

- Test authentication flows
- Validate input sanitization
- Test authorization levels
- Implement security headers validation

---

## Quick Reference Commands

```bash
# Run all tests
npm run cypress:run

# Open Cypress GUI
npm start

# Run specific test suite
npx cypress run --spec "cypress/e2e/smoke/**/*.js"

# Run tests with grep
npx cypress run --env grep="login"

# Run tests in specific browser
npx cypress run --browser chrome
```

## Common Patterns

### API Testing

```javascript
it('should validate API response', () => {
  cy.request('GET', '/api/users').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('users');
  });
});
```

### File Upload

```javascript
it('should upload file', () => {
  cy.get('[data-cy="file-input"]').selectFile('cypress/fixtures/test-file.pdf');
  cy.get('[data-cy="upload-btn"]').click();
  cy.get('[data-cy="success-msg"]').should('be.visible');
});
```

### Database Testing

```javascript
it('should validate database state', () => {
  cy.task('db:seed', 'users');
  // Perform test actions
  cy.task('db:find', { table: 'users', id: 1 }).then((user) => {
    expect(user.status).to.eq('active');
  });
});
```

Remember: Good tests are reliable, maintainable, and provide clear feedback when they fail!
