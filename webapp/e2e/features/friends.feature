Feature: See the friends list

Scenario: The user unregistered wants to see the list friends
  Given The user register in the application
  When The user click the menu and select friends
  Then The user should see his friends