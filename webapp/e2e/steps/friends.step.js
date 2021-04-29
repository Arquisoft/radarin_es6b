const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('../e2e/features/friends.feature');
const puppeteer = require("puppeteer");
let browser = null;
let page = null;
defineFeature(feature, test => {

  function wait(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  /*beforeAll(async () => {
    await global.page.goto('http://localhost:3000')
  })*/

  test('The user unregistered wants to see the list friends', ({ given, when, then }) => {

    let webID;
    let username;
    let password;

    given('The user', () => {
      webID = "https://radarin6b.solidcommunity.net/profile/card#me";
      username = "Radarin6b";
      password = "Radarin_es6b";

      
    });

    when('The user register in the application', async () => {

      let popup;
   
        //se crear un navegador
        browser= await puppeteer.launch({
            headless:false, ignoreDefaultArgs: ["--disable-extensions"],defaultViewPort:null
        });
        //abrimos una nueva pagina
        page=await browser.newPage();
        await page.goto("http://localhost:3000", {waitUntil: "load", timeout: 0});
        
        const newPagePromise = new Promise((x) =>  browser.once(("targetcreated"), (target) => x(target.page())));	
        await expect(page).toClick("button", { className: "logButton" });
      
        popup = await newPagePromise;
        await expect(popup).toMatchElement("button", { text: "Solid Community", waitUntil: "load", timeout: 0, visible: true});
        await expect(popup).toClick("button", { text: "Solid Community" });
        await popup.waitForNavigation({waitUntil: "load", timeout: 0});

        await popup.type("[name='username']", "Radarin6b", {visible: true});
      await popup.type("[name='password']", "Radarin_es6b", {visible: true});
      await expect(popup).toClick("button", { text: "Log In" });

       
        //await expect(page).toMatch("Radarin Map", {waitUntil: "load", timeout:0});
        await expect(page).toMatch("Mapa", {waitUntil: "load", timeout:0});
    
    });

    then('The user access to the friends view', async () => {

      // Para acceder a la vista de amigos hay que:
      //click en el menu
      await expect(page).toClick('[id="menu"]');
      //await expect(page).toClick("button", { className: "menu" });
      //clik friends
      //await expect(page).toClick("button", {text: "Friends"});
      await expect(page).toClick('[id="friends"]');
      await wait(8000);
      await expect(page).toMatch('Friends');

      //No encuentra estos amigos porque el servidor no esta arrancado
      //await expect(page).toMatch('Adrian');
      //await expect(page).toMatch('Pablo');
      //await expect(page).toMatch('Candela');
      
    });
  });
  
});