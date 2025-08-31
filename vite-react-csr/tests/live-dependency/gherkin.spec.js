const { test, expect } = require('@playwright/test');
const GherkinLiveDependencyRunner = require('./gherkin-runner');

// Gherkin-style tests for Vite React Live Dependency Tests
test.describe('Vite React Live Dependency Tests - Gherkin Style', () => {
  let runner;

  test.beforeEach(async ({ page }) => {
    runner = new GherkinLiveDependencyRunner();
  });

  test('View application header', async ({ page }) => {
    runner.steps = new (require('./steps/app.steps'))(page);
    
    // Background steps
    await runner.steps.givenTheApplicationIsRunning();
    await runner.steps.andTheBackendServerIsRunning();
    await runner.steps.andApiCallsAreMadeToTheRealBackend();

    // Scenario steps
    await runner.steps.whenIVisitTheApplication();
    await runner.steps.thenIShouldSeeTheApplicationTitle('Vite React CSR Reference App');
    await runner.steps.thenIShouldSeeTheSubtitle('Client-Side Rendering with Vite and React');
    await runner.steps.thenTheHeaderShouldHaveAGradientBackground();
  });

  test('View real message content', async ({ page }) => {
    runner.steps = new (require('./steps/app.steps'))(page);
    
    // Background steps
    await runner.steps.givenTheApplicationIsRunning();
    await runner.steps.andTheBackendServerIsRunning();
    await runner.steps.andApiCallsAreMadeToTheRealBackend();

    // Scenario steps
    await runner.steps.whenIVisitTheApplication();
    await runner.steps.thenIShouldSeeAMessageSection();
    await runner.steps.thenIShouldSeeAMessageFromTheBackendApi();
    await runner.steps.thenIShouldSeeTheMessageTimestamp();
    await runner.steps.thenIShouldSeeARefreshMessageButton();
  });

  test('View real data content', async ({ page }) => {
    runner.steps = new (require('./steps/app.steps'))(page);
    
    // Background steps
    await runner.steps.givenTheApplicationIsRunning();
    await runner.steps.andTheBackendServerIsRunning();
    await runner.steps.andApiCallsAreMadeToTheRealBackend();

    // Scenario steps
    await runner.steps.whenIVisitTheApplication();
    await runner.steps.thenIShouldSeeADataSection();
    await runner.steps.thenIShouldSeeSampleDataItemsAsTheSectionTitle();
    await runner.steps.thenIShouldSeeMultipleDataItemsFromTheBackend();
    await runner.steps.thenEachItemShouldHaveATitleAndDescription();
    await runner.steps.thenIShouldSeeARefreshDataButton();
  });

  test('Refresh real message', async ({ page }) => {
    runner.steps = new (require('./steps/app.steps'))(page);
    
    // Background steps
    await runner.steps.givenTheApplicationIsRunning();
    await runner.steps.andTheBackendServerIsRunning();
    await runner.steps.andApiCallsAreMadeToTheRealBackend();

    // Scenario steps
    await runner.steps.whenIVisitTheApplication();
    await runner.steps.whenIClickTheRefreshMessageButton();
    await runner.steps.thenTheMessageShouldBeRefreshedWithNewContentFromTheBackend();
    await runner.steps.thenTheTimestampShouldBeUpdated();
  });

  test('Refresh real data', async ({ page }) => {
    runner.steps = new (require('./steps/app.steps'))(page);
    
    // Background steps
    await runner.steps.givenTheApplicationIsRunning();
    await runner.steps.andTheBackendServerIsRunning();
    await runner.steps.andApiCallsAreMadeToTheRealBackend();

    // Scenario steps
    await runner.steps.whenIVisitTheApplication();
    await runner.steps.whenIClickTheRefreshDataButton();
    await runner.steps.thenTheDataShouldBeRefreshedWithNewContentFromTheBackend();
    await runner.steps.thenTheItemsListShouldBeUpdated();
  });

  test('Verify page responsiveness', async ({ page }) => {
    runner.steps = new (require('./steps/app.steps'))(page);
    
    // Background steps
    await runner.steps.givenTheApplicationIsRunning();
    await runner.steps.andTheBackendServerIsRunning();
    await runner.steps.andApiCallsAreMadeToTheRealBackend();

    // Scenario steps
    await runner.steps.whenIVisitTheApplicationOnAMobileDevice();
    await runner.steps.thenTheLayoutShouldBeResponsive();
    await runner.steps.thenTheContentShouldBeReadable();
    await runner.steps.thenTheButtonsShouldBeAccessible();
  });

  test('Verify page layout and styling', async ({ page }) => {
    runner.steps = new (require('./steps/app.steps'))(page);
    
    // Background steps
    await runner.steps.givenTheApplicationIsRunning();
    await runner.steps.andTheBackendServerIsRunning();
    await runner.steps.andApiCallsAreMadeToTheRealBackend();

    // Scenario steps
    await runner.steps.whenIVisitTheApplication();
    await runner.steps.thenThePageShouldUseTheFullWidth();
    await runner.steps.thenTheContentShouldBeProperlyCentered();
    await runner.steps.thenTheHeaderShouldHaveAGradientBackground();
    await runner.steps.thenTheContentShouldHaveALightBackground();
    await runner.steps.thenTheFooterShouldBeVisibleAtTheBottom();
  });

  test('Test API integration', async ({ page }) => {
    runner.steps = new (require('./steps/app.steps'))(page);
    
    // Background steps
    await runner.steps.givenTheApplicationIsRunning();
    await runner.steps.andTheBackendServerIsRunning();
    await runner.steps.andApiCallsAreMadeToTheRealBackend();

    // Scenario steps
    await runner.steps.whenIVisitTheApplication();
    await runner.steps.thenTheApplicationShouldSuccessfullyConnectToTheBackend();
    await runner.steps.thenTheApiCallsShouldReturnValidData();
    await runner.steps.thenTheDataShouldBeDisplayedCorrectly();
  });
}); 