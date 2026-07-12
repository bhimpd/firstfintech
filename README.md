# FirstFintech - PrestaShop Playwright Automation

End-to-end test automation suite for the PrestaShop demo store, built with Playwright and TypeScript. Covers user registration, login, product search, cart management, and checkout flows, with Allure reporting for detailed test insights.

## 🛠️ Tech Stack

- [Playwright](https://playwright.dev/) — E2E testing framework
- TypeScript
- [Faker.js](https://fakerjs.dev/) — Dynamic test data generation
- [Allure Report](https://allurereport.org/) — Test reporting
- dotenv — Environment variable management

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm
- Java 8+ (required for Allure Report)

## ⚙️ Installation

```bash
git clone <repo-url>
cd firstfintech
npm install
```

## 🔐 Environment Setup

Copy the example environment file and update values as needed:

```bash
cp .env.example .env
```

## 📁 Project Structure
src/
├── fixtures/       # Custom Playwright fixtures
├── pages/          # Page Object Model (POM) classes
├── test-data/      # Static and dynamic test data generators
├── tests/          # Test spec files
└── utils/          # Helper and utility functions


## ▶️ Running Tests

Run all tests:
```bash
npm run test
```

Run tests in headed mode (visible browser):
```bash
npm run test:headed
```

Run a specific test file:
```bash
npm run test -- path/to/test-file.spec.ts
```

Run a specific test by name:
```bash
npm run test -- -g "test name here"
```

## 📊 Test Reports

**Playwright HTML report:**
```bash
npm run report
```

**Allure report** (cleans old results, runs tests, generates & opens report):
```bash
npm run test:allure
```

## ✅ Test Coverage

- User Registration
- Login / Sign Out
- Product Browse & Search
- Add to Cart / Update Quantity / Remove Product
- Checkout Flow (up to payment confirmation)

### Sample Allure Report
project directory/src/report-screenshot

## 📝 Notes

- Test data (names, emails, passwords) is dynamically generated using Faker.js for each run.
- Registered user data is stored in `test-data/registeredUsers.json` for potential reuse (e.g., login tests).
