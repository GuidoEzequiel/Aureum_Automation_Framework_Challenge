@storeServiceTests
Feature: Store Services - Endpoint Tests

  Scenario Outline: GET - Check Store Inventory
    Given I request the inventory status counts
    Then the response code should be <responseCode>
    And the response body should be a map of status counts
    
    Examples:
      | responseCode |
      | 200          |


  Scenario Outline: POST -  Place an order for a pet
    Given the order details for a pet with <petId> and <quantity> 
    When I place an order for the pet
    Then the response code should be <responseCode>
    And the response body should reflect the placed order

    Examples:
      | petId | quantity | responseCode |
      | 1001  | 5        | 200          | 


Scenario Outline: GET - Find purchase order by ID
    Given I ensure an order with <orderId> exists
    When I retrieve the order by ID
    Then the response code should be <responseCode>
    And the response body should reflect the retrieved order
    
    Examples:
      | orderId | responseCode |
      | 1       | 200          |


  Scenario Outline: DELETE - Delete purchase order by ID
    Given I ensure an order with <orderId> exists
    When I delete the order by ID
    Then the response code should be <responseCode>

    Examples:
      | orderId | responseCode |
      | 1       | 200          |

