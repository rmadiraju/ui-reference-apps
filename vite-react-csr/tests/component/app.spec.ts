import { test, expect } from '@playwright/test'

test.describe('App Component Tests (Mocked API)', () => {
  test.beforeEach(async ({ page }) => {
    // Mock API responses
    await page.route('/api/message', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Mocked message from backend',
          timestamp: '2024-01-01T00:00:00.000Z',
          version: '1.0.0'
        })
      })
    })

    await page.route('/api/data', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [
            { id: 1, name: 'Mocked App 1', description: 'Mocked description 1' },
            { id: 2, name: 'Mocked App 2', description: 'Mocked description 2' }
          ],
          total: 2,
          timestamp: '2024-01-01T00:00:00.000Z'
        })
      })
    })

    await page.goto('/')
  })

  test('should display header with title and subtitle', async ({ page }) => {
    await expect(page.getByText('UI Reference Apps')).toBeVisible()
    await expect(page.getByText('Vite + React Client-Side Rendering')).toBeVisible()
  })

  test('should display mocked API message', async ({ page }) => {
    await expect(page.getByText('Mocked message from backend')).toBeVisible()
    await expect(page.getByText('Version: 1.0.0')).toBeVisible()
  })

  test('should display mocked API data', async ({ page }) => {
    await expect(page.getByText('Total Items: 2')).toBeVisible()
    await expect(page.getByText('Mocked App 1')).toBeVisible()
    await expect(page.getByText('Mocked App 2')).toBeVisible()
  })

  test('should refresh message when refresh button is clicked', async ({ page }) => {
    let callCount = 0
    await page.route('/api/message', async route => {
      callCount++
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          message: `Refreshed message ${callCount}`,
          timestamp: '2024-01-01T00:00:00.000Z',
          version: '1.0.0'
        })
      })
    })

    await page.getByRole('button', { name: 'Refresh Message' }).click()
    await expect(page.getByText('Refreshed message 2')).toBeVisible()
  })

  test('should refresh data when refresh button is clicked', async ({ page }) => {
    let callCount = 0
    await page.route('/api/data', async route => {
      callCount++
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [
            { id: callCount, name: `Refreshed App ${callCount}`, description: `Refreshed description ${callCount}` }
          ],
          total: 1,
          timestamp: '2024-01-01T00:00:00.000Z'
        })
      })
    })

    await page.getByRole('button', { name: 'Refresh Data' }).click()
    await expect(page.getByText('Refreshed App 2')).toBeVisible()
  })

  test('should handle API errors gracefully', async ({ page }) => {
    await page.route('/api/message', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      })
    })

    await page.goto('/')
    await expect(page.getByText('Failed to fetch message from API')).toBeVisible()
  })
}) 