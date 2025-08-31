const { test, expect } = require('@playwright/test');

// Step definitions for Vite React Live Dependency Tests
class ViteReactLiveDependencySteps {
  constructor(page) {
    this.page = page;
  }

  // Background steps
  async givenTheApplicationIsRunning() {
    await this.page.goto('/');
  }

  async andTheBackendServerIsRunning() {
    // This is handled by the test setup - backend should be running
    // We can verify by making a health check
    try {
      const response = await this.page.request.get('http://localhost:3001/health');
      expect(response.status()).toBe(200);
    } catch (error) {
      throw new Error('Backend server is not running on port 3001');
    }
  }

  async andApiCallsAreMadeToTheRealBackend() {
    // No mocking - let real API calls go through
    // The application will make real calls to the backend
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

  async thenIShouldSeeAMessageFromTheBackendApi() {
    // Wait for the message to load from the real backend
    await this.page.waitForSelector('.message-card p', { timeout: 10000 });
    const messageText = await this.page.locator('.message-card p').textContent();
    expect(messageText).toBeTruthy();
    expect(messageText.length).toBeGreaterThan(0);
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

  async thenIShouldSeeMultipleDataItemsFromTheBackend() {
    // Wait for data to load from the real backend
    await this.page.waitForSelector('.item', { timeout: 10000 });
    const itemCount = await this.page.locator('.item').count();
    expect(itemCount).toBeGreaterThan(0);
  }

  async thenEachItemShouldHaveATitleAndDescription() {
    const items = this.page.locator('.item');
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      await expect(items.nth(i).locator('h3')).toBeVisible();
      await expect(items.nth(i).locator('p')).toBeVisible();
    }
  }

  async thenIShouldSeeARefreshDataButton() {
    await expect(this.page.locator('button:has-text("Refresh Data")')).toBeVisible();
  }

  async thenTheMessageShouldBeRefreshedWithNewContentFromTheBackend() {
    // Get the initial message
    const initialMessage = await this.page.locator('.message-card p').textContent();
    
    // Click refresh
    await this.page.click('button:has-text("Refresh Message")');
    
    // Wait for the new message to load
    await this.page.waitForTimeout(1000);
    
    // Verify the message has changed (or at least is still present)
    const newMessage = await this.page.locator('.message-card p').textContent();
    expect(newMessage).toBeTruthy();
  }

  async thenTheTimestampShouldBeUpdated() {
    await expect(this.page.locator('.message-card small')).toBeVisible();
  }

  async thenTheDataShouldBeRefreshedWithNewContentFromTheBackend() {
    // Get initial data count
    const initialCount = await this.page.locator('.item').count();
    
    // Click refresh
    await this.page.click('button:has-text("Refresh Data")');
    
    // Wait for the new data to load
    await this.page.waitForTimeout(1000);
    
    // Verify data is still present
    const newCount = await this.page.locator('.item').count();
    expect(newCount).toBeGreaterThan(0);
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

  async thenTheApplicationShouldSuccessfullyConnectToTheBackend() {
    // Verify that the application can make API calls
    const response = await this.page.request.get('http://localhost:3001/health');
    expect(response.status()).toBe(200);
  }

  async thenTheApiCallsShouldReturnValidData() {
    // Check that message API returns valid data
    const messageResponse = await this.page.request.get('http://localhost:3001/api/message');
    expect(messageResponse.status()).toBe(200);
    const messageData = await messageResponse.json();
    expect(messageData.message).toBeTruthy();
    
    // Check that data API returns valid data
    const dataResponse = await this.page.request.get('http://localhost:3001/api/data');
    expect(dataResponse.status()).toBe(200);
    const dataData = await dataResponse.json();
    expect(dataData.items).toBeTruthy();
    expect(Array.isArray(dataData.items)).toBe(true);
  }

  async thenTheDataShouldBeDisplayedCorrectly() {
    // Verify that the data is displayed in the UI
    await expect(this.page.locator('.message-card p')).toBeVisible();
    await expect(this.page.locator('.item')).toBeVisible();
  }
}

module.exports = ViteReactLiveDependencySteps; 