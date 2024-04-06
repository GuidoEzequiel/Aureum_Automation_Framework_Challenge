Feature: UI validations

  Scenario Outline: As a user, I can verify an item can be added to the cart and is visible on the cart page.

    Given I am on the login page
    Given I login with <username> and <password>
    When I add the <items> to the cart
    When I proceed to the cart page
    Then the <items> should be visible in the cart

      Examples:
        | username      | password     | items    |
        | standard_user | secret_sauce | backpack |


  Scenario Outline: As a user, I can complete the purchase/finish checkout for selected items.

    Given I am on the login page
    Given I login with <username> and <password>
    When I add the <items> to the cart
    When I proceed to the cart page
    When I move on to the checkout
    When I fill user information
    When I continue the checkout
    When I verify checkout <items>
    When I finish checkout process
    Then I see the order has been confirmed

    Examples:
        | username      | password     | items                   |
        | standard_user | secret_sauce | bikeLight,tShirt,jacket |


    Scenario Outline: As a user, I can sort inventory items by Price.

    Given I am on the login page
    Given I login with <username> and <password>
    When I sort items by <criteria>
    Then I see sorted items by <criteria>

    Examples:
      | username      | password     | criteria |
      | standard_user | secret_sauce | Price    |
      | standard_user | secret_sauce | Name     |