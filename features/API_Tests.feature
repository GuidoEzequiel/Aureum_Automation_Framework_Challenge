Feature: Petstore - Pet Tests

  # Pet Endpoint Tests -
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
      | 1002  | Kitty | pending | 200          |


  Scenario Outline: PUT - Update already existing pet
    Given a pet with <petId>
    When I update the pet <name> and <status>
    Then the response code should be <responseCode>

    Examples:
      | petId | name   | status  | responseCode |
      | 1002  | KitKat | pending | 200          |


  Scenario Outline: Find pets by different statuses
    Given I want to find pets with the status <statuses>
    When I search for pets by status
    Then I should receive a list of pets with the status <statuses>

    Examples:
      | statuses            |
      | available         |
      | pending           |
      | sold              |
      | available,pending |
      | pending,sold      |
      | available,sold    |



# Store Endpoint Tests -


# User Endpoint Tests -


#  # Negative Cases -

