@petServiceTests
Feature: Pet Services - Endpoint Tests

  Scenario Outline: POST - Upload an image for a pet
    Given I add a new pet with <petId>, <name>, and <status>
    When I upload an image for the pet with <petId>
    Then the response code should be <responseCode>
    And the response message should confirm the image upload

    Examples:
      | petId | name  | status    | responseCode |
      | 1001  | Kitty | available | 200          |


  Scenario Outline: POST - Add a new pet
    When I add a new pet with <petId>, <name>, and <status>
    Then the response code should be <responseCode>
    And the response message should confirm the image upload

    Examples:
      | petId | name  | status  | responseCode |
      | 1001  | Kitty | pending | 200          |


  Scenario Outline: PUT - Update already existing pet
    Given I ensure the pet with <petId> exists
    When I update the pet <name> and <status>
    Then the response code should be <responseCode>

    Examples:
      | petId | name   | status  | responseCode |
      | 1001  | KitKat | pending | 200          |


  Scenario Outline: GET - Find pets by different statuses
    Given I want to find pets with the status <statuses>
    When I search for pets by status
    Then I should receive a list of pets with the status <statuses>

    Examples:
      | statuses          |
      | available         |
      | pending           |
      | sold              |
      | available,pending |
      | pending,sold      |
      | available,sold    |


  Scenario Outline: GET - Find a pet using a specific ID
    Given a pet with <petId>
    When I search for the pet ID
    Then I should receive the pet details

    Examples:
      | petId   |
      | 1001    |
      | 10      |


  Scenario Outline: POST - Update a pet's name and status using its ID
    Given I ensure a pet with <petId> exists
    And I have the new pet name <name> and status <status>
    When I update the pet using form data
    Then the response code should be <responseCode>

    Examples:
      | petId | name   | status    | responseCode |
      | 1001  | Reptar | available | 200          |
      | 1002  | Floki  | sold      | 200          |

 Scenario Outline: DELETE - Delete a pet's entry using its ID
    Given I ensure a pet with <petId> exists
    When I send a request to remove the pet
    Then the response code should be <responseCode>

    Examples:
      | petId | responseCode |
      | 1001  | 200          |


#  # Negative Cases -

