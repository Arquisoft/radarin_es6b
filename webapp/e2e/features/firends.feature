Feature: See the friends list

Scenario: The user is registered in the application and wants to see the list friends
  Given The application home page
  When We click the menu and selecet friends
  Then I expect to be on the friends page