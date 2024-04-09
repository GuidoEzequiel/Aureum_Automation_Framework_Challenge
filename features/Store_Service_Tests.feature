@storeServiceTests
Feature: Store Services - Endpoint Tests

  Scenario Outline: GET - Check Store Inventory
    Given I request the inventory status counts
    Then the response code should be <responseCode>
    And the response body should be a map of status counts
    
    Examples:
      | responseCode |
      | 200          |

  # Scenario Outline: POST -  Place an order for a pet
  #   Given the order details for a pet
  #   When I place an order for the pet
  #   Then the response code should be <responseCode>
  #   And the response body should reflect the placed order

  #   Examples:
  #     | responseCode |
  #     | 200          |


