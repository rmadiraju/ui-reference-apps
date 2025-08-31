Feature: Nuxt.js Vue Application - Component Tests
  As a user
  I want to interact with the Nuxt.js Vue application
  So that I can view content and refresh data

  Background:
    Given the application is running
    And API calls are mocked

  Scenario: View application header
    When I visit the application
    Then I should see the application title "Nuxt.js Vue SSR Reference App"
    And I should see the subtitle "Server-Side Rendering with Nuxt.js and Vue"
    And the header should have a gradient background

  Scenario: View mocked message content
    When I visit the application
    Then I should see a message section
    And I should see the mocked message "Welcome to the Nuxt.js Vue SSR Reference Application!"
    And I should see the message timestamp
    And I should see a "Refresh Message" button

  Scenario: View mocked data content
    When I visit the application
    Then I should see a data section
    And I should see "Sample Data Items" as the section title
    And I should see multiple data items
    And each item should have a title and description
    And I should see a "Refresh Data" button

  Scenario: Refresh mocked message
    When I click the "Refresh Message" button
    Then the message should be refreshed with new mocked content
    And the timestamp should be updated

  Scenario: Refresh mocked data
    When I click the "Refresh Data" button
    Then the data should be refreshed with new mocked content
    And the items list should be updated

  Scenario: Handle API error gracefully
    Given the API returns an error
    When I visit the application
    Then I should see an error message
    And I should see a "Retry" button

  Scenario: Verify page layout and styling
    When I visit the application
    Then the page should use the full width
    And the content should be properly centered
    And the header should be styled with a gradient
    And the content should have a light background
    And the footer should be visible at the bottom

  Scenario: Verify server-side rendering
    When I visit the application
    Then the content should be pre-rendered on the server
    And the page should load quickly
    And the initial content should be visible without JavaScript

  Scenario: Verify Vue reactivity
    When I visit the application
    Then the Vue components should be reactive
    And the data binding should work correctly
    And the computed properties should update properly 