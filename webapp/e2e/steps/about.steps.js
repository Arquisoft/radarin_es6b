const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./features/about.feature');

defineFeature(feature, test => {

  function wait(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  beforeAll(async () => {
    await global.page.goto('http://localhost:3000')
  })
  test("The user is registered in the site and wants to go to the about view", ({given, when, then}) => {
		

    given("A registered user", () => {
        
    });
    
    when("I click on about screen", async () => {
        await expect(page).toMatch("Welcome to Radarin_es6b")
       // await expect(page).toClick("button", { id="botonNav" })
        await expect(page).toClick("button", { id:"botonNav" })
        await expect(page).toMatch("About")
        /*await expect(page).toFillForm('form[name="register"]', {
            username: username,
            email: email,
        })
        await expect(page).toClick("button", { text: "Submit" })
        await expect(page).toMatch("Welcome to ASW")*/
    });
    
    then("The screen of the about", async () => {

    });
});

});  
  
