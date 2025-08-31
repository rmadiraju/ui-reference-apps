const { test, expect } = require('@playwright/test');

// Step definitions for Vite React Component Tests
class ViteReactComponentSteps {
  constructor(page) {
    this.page = page;
  }

  // Background steps
  async givenTheApplicationIsRunning() {
    // This is handled by the test setup
    await this.page.goto('/');
  }

  async andApiCallsAreMocked() {
    // Mock API calls
    await this.page.route('/api/message', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Welcome to the Vite React CSR Reference Application!',
          timestamp: new Date().toISOString()
        })
      });
    });

    await this.page.route('/api/data', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [
            { id: 1, title: 'Sample Item 1', description: 'This is a sample item for testing' },
            { id: 2, title: 'Sample Item 2', description: 'Another sample item for testing' },
            { id: 3, title: 'Sample Item 3', description: 'Third sample item for testing' }
          ]
        })
      });
    });
  }

  // Action steps
  async whenIVisitTheApplication() {
    await this.page.goto('/');
  }

  async whenIClickTheRefreshMessageButton() {
    await this.page.click('button:has-text("Refresh Message")');
  }

  async whenIClickTheRefreshDataButton() {
    await this.page.click('button:has-text("Refresh Data")');
  }

  async whenIVisitTheApplicationOnAMobileDevice() {
    await this.page.setViewportSize({ width: 375, height: 667 });
    await this.page.goto('/');
  }

  // Assertion steps
  async thenIShouldSeeTheApplicationTitle(title) {
    await expect(this.page.locator('h1')).toContainText(title);
  }

  async thenIShouldSeeTheSubtitle(subtitle) {
    await expect(this.page.locator('p')).toContainText(subtitle);
  }

  async thenTheHeaderShouldHaveAGradientBackground() {
    const header = this.page.locator('.header');
    await expect(header).toHaveCSS('background', /gradient/);
  }

  async thenIShouldSeeAMessageSection() {
    await expect(this.page.locator('.message-section')).toBeVisible();
  }

  async thenIShouldSeeTheMockedMessage(message) {
    await expect(this.page.locator('.message-card p')).toContainText(message);
  }

  async thenIShouldSeeTheMessageTimestamp() {
    await expect(this.page.locator('.message-card small')).toBeVisible();
  }

  async thenIShouldSeeARefreshMessageButton() {
    await expect(this.page.locator('button:has-text("Refresh Message")')).toBeVisible();
  }

  async thenIShouldSeeADataSection() {
    await expect(this.page.locator('.data-section')).toBeVisible();
  }

  async thenIShouldSeeSampleDataItemsAsTheSectionTitle() {
    await expect(this.page.locator('.data-section h2')).toContainText('Sample Data Items');
  }

  async thenIShouldSeeMultipleDataItems() {
    await expect(this.page.locator('.item')).toHaveCount(3);
  }

  async thenEachItemShouldHaveATitleAndDescription() {
    const items = this.page.locator('.item');
    for (let i = 0; i < 3; i++) {
      await expect(items.nth(i).locator('h3')).toBeVisible();
      await expect(items.nth(i).locator('p')).toBeVisible();
    }
  }

  async thenIShouldSeeARefreshDataButton() {
    await expect(this.page.locator('button:has-text("Refresh Data")')).toBeVisible();
  }

  async thenTheMessageShouldBeRefreshedWithNewMockedContent() {
    // Wait for the refresh to complete
    await this.page.waitForTimeout(500);
    await expect(this.page.locator('.message-card p')).toBeVisible();
  }

  async thenTheTimestampShouldBeUpdated() {
    await expect(this.page.locator('.message-card small')).toBeVisible();
  }

  async thenTheDataShouldBeRefreshedWithNewMockedContent() {
    await this.page.waitForTimeout(500);
    await expect(this.page.locator('.item')).toHaveCount(3);
  }

  async thenTheItemsListShouldBeUpdated() {
    await expect(this.page.locator('.items-list')).toBeVisible();
  }

  async thenIShouldSeeAnErrorMessage() {
    await expect(this.page.locator('.error')).toBeVisible();
  }

  async thenIShouldSeeARetryButton() {
    await expect(this.page.locator('button:has-text("Retry")')).toBeVisible();
  }

  async thenThePageShouldUseTheFullWidth() {
    const app = this.page.locator('.app');
    await expect(app).toHaveCSS('width', '100%');
  }

  async thenTheContentShouldBeProperlyCentered() {
    const container = this.page.locator('.container');
    await expect(container).toHaveCSS('margin', '0px auto');
  }

  async thenTheContentShouldHaveALightBackground() {
    const content = this.page.locator('.content');
    await expect(content).toHaveCSS('background-color', 'rgb(248, 249, 250)');
  }

  async thenTheFooterShouldBeVisibleAtTheBottom() {
    await expect(this.page.locator('.footer')).toBeVisible();
  }

  async thenTheLayoutShouldBeResponsive() {
    await expect(this.page.locator('.container')).toBeVisible();
  }

  async thenTheContentShouldBeReadable() {
    await expect(this.page.locator('.content')).toBeVisible();
  }

  async thenTheButtonsShouldBeAccessible() {
    await expect(this.page.locator('button')).toBeVisible();
  }
}

module.exports = ViteReactComponentSteps; 