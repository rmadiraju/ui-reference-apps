# Gherkin Testing with Playwright

This document explains the Gherkin-style testing approach implemented across all reference applications, providing a behavior-driven development (BDD) testing framework alongside the existing Playwright tests.

## 📋 Overview

Each application now includes Gherkin feature files that describe application behavior in natural language, along with step definitions that execute Playwright commands. This provides:

- **Readable test scenarios** written in business language
- **Reusable step definitions** that map to Playwright actions
- **Clear separation** between test scenarios and implementation
- **Consistent testing approach** across all applications

## 🏗️ Architecture

### File Structure

```
tests/
├── component/
│   ├── features/
│   │   └── app.feature          # Gherkin scenarios for component tests
│   ├── steps/
│   │   └── app.steps.js         # Step definitions for component tests
│   ├── gherkin-runner.js        # Gherkin parser and test runner
│   └── gherkin.spec.js          # Playwright test file using Gherkin
└── live-dependency/
    ├── features/
    │   └── app.feature          # Gherkin scenarios for live dependency tests
    ├── steps/
    │   └── app.steps.js         # Step definitions for live dependency tests
    ├── gherkin-runner.js        # Gherkin parser and test runner
    └── gherkin.spec.js          # Playwright test file using Gherkin
```

### Components

1. **Feature Files** (`.feature`): Define test scenarios in Gherkin syntax
2. **Step Definitions** (`.steps.js`): Map Gherkin steps to Playwright actions
3. **Gherkin Runner**: Parse feature files and execute step definitions
4. **Test Files** (`.spec.js`): Playwright tests that use the Gherkin framework

## 🎯 Test Types

### Component Tests
- **Purpose**: Test application behavior with mocked API calls
- **Location**: `tests/component/`
- **API Handling**: All API calls are intercepted and mocked
- **Use Case**: Fast, reliable tests that don't depend on external services

### Live Dependency Tests
- **Purpose**: Test application behavior with real backend integration
- **Location**: `tests/live-dependency/`
- **API Handling**: Real API calls to the backend server
- **Use Case**: End-to-end testing with actual backend integration

## 📝 Feature File Syntax

### Basic Structure

```gherkin
Feature: Application Name - Test Type
  As a user
  I want to interact with the application
  So that I can verify functionality

  Background:
    Given the application is running
    And API calls are mocked/real

  Scenario: Test scenario name
    When I perform an action
    Then I should see expected result
    And another expected result
```

### Common Scenarios

#### View Application Header
```gherkin
Scenario: View application header
  When I visit the application
  Then I should see the application title "App Name"
  And I should see the subtitle "App Description"
  And the header should have a gradient background
```

#### View Content Sections
```gherkin
Scenario: View message content
  When I visit the application
  Then I should see a message section
  And I should see a message from the backend API
  And I should see the message timestamp
  And I should see a "Refresh Message" button
```

#### Refresh Functionality
```gherkin
Scenario: Refresh data
  When I visit the application
  When I click the "Refresh Data" button
  Then the data should be refreshed with new content
  And the items list should be updated
```

#### Error Handling
```gherkin
Scenario: Handle API error gracefully
  Given the API returns an error
  When I visit the application
  Then I should see an error message
  And I should see a "Retry" button
```

## 🔧 Step Definitions

### Background Steps

```javascript
// Component Tests
async givenTheApplicationIsRunning() {
  await this.page.goto('/');
}

async andApiCallsAreMocked() {
  await this.page.route('/api/message', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Mocked message',
        timestamp: new Date().toISOString()
      })
    });
  });
}

// Live Dependency Tests
async andTheBackendServerIsRunning() {
  const response = await this.page.request.get('http://localhost:3001/health');
  expect(response.status()).toBe(200);
}
```

### Action Steps

```javascript
async whenIVisitTheApplication() {
  await this.page.goto('/');
}

async whenIClickTheRefreshMessageButton() {
  await this.page.click('button:has-text("Refresh Message")');
}

async whenIVisitTheApplicationOnAMobileDevice() {
  await this.page.setViewportSize({ width: 375, height: 667 });
  await this.page.goto('/');
}
```

### Assertion Steps

```javascript
async thenIShouldSeeTheApplicationTitle(title) {
  await expect(this.page.locator('h1')).toContainText(title);
}

async thenThePageShouldUseTheFullWidth() {
  const app = this.page.locator('.app');
  await expect(app).toHaveCSS('width', '100%');
}

async thenIShouldSeeAMessageFromTheBackendApi() {
  await this.page.waitForSelector('.message-card p', { timeout: 10000 });
  const messageText = await this.page.locator('.message-card p').textContent();
  expect(messageText).toBeTruthy();
}
```

