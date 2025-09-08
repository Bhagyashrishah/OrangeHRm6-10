# Cypress Automation Framework - Best Practices Boilerplate

## 📌 Overview

This is a comprehensive Cypress automation framework boilerplate that follows industry best practices and provides a solid foundation for QA teams to build scalable, maintainable end-to-end tests. The framework implements the Page Object Model (POM) pattern and includes advanced features like tagging, reporting, CI/CD integration, and comprehensive documentation.

## 🏗 Framework Architecture

### Core Concepts Implemented

- **Page Object Model (POM)**: Clean separation of test logic and page interactions
- **Custom Commands**: Reusable commands for common actions
- **Environment Management**: Multi-environment support with dotenv
- **Test Tagging**: Flexible test filtering with @cypress/grep
- **Comprehensive Reporting**: Mochawesome HTML reports with screenshots
- **Code Quality**: ESLint, Prettier, and Husky for consistent code standards
- **API Testing**: Built-in API command support
- **Visual Testing**: Ready for visual regression testing
- **Accessibility Testing**: Axe integration for accessibility checks

### Project Structure

```
cypress-automation-boilerplate/
├── cypress/
│   ├── docs/                 # Framework documentation
│   │   └── best-practices.md
│   ├── e2e/                  # End-to-end test files
│   │   ├── smoke/            # Critical path tests
│   │   └── end-to-end/       # Comprehensive feature tests
│   ├── fixtures/             # Test data files
│   ├── pages/                # Page Object Models
│   │   ├── common/           # Shared page objects
│   │   ├── dashboard-page/   # Feature-specific pages
│   │   └── login-page/
│   ├── support/              # Custom commands & utilities
│   │   ├── commands.js       # General custom commands
│   │   ├── api-commands.js   # API-related commands
│   │   └── e2e.js           # Global setup
│   ├── utils/                # Utility functions
│   │   ├── constants/        # Project constants
│   │   └── helpers/          # Test helper functions
│   ├── screenshots/          # Test failure screenshots
│   └── videos/               # Test execution videos
├── scripts/                  # Setup and utility scripts
├── cypress.config.js         # Cypress configuration
├── package.json              # Dependencies and scripts
└── README.md
```

## � Quick Start

### Prerequisites

- **Node.js** v18+
- **npm** or **yarn**
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lfyagya/cypress-automation-boilerplate.git
   cd cypress-automation-boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your application URLs and credentials
   ```

4. **Run setup script**
   ```bash
   npm run setup
   ```

5. **Start testing**
   ```bash
   npm run cypress:open  # Interactive mode
   npm run cypress:run   # Headless mode
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Application URLs
CYPRESS_BASEURL=https://your-app.com
CYPRESS_API_URL=https://api.your-app.com

# Authentication
CYPRESS_USERNAME=testuser
CYPRESS_PASSWORD=testpass

# Test Environment
CYPRESS_ENVIRONMENT=dev  # dev, staging, prod

# Reporting
CYPRESS_RECORD_KEY=your-record-key
```

### Cypress Configuration

The `cypress.config.js` includes:

- **Environment-specific settings**: Different configs for dev/staging/prod
- **Custom reporters**: Mochawesome for detailed HTML reports
- **Test isolation**: Clean browser context between tests
- **Timeouts**: Optimized for different scenarios
- **Video recording**: Automatic video capture on failures
- **Screenshots**: Automatic screenshots on test failures

## 🧪 Writing Tests

### Test Structure (AAA Pattern)

```javascript
describe('User Authentication', { tags: '@smoke @login' }, () => {
  beforeEach(() => {
    // Arrange - Set up test conditions
    cy.login();
  });

  it('should login successfully', () => {
    // Act - Perform the action
    cy.visit('/dashboard');

    // Assert - Verify the outcome
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="welcome-message"]').should('be.visible');
  });
});
```

### Page Object Model Usage

```javascript
// In your test file
import DashboardPage from '../../pages/dashboard-page/DashboardPage';

const dashboardPage = new DashboardPage();

it('should display dashboard correctly', () => {
  cy.login();
  dashboardPage.verifyDashboardPage();
  dashboardPage.checkFirstPrice('@products');
});
```

### Custom Commands

```javascript
// Using built-in custom commands
cy.login('username', 'password');
cy.typeText('[data-cy="email"]', 'user@example.com');
cy.clickElement('[data-cy="submit-btn"]');
cy.waitForLoading('[data-cy="spinner"]');
```

## 🏷 Test Organization & Tagging

### Tag Structure

- **@smoke**: Critical path tests
- **@regression**: Full feature tests
- **@login**: Authentication tests
- **@dashboard**: Dashboard feature tests
- **@wip**: Work in progress
- **@flaky**: Known flaky tests

### Running Tests by Tags

```bash
# Run smoke tests
npm run test:smoke

