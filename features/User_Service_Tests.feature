@userServiceTests
Feature: User Services - Endpoint Tests

  Scenario Outline: POST - Create multiple users with a list
    Given I have a collection of <users>
    When I create multiple users with the list
    Then the response code should be <responseCode>

    Examples:
      | users              | responseCode |
      | Edward,Alphonse    | 200          |
      | Max                | 200          |
      | Sonic,Shadow,Tails | 200          |


  Scenario Outline: GET - Get a user by username
    Given I ensure the <username> exists
    When I retrieve the user by the username
    Then the response code should be <responseCode>

    Examples:
      | username | responseCode |
      | Titor    | 200          |


  Scenario Outline: PUT - Update a user by username
    Given I have the <updatedUserName>, <updatedPassword>, <updatedFirstName>, <updatedLastName>, <updatedEmail> and <updatedPhone>
    When I ensure the <username> exists
    And I update the user by the <username>
    Then the response code should be <responseCode>

    Examples:
      | username | updatedUserName | updatedFirstName | updatedLastName | updatedEmail          | updatedPassword | updatedPhone | responseCode |
      | Titor    | TimeTraveler    | John             | Titor           | Jtitor@SteinsGate.com | ElPsykongroo     | Microwave    | 200          |


  Scenario Outline: DELETE - Delete a user by username
    Given I ensure the <username> exists
    When I delete the user by the <username>
    Then the response code should be <responseCode>

    Examples:
      | username | responseCode |
      | jdoe     | 200          |


  Scenario Outline: GET - Log in a user
    Given I have valid <username> and <password>
    When I log in the user
    Then the response code should be <responseCode>

     Examples:
      | username | password     | responseCode |
      | Titor    | ElPsykongroo | 200          |


  Scenario: GET - Log out a user
    Given I have valid <username> and <password>
    When I log in the user    
    And I log out the user
    Then the response code should be 200

      Examples:
       | username | password     | responseCode |
       | Titor    | ElPsykongroo | 200          |


  Scenario Outline: POST - Create multiple users with an array
    Given I have a collection of <users>
    When I create multiple users with the array
    Then the response code should be <responseCode>

    Examples:
      | users              | responseCode |
      | Edward,Alphonse    | 200          |
      | Max                | 200          |
      | Sonic,Shadow,Tails | 200          |

  Scenario Outline: POST - Create a single user

    Given I have the <userName>, <password>, <firstName>, <lastName>, <email> and <phone>
    When I create the new user
    Then the response code should be <responseCode>

    Examples:
      | username     | password     | firstName | lastName | email         | phone   | responseCode |
      | TimeTraveler | ElPsykongroo | John      | Titor    | Jtitor@SG.com | 3144038 | 200          |