## 🚀 Running Gherkin Tests

### Individual Application Tests

```bash
# Vite React CSR
cd vite-react-csr
npm run test:gherkin:component
npm run test:gherkin:live

# Next.js React SSR
cd nextjs-react-ssr
npm run test:gherkin:component
npm run test:gherkin:live

# Vite Vue CSR
cd vite-vue-csr
npm run test:gherkin:component
npm run test:gherkin:live

# Nuxt.js Vue SSR
cd nuxt-vue-ssr
npm run test:gherkin:component
npm run test:gherkin:live
```

### All Applications

```bash
# Run all Gherkin component tests
npm run test:gherkin:component:all

# Run all Gherkin live dependency tests
npm run test:gherkin:live:all
```

## 📊 Test Coverage

### Component Tests Coverage
- ✅ Application header and navigation
- ✅ Content sections (message, data)
- ✅ Refresh functionality
- ✅ Error handling
- ✅ Layout and styling
- ✅ Responsive design
- ✅ Framework-specific features (Vue reactivity, SSR)

### Live Dependency Tests Coverage
- ✅ Real API integration
- ✅ Backend connectivity
- ✅ Data flow from backend to frontend
- ✅ Error handling with real backend
- ✅ Performance and responsiveness
- ✅ End-to-end user workflows

## 🔄 Integration with Existing Tests

The Gherkin tests complement the existing Playwright tests:

- **Existing Tests**: Focus on technical implementation details
- **Gherkin Tests**: Focus on business requirements and user behavior
- **Both**: Use the same Playwright infrastructure and assertions

### Running Both Test Types

```bash
# Run all tests (existing + Gherkin)
npm run test:all

# Run only existing tests
npm run test:playwright

# Run only Gherkin tests
npm run test:gherkin
```

## 🛠️ Customization

### Adding New Scenarios

1. **Add to Feature File**:
   ```gherkin
   Scenario: New functionality
     When I perform new action
     Then I should see new result
   ```

2. **Add Step Definitions**:
   ```javascript
   async whenIPerformNewAction() {
     // Playwright implementation
   }

   async thenIShouldSeeNewResult() {
     // Playwright assertions
   }
   ```

3. **Update Step Mapping**:
   ```javascript
   const stepMap = {
     'When I perform new action': () => this.steps.whenIPerformNewAction(),
     'Then I should see new result': () => this.steps.thenIShouldSeeNewResult()
   };
   ```

### Framework-Specific Steps

Each application can include framework-specific step definitions:

- **React**: Component lifecycle, hooks, state management
- **Vue**: Reactivity, computed properties, directives
- **SSR**: Server-side rendering, hydration, performance
- **CSR**: Client-side rendering, dynamic content

## 📈 Benefits

### For Developers
- **Clear test scenarios** written in business language
- **Reusable step definitions** across test types
- **Easy to understand** test failures and requirements
- **Consistent testing approach** across applications

### For Stakeholders
- **Readable test documentation** that describes application behavior
- **Clear acceptance criteria** for features
- **Business-focused** test scenarios
- **Living documentation** that stays in sync with code

### For Testing
- **Comprehensive coverage** of user workflows
- **Reliable test execution** with proper setup/teardown
- **Fast component tests** with mocked dependencies
- **Realistic integration tests** with live backend

## 🔍 Troubleshooting

### Common Issues

1. **Step Not Found**: Ensure step is defined in step definitions and mapped in runner
2. **API Mocking Issues**: Verify route interception is working correctly
3. **Backend Connectivity**: Ensure backend server is running for live dependency tests
4. **Selector Issues**: Check that page elements match the selectors in step definitions

### Debug Mode

```bash
# Run tests with debug output
DEBUG=playwright npm run test:gherkin

# Run specific scenario
npm run test:gherkin -- --grep "Scenario name"
```

## 📚 Resources

- [Gherkin Syntax](https://cucumber.io/docs/gherkin/)
- [Playwright Testing](https://playwright.dev/docs/intro)
- [Behavior-Driven Development](https://en.wikipedia.org/wiki/Behavior-driven_development)
- [Cucumber.js](https://github.com/cucumber/cucumber-js) (Alternative implementation)

---

This Gherkin testing framework provides a powerful way to write and maintain tests that are both technically robust and business-readable, ensuring that all stakeholders can understand and contribute to the testing process. 