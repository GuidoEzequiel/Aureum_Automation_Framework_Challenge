Feature: Add to Cart

  Scenario Outline: As a user, I can verify an item can be added to the cart and is visible on the cart page.

    Given I am on the login page
    Given I login with <username> and <password>
    When I add an item to the cart
    When I proceed to the cart page
    Then I see the item has been added correctly

    Examples:
      | username      | password     |
      | standard_user | secret_sauce |
