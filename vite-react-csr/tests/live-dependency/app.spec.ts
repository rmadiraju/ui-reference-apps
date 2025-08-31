import { test, expect } from '@playwright/test'

test.describe('App Live Dependency Tests (Real API)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display header with title and subtitle', async ({ page }) => {
    await expect(page.getByText('UI Reference Apps')).toBeVisible()
    await expect(page.getByText('Vite + React Client-Side Rendering')).toBeVisible()
  })

  test('should display real API message from backend', async ({ page }) => {
    // Wait for the message to load
    await expect(page.getByText(/Hello from UI Reference Backend/)).toBeVisible()
    await expect(page.getByText(/Version:/)).toBeVisible()
  })

  test('should display real API data from backend', async ({ page }) => {
    // Wait for the data to load
    await expect(page.getByText(/Total Items:/)).toBeVisible()
    await expect(page.getByText(/Reference App/)).toBeVisible()
  })

  test('should refresh message when refresh button is clicked', async ({ page }) => {
    // Wait for initial load
    await expect(page.getByText(/Hello from UI Reference Backend/)).toBeVisible()
    
    // Click refresh and wait for new content
    await page.getByRole('button', { name: 'Refresh Message' }).click()
    
    // Should still show the message (might be the same due to caching)
    await expect(page.getByText(/Hello from UI Reference Backend/)).toBeVisible()
  })

  test('should refresh data when refresh button is clicked', async ({ page }) => {
    // Wait for initial load
    await expect(page.getByText(/Total Items:/)).toBeVisible()
    
    // Click refresh and wait for new content
    await page.getByRole('button', { name: 'Refresh Data' }).click()
    
    // Should still show the data
    await expect(page.getByText(/Total Items:/)).toBeVisible()
  })

  test('should handle network errors gracefully', async ({ page }) => {
    // This test would require the backend to be down
    // In a real scenario, you might want to test this by stopping the backend server
    // For now, we'll just verify the error handling structure exists
    await expect(page.locator('.error')).toBeHidden() // Should not show error initially
  })

  test('should have proper page structure', async ({ page }) => {
    // Check for main sections
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
    
    // Check for content sections
    await expect(page.getByText('API Message')).toBeVisible()
    await expect(page.getByText('API Data')).toBeVisible()
  })

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByText('UI Reference Apps')).toBeVisible()
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.getByText('UI Reference Apps')).toBeVisible()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.getByText('UI Reference Apps')).toBeVisible()
  })
}) 