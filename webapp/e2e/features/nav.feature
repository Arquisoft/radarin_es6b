Feature: Nav display
  Any user before being logged in
  should see log button
  the log in is shown

  Scenario: User opens log in
    When I click the button
    Then I expect to see the log in