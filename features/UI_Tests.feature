Feature: Add to Cart

  Scenario Outline: As a user, I can verify an item can be added to the cart and is visible on the cart page.

    Given I am on the login page
    Given I login with <username> and <password>
    When I add an item to the cart
    When I proceed to the cart page
    Then I see the item has been added to the cart correctly

    Examples:
      | username      | password     |
      | standard_user | secret_sauce |


  Scenario Outline: As a user, I can checkout selected items.

    Given I am on the login page
    Given I login with <username> and <password>
    When I add an item to the cart
    When I proceed to the cart page
    Then I see the item has been added to the cart correctly

    Examples:
      | username      | password     |
      | standard_user | secret_sauce |


    Scenario Outline: As a user, I can sort inventory items by Price.

    Given I am on the login page
    Given I login with <username> and <password>
    When I sort items by Price
    Then I see sorted items by Price


    Examples:
      | username      | password     |
      | standard_user | secret_sauce |


    Scenario Outline: As a user, I can sort inventory items by Name.

    Given I am on the login page
    Given I login with <username> and <password>
    When I add an item to the cart
    When I sort items by Name
    Then I see sorted items by Name

    Examples:
      | username      | password     |
      | standard_user | secret_sauce |