@bonusTest
Feature: Bonus Task - Visit descendants of DOM element

  Scenario: Visit all DOM descendant of an element
    Given I am on the homepage
    When I visit all descendants of an element
    Then They are logged successfully