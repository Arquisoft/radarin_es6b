Feature: Logout of radarin

Scenario: We want to logout of radarin
  Given The application page
  When We click Log Out
  Then I expect to be on the Log In page