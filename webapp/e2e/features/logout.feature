Feature: Logout of radarin

Scenario: The user is registered in the site and wants to unregistered
  Given A registered user
  When I click on log out
  Then The screen of log in