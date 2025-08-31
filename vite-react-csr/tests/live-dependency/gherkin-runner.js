const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const ViteReactLiveDependencySteps = require('./steps/app.steps');

// Simple Gherkin parser and test runner for Live Dependency Tests
class GherkinLiveDependencyRunner {
  constructor() {
    this.steps = null;
  }

  parseFeatureFile(featurePath) {
    const content = fs.readFileSync(featurePath, 'utf8');
    const lines = content.split('\n');
    const scenarios = [];
    let currentScenario = null;
    let currentSteps = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('Scenario:')) {
        if (currentScenario) {
          currentScenario.steps = currentSteps;
          scenarios.push(currentScenario);
        }
        currentScenario = {
          name: trimmedLine.replace('Scenario:', '').trim(),
          steps: []
        };
        currentSteps = [];
      } else if (trimmedLine.startsWith('Background:')) {
        // Skip background for now, handle separately
        continue;
      } else if (trimmedLine.startsWith('Given ') || 
                 trimmedLine.startsWith('When ') || 
                 trimmedLine.startsWith('Then ') || 
                 trimmedLine.startsWith('And ')) {
        currentSteps.push(trimmedLine);
      }
    }

    if (currentScenario) {
      currentScenario.steps = currentSteps;
      scenarios.push(currentScenario);
    }

    return scenarios;
  }

  async runScenario(page, scenario) {
    test(`Live Dependency Test: ${scenario.name}`, async ({ page }) => {
      this.steps = new ViteReactLiveDependencySteps(page);
      
      // Run background steps
      await this.steps.givenTheApplicationIsRunning();
      await this.steps.andTheBackendServerIsRunning();
      await this.steps.andApiCallsAreMadeToTheRealBackend();

      // Run scenario steps
      for (const step of scenario.steps) {
        await this.executeStep(step);
      }
    });
  }

  async executeStep(stepText) {
    const step = stepText.trim();
    
    // Map Gherkin steps to step definition methods
    const stepMap = {
      'Given the application is running': () => this.steps.givenTheApplicationIsRunning(),
      'And the backend server is running': () => this.steps.andTheBackendServerIsRunning(),
      'And API calls are made to the real backend': () => this.steps.andApiCallsAreMadeToTheRealBackend(),
      'When I visit the application': () => this.steps.whenIVisitTheApplication(),
      'When I click the "Refresh Message" button': () => this.steps.whenIClickTheRefreshMessageButton(),
      'When I click the "Refresh Data" button': () => this.steps.whenIClickTheRefreshDataButton(),
      'When I visit the application on a mobile device': () => this.steps.whenIVisitTheApplicationOnAMobileDevice(),
      'Then I should see the application title "Vite React CSR Reference App"': () => this.steps.thenIShouldSeeTheApplicationTitle('Vite React CSR Reference App'),
      'And I should see the subtitle "Client-Side Rendering with Vite and React"': () => this.steps.thenIShouldSeeTheSubtitle('Client-Side Rendering with Vite and React'),
      'And the header should have a gradient background': () => this.steps.thenTheHeaderShouldHaveAGradientBackground(),
      'Then I should see a message section': () => this.steps.thenIShouldSeeAMessageSection(),
      'And I should see a message from the backend API': () => this.steps.thenIShouldSeeAMessageFromTheBackendApi(),
      'And I should see the message timestamp': () => this.steps.thenIShouldSeeTheMessageTimestamp(),
      'And I should see a "Refresh Message" button': () => this.steps.thenIShouldSeeARefreshMessageButton(),
      'Then I should see a data section': () => this.steps.thenIShouldSeeADataSection(),
      'And I should see "Sample Data Items" as the section title': () => this.steps.thenIShouldSeeSampleDataItemsAsTheSectionTitle(),
      'And I should see multiple data items from the backend': () => this.steps.thenIShouldSeeMultipleDataItemsFromTheBackend(),
      'And each item should have a title and description': () => this.steps.thenEachItemShouldHaveATitleAndDescription(),
      'And I should see a "Refresh Data" button': () => this.steps.thenIShouldSeeARefreshDataButton(),
      'Then the message should be refreshed with new content from the backend': () => this.steps.thenTheMessageShouldBeRefreshedWithNewContentFromTheBackend(),
      'And the timestamp should be updated': () => this.steps.thenTheTimestampShouldBeUpdated(),
      'Then the data should be refreshed with new content from the backend': () => this.steps.thenTheDataShouldBeRefreshedWithNewContentFromTheBackend(),
      'And the items list should be updated': () => this.steps.thenTheItemsListShouldBeUpdated(),
      'Then I should see an error message': () => this.steps.thenIShouldSeeAnErrorMessage(),
      'And I should see a "Retry" button': () => this.steps.thenIShouldSeeARetryButton(),
      'Then the page should use the full width': () => this.steps.thenThePageShouldUseTheFullWidth(),
      'And the content should be properly centered': () => this.steps.thenTheContentShouldBeProperlyCentered(),
      'And the header should be styled with a gradient': () => this.steps.thenTheHeaderShouldHaveAGradientBackground(),
      'And the content should have a light background': () => this.steps.thenTheContentShouldHaveALightBackground(),
      'And the footer should be visible at the bottom': () => this.steps.thenTheFooterShouldBeVisibleAtTheBottom(),
      'Then the layout should be responsive': () => this.steps.thenTheLayoutShouldBeResponsive(),
      'And the content should be readable': () => this.steps.thenTheContentShouldBeReadable(),
      'And the buttons should be accessible': () => this.steps.thenTheButtonsShouldBeAccessible(),
      'Then the application should successfully connect to the backend': () => this.steps.thenTheApplicationShouldSuccessfullyConnectToTheBackend(),
      'And the API calls should return valid data': () => this.steps.thenTheApiCallsShouldReturnValidData(),
      'And the data should be displayed correctly': () => this.steps.thenTheDataShouldBeDisplayedCorrectly()
    };

    const stepMethod = stepMap[step];
    if (stepMethod) {
      await stepMethod();
    } else {
      console.warn(`Step not implemented: ${step}`);
    }
  }

  async runAllScenarios() {
    const featurePath = path.join(__dirname, 'features', 'app.feature');
    const scenarios = this.parseFeatureFile(featurePath);
    
    for (const scenario of scenarios) {
      await this.runScenario(null, scenario);
    }
  }
}

// Export for use in test files
module.exports = GherkinLiveDependencyRunner; 