# Cypress Page Object Model (POM) Project

## 📌 Overview

This project follows the **Page Object Model (POM) architecture** to structure Cypress end-to-end tests efficiently. The POM pattern helps in maintaining test scripts by separating test logic from page interactions.

## 🛠 Prerequisites

Ensure you have the following installed before setting up the project:

- **Node.js** v18+
- **npm** (or **yarn** if preferred)

## 🚀 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/lfyagya/cypress-automation-boilerplate
   cd cypress-automation-boilerplate
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## 🏗 Project Structure

```sh
cypress
├── docs                 # Documentation files
│   └── best-practices.md
├── e2e                  # Test files organized by feature
│   ├── dashboard
│   │   ├── dashboard.e2e.js      # Full end-to-end test
│   │   └── dashboard.smoke.js    # Smoke test for dashboard
│   └── login
│       └── login.e2e.js          # Login tests
├── fixtures             # Mock data for API responses or UI interactions
│   ├── dashboard
│   │   └── products.json
│   └── example.json
├── helpers              # Helper functions related to specific features
│   └── dashboard
│       └── DashboardHelper.js
├── pages                # Page Object Model files
│   ├── common
│   │   └── FooterPage.js
│   ├── dashboard-page
│   │   ├── DashboardPage.js      # Dashboard actions
│   │   └── DashboardSelectors.js # Dashboard element selectors
│   └── login-page
│       ├── LoginPage.js          # Login actions
│       └── LoginSelectors.js     # Login element selectors
├── support              # Custom Cypress commands & services
│   ├── api-commands.js  # API-related custom commands
│   ├── commands.js      # General custom Cypress commands
│   ├── dashboard
│   │   └── dashboard-services.js # Dashboard API services
│   └── e2e.js           # Global Cypress setup
└── utils                # Common utility functions
    ├── constants        # Project-wide constants
    │   ├── global
    │   │   └── API_CONSTANTS.js  # Global API constants
    │   └── module
    └── date-time.js     # Utility functions for date/time operations
├── scripts              # Bash scripts for setup (example teardown)
│   ├── tear-down.sh
│   ├── tear-up.sh
```

## 📝 Writing Tests

- **Tests are located in the `e2e/` folder**.
- Each feature (e.g., login, dashboard) has its own directory.
- End-to-end tests should be named with `.e2e.js`.
- Smoke tests should be named with `.smoke.js`.

- **Documentations are located in the `docs/` folder**.
- Maintain the docs as per its test folder strucure

- **Bash or other Scripts are located in the `scripts/` folder**.
- Add necessary scripts which are necessary to run before and after the cypress test

## 🏃 Running Tests

### Run all tests:

```sh
npx cypress run
```

### Run tests in interactive mode:

```sh
npx cypress open
```

### Run a specific test suite:

```sh
npx cypress run --spec "cypress/e2e/login/login.e2e.js"
```

## 📌 Best Practices

- Follow **Page Object Model (POM)** to keep tests maintainable.
- Use **fixtures** for reusable test data.
- Place **constants** inside `utils/constants/`.
- Use **selectors files** for element locators instead of hardcoding them in tests.
- Use **helpers** for specific help that page require.

## 📄 Additional Documentation for reference

- [Cypress Official Docs](https://docs.cypress.io/)
- [Best Practices](docs/best-practices.md)

---

Happy Automation! Happy Testing! 🔥
