const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("../e2e/features/about.feature");
const puppeteer = require("puppeteer");
defineFeature(feature, test => {
  test("The user is registered in the site and wants to go to the about view", ({given, when, then}) => {
		let popup;

    given("A registered user", async() => {
      await global.page.goto("http://localhost:3000", {waitUntil: "load", timeout: 0});
      const newPagePromise = new Promise((x) =>  global.browser.once(("targetcreated"), (target) => x(target.page())));	
        await expect(global.page).toClick("button", { className: "logButton" });
      
        popup = await newPagePromise;
        await expect(popup).toMatchElement("button", { text: "Solid Community", waitUntil: "load", timeout: 0, visible: true});
        await expect(popup).toClick("button", { text: "Solid Community" });
        await popup.waitForNavigation({waitUntil: "load", timeout: 0});


        await popup.type("[name='username']", "Radarin6b", {visible: true});
      await popup.type("[name='password']", "Radarin_es6b", {visible: true});
      await expect(popup).toClick("button", { text: "Log In" });
      //await expect(global.page).toMatch("Geolocation is not supported by this browser!", {waitUntil: "load", timeout:0});
    });
    
    when("I click on about screen", async () => {

        await expect(global.page).toClick('[id="menu"]');

        await expect(global.page).toClick('[id="buttonAbout"]');
    });
    
    then("The screen of the about", async () => {
      await expect(global.page).toMatch("About Radarin")
    });
});

});  