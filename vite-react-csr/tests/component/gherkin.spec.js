const { test, expect } = require('@playwright/test');
const GherkinRunner = require('./gherkin-runner');

// Gherkin-style tests for Vite React Component Tests
test.describe('Vite React Component Tests - Gherkin Style', () => {
  let runner;

  test.beforeEach(async ({ page }) => {
    runner = new GherkinRunner();
  });

  test('View application header', async ({ page }) => {
    runner.steps = new (require('./steps/app.steps'))(page);
    
    // Background steps
    await runner.steps.givenTheApplicationIsRunning();
    await runner.steps.andApiCallsAreMocked();

    // Scenario steps
    await runner.steps.whenIVisitTheApplication();
    await runner.steps.thenIShouldSeeTheApplicationTitle('Vite React CSR Reference App');
    await runner.steps.thenIShouldSeeTheSubtitle('Client-Side Rendering with Vite and React');
    await runner.steps.thenTheHeaderShouldHaveAGradientBackground();
  });

  test('View mocked message content', async ({ page }) => {
    runner.steps = new (require('./steps/app.steps'))(page);
    
    // Background steps
    await runner.steps.givenTheApplicationIsRunning();
    await runner.steps.andApiCallsAreMocked();

    // Scenario steps
    await runner.steps.whenIVisitTheApplication();
    await runner.steps.thenIShouldSeeAMessageSection();
    await runner.steps.thenIShouldSeeTheMockedMessage('Welcome to the Vite React CSR Reference Application!');
    await runner.steps.thenIShouldSeeTheMessageTimestamp();
    await runner.steps.thenIShouldSeeARefreshMessageButton();
  });

  test('View mocked data content', async ({ page }) => {
    runner.steps = new (require('./steps/app.steps'))(page);
    
    // Background steps
    await runner.steps.givenTheApplicationIsRunning();
    await runner.steps.andApiCallsAreMocked();

    // Scenario steps
    await runner.steps.whenIVisitTheApplication();
    await runner.steps.thenIShouldSeeADataSection();
    await runner.steps.thenIShouldSeeSampleDataItemsAsTheSectionTitle();
    await runner.steps.thenIShouldSeeMultipleDataItems();
    await runner.steps.thenEachItemShouldHaveATitleAndDescription();
    await runner.steps.thenIShouldSeeARefreshDataButton();
  });

  test('Refresh mocked message', async ({ page }) => {
    runner.steps = new (require('./steps/app.steps'))(page);
    
    // Background steps
    await runner.steps.givenTheApplicationIsRunning();
    await runner.steps.andApiCallsAreMocked();

    // Scenario steps
    await runner.steps.whenIVisitTheApplication();
    await runner.steps.whenIClickTheRefreshMessageButton();
    await runner.steps.thenTheMessageShouldBeRefreshedWithNewMockedContent();
    await runner.steps.thenTheTimestampShouldBeUpdated();
  });

  test('Refresh mocked data', async ({ page }) => {
    runner.steps = new (require('./steps/app.steps'))(page);
    
    // Background steps
    await runner.steps.givenTheApplicationIsRunning();
    await runner.steps.andApiCallsAreMocked();

    // Scenario steps
    await runner.steps.whenIVisitTheApplication();
    await runner.steps.whenIClickTheRefreshDataButton();
    await runner.steps.thenTheDataShouldBeRefreshedWithNewMockedContent();
    await runner.steps.thenTheItemsListShouldBeUpdated();
  });

  test('Verify page layout and styling', async ({ page }) => {
    runner.steps = new (require('./steps/app.steps'))(page);
    
    // Background steps
    await runner.steps.givenTheApplicationIsRunning();
    await runner.steps.andApiCallsAreMocked();

    // Scenario steps
    await runner.steps.whenIVisitTheApplication();
    await runner.steps.thenThePageShouldUseTheFullWidth();
    await runner.steps.thenTheContentShouldBeProperlyCentered();
    await runner.steps.thenTheHeaderShouldHaveAGradientBackground();
    await runner.steps.thenTheContentShouldHaveALightBackground();
    await runner.steps.thenTheFooterShouldBeVisibleAtTheBottom();
  });
}); 