Feature: Vite React Application - Live Dependency Tests
  As a user
  I want to interact with the Vite React application
  So that I can view content and refresh data from the real backend

  Background:
    Given the application is running
    And the backend server is running
    And API calls are made to the real backend

  Scenario: View application header
    When I visit the application
    Then I should see the application title "Vite React CSR Reference App"
    And I should see the subtitle "Client-Side Rendering with Vite and React"
    And the header should have a gradient background

  Scenario: View real message content
    When I visit the application
    Then I should see a message section
    And I should see a message from the backend API
    And I should see the message timestamp
    And I should see a "Refresh Message" button

  Scenario: View real data content
    When I visit the application
    Then I should see a data section
    And I should see "Sample Data Items" as the section title
    And I should see multiple data items from the backend
    And each item should have a title and description
    And I should see a "Refresh Data" button

  Scenario: Refresh real message
    When I click the "Refresh Message" button
    Then the message should be refreshed with new content from the backend
    And the timestamp should be updated

  Scenario: Refresh real data
    When I click the "Refresh Data" button
    Then the data should be refreshed with new content from the backend
    And the items list should be updated

  Scenario: Handle backend connectivity
    Given the backend server is not responding
    When I visit the application
    Then I should see an error message
    And I should see a "Retry" button

  Scenario: Verify page responsiveness
    When I visit the application on a mobile device
    Then the layout should be responsive
    And the content should be readable
    And the buttons should be accessible

  Scenario: Verify page layout and styling
    When I visit the application
    Then the page should use the full width
    And the content should be properly centered
    And the header should be styled with a gradient
    And the content should have a light background
    And the footer should be visible at the bottom

  Scenario: Test API integration
    When I visit the application
    Then the application should successfully connect to the backend
    And the API calls should return valid data
    And the data should be displayed correctly 