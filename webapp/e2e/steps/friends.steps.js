const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('../e2e/features/friends.feature');
const puppeteer = require("puppeteer");

defineFeature(feature, test => {

  function wait(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  
  test('The user unregistered wants to see the list friends', ({ given, when, then }) => {

    let popup;

    given('The user register in the application', async() => {
    
      await page.goto("http://localhost:3000", {waitUntil: "load", timeout: 0});
      
      const newPagePromise = new Promise((x) =>  global.browser.once(("targetcreated"), (target) => x(target.page())));	
      await expect(page).toClick("button", { className: "logButton" });
      popup = await newPagePromise;
      await expect(popup).toMatchElement("button", { text: "Solid Community", waitUntil: "load", timeout: 0, visible: true});
      await expect(popup).toClick("button", { text: "Solid Community" });
      await popup.waitForNavigation({waitUntil: "load", timeout: 0});

      await popup.type("[name='username']", "Radarin6b", {visible: true});
      await popup.type("[name='password']", "Radarin_es6b", {visible: true});
      await expect(popup).toClick("button", { text: "Log In" });       
      
      //await expect(global.page).toMatch("Geolocation is not supported by this browser!", {waitUntil: "load", timeout:0});     
    });

    when('The user click the menu and select friends', async () => {
      // Para acceder a la vista de amigos hay que:
      //click en el menu
      await expect(page).toClick('[id="menu"]');
      await wait(8000);
      
      //clik friends      
      await expect(page).toClick('[id="friends"]');
      await wait(8000);
      
    
    });

    then('The user should see his friends', async () => {      
      await expect(global.page).toMatch('Friends');
      
      
      
    });
  });
  
});