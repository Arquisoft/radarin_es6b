Feature: See the friends list

Scenario: The user is unregistered in the site and wants to register
  Given An unregistered user
  When I click on log in
  Then A welcome message should be shown in the screen