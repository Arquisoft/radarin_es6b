Feature: Login into radarin

Scenario: We want to login into radarin
  Given The login page
  When We click Log In and enter our information
  Then I expect to be on HomeView of radarin