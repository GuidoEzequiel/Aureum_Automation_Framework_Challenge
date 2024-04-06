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


#  Scenario Outline: PUT - Update already existing pet
#    Given a pet with <petId>
#    When I update the pet <name> and <status>
#    Then the response code should be <responseCode>
#
#    Examples:
#      | petId | name   | status  | responseCode |
#      | 1003 | KitKat | pending | 200          |



#  Scenario Outline: PUT - Update already existing pet
#    Given a new pet with <petId>, <name>, and <status>
#    Then the response code should be <responseCode>
#    And the response message should confirm the image upload
#
#    Examples:
#      | petId | name  | status  | responseCode |
#      | 1002  | Kitty | pending | 200          |
#      | 1002  | Kitty | pending | 400          |
#      | 1002  | Kitty | pending | 404          |
#      | 1002  | Kitty | pending | 405          |


#  Scenario Outline: GET - Find pet by Status
#    Given a new pet with <petId>, <name>, and <status>
#    Then the response code should be <responseCode>
#    And the response message should confirm the image upload
#
#    Examples:
#      | petId | name  | status  | responseCode |
#      | 1002  | Kitty | pending | 200          |
#      | 1002  | Kitty | pending | 400          |


#  Scenario Outline: GET - Find pet by ID
#    Given a new pet with <petId>, <name>, and <status>
#    Then the response code should be <responseCode>
#    And the response message should confirm the image upload
#
#    Examples:
#      | petId | name  | status  | responseCode |
#      | 1002  | Kitty | pending | 200          |
#      | 1002  | Kitty | pending | 400          |
#      | 1002  | Kitty | pending | 404          |


#  Scenario Outline: POST - Updates pet's data with Form Data
#    Given a new pet with <petId>, <name>, and <status>
#    Then the response code should be <responseCode>
#    And the response message should confirm the image upload
#
#    Examples:
#      | petId | name  | status  | responseCode |
#      | 1002  | Kitty | pending | 200          |
#      | 1002  | Kitty | pending | 405          |


#  Scenario Outline: DELETE - Find pet by ID and delete it
#    Given a new pet with <petId>, <name>, and <status>
#    Then the response code should be <responseCode>
#    And the response message should confirm the image upload
#
#    Examples:
#      | petId | name  | status  | responseCode |
#      | 1002  | Kitty | pending | 200          |
#      | 1002  | Kitty | pending | 400          |
#      | 1002  | Kitty | pending | 404          |





# Store Endpoint Tests -





# User Endpoint Tests -





#  # Negative Cases -



#  Scenario Outline: POST - Attempt to add a new pet using wrong methods.
#    When I send a <method> request to add a new pet with <petId>, <name>, and <status>
#    Then the response code should be <responseCode>
#
#    Examples:
#      | method    | petId | name  | status  | responseCode |
#      | get       | 1002  | Kitty | pending | 405          | 
#      | put       | 1002  | Kitty | pending | 405          | 
#      | delete    | 1002  | Kitty | pending | 405          | 