# Run specific feature tests
npm run test:dashboard

# Run tests with multiple tags
npx cypress run --env grepTags="@dashboard+@smoke"
```

## � Reporting

### Mochawesome Reports

- **HTML Reports**: Detailed test execution reports
- **Screenshots**: Automatic screenshots on failures
- **Videos**: Test execution videos
- **Charts**: Visual test metrics

### Viewing Reports

```bash
# Generate and view HTML report
npm run report:generate
npm run report:open
```

## 🔧 Development Workflow

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Run both
npm run quality
```

### Git Hooks

- **Pre-commit**: Automatic linting and formatting
- **Pre-push**: Run smoke tests before pushing

## 🚀 CI/CD Integration

### GitHub Actions Example

```yaml
name: Cypress Tests
on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: cypress-io/github-action@v5
        with:
          browser: chrome
          record: true
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
```

### Parallel Execution

```bash
# Run tests in parallel
npm run test:parallel

# Run on multiple browsers
npm run test:cross-browser
```

## 📚 Advanced Features

### API Testing

```javascript
// API command examples
cy.api('GET', '/api/users').should('have.property', 'status', 200);
cy.api('POST', '/api/users', { name: 'John' }).its('body').should('have.property', 'id');
```

### Visual Testing

```javascript
// Visual regression testing
cy.eyesOpen('My App');
cy.eyesCheckWindow('Dashboard Page');
cy.eyesClose();
```

### Accessibility Testing

```javascript
// Accessibility checks
cy.injectAxe();
cy.checkA11y();
```

## 🛠 Utilities & Helpers

### Date/Time Utilities

```javascript
import { formatDate, addDays } from '../../utils/date-time';

const futureDate = addDays(new Date(), 7);
cy.get('[data-cy="date-picker"]').type(formatDate(futureDate));
```

### Test Data Management

```javascript
// Using fixtures
cy.fixture('users/valid-user').as('userData');
cy.get('@userData').then((user) => {
  cy.login(user.email, user.password);
});
```

## 📖 Documentation

### Available Docs

- **[Script Reference](cypress/docs/script-reference.md)**: Complete guide to all npm scripts
- **[Best Practices Guide](cypress/docs/best-practices.md)**: Comprehensive testing guidelines
- **[Naming Conventions](cypress/docs/naming-conventions.md)**: Standardized naming patterns for the framework
- **[Network Debugging Guide](cypress/docs/network-debugging-guide.md)**: Fix cy.wait() timeout errors
- **[API Reference](cypress/docs/api-reference.md)**: Custom commands documentation
- **[Setup Guide](cypress/docs/setup-guide.md)**: Detailed setup instructions
- **[Troubleshooting](cypress/docs/troubleshooting.md)**: Common issues and solutions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Contribution Guidelines

- Follow the established code style
- Add tests for new features
- Update documentation as needed
- Use conventional commit messages

## 📋 Available Scripts

```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "test:smoke": "cypress run --env grep=@smoke",
    "test:regression": "cypress run --env grep=@regression",
    "test:dashboard": "cypress run --env grep=@dashboard",
    "test:parallel": "cypress run --parallel --record",
    "report:generate": "mochawesome-merge cypress/mochaReports/*.json > cypress/mochaReports/report.json && mochawesome-report-generator cypress/mochaReports/report.json",
    "report:open": "open cypress/mochaReports/mochawesome-report.html",
    "lint": "eslint .",
    "format": "prettier --write .",
    "quality": "npm run lint && npm run format",
    "setup": "bash scripts/setup.sh"
  }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Tests timing out**: Check network conditions and increase timeouts if needed
2. **Element not found**: Use `data-cy` attributes for reliable element selection
3. **Flaky tests**: Implement proper waiting strategies and retry logic
4. **Environment issues**: Verify `.env` file configuration

### Debug Mode

```bash
# Run tests in debug mode
npm run cypress:debug

# Enable verbose logging
DEBUG=cypress:* npm run cypress:run
```

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/lfyagya/cypress-automation-boilerplate/issues)
- **Discussions**: [GitHub Discussions](https://github.com/lfyagya/cypress-automation-boilerplate/discussions)
- **Documentation**: [Cypress Official Docs](https://docs.cypress.io)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## � Acknowledgments

- [Cypress.io](https://cypress.io) for the amazing testing framework
- [Cypress Real World App](https://github.com/cypress-io/cypress-realworld-app) for inspiration
- [Testing Library](https://testing-library.com) for accessibility best practices

---

**Happy Testing! 🔥**

*Built with ❤️ for QA teams who want to write better, more maintainable tests.*
