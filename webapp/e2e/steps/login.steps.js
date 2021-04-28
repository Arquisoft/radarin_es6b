const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./features/login.feature');

defineFeature(feature, test => {

  function wait(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  beforeAll(async () => {
    await global.page.goto('http://localhost:3000')
  })
  test("The user is unregistered in the site and wants to register", ({given, when, then}) => {
		

    given("An unregistered user", () => {
        
    });
    
    when("I click on log in", async () => {
        //await expect(page).toMatch("Welcome to Radarin_es6b")
        //await expect(page).toClick("button", { text: "Submit" })
        /*await expect(page).toFillForm('form[name="register"]', {
            username: username,
            email: email,
        })
        await expect(page).toClick("button", { text: "Submit" })
        await expect(page).toMatch("Welcome to ASW")*/
    });
    
    then("A welcome message should be shown in the screen", async () => {

    });
});

});  
  
