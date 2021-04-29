Feature: Logout from radarin 

Scenario: The user wants to logout 
  Given The user register in the application
  When The user click the logout button
  Then The user should be in the notloginhome view