const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("../e2e/features/login.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;

defineFeature(feature, test => {
  let popup;

  test("The user is registered in the site and wants to go to the about view", ({given, when, then}) => {
		

    given("A registered user", () => {
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
      await expect(page).toMatch("Mapa", {waitUntil: "load", timeout:0});
    });
    
    when("I click on about screen", async () => {
        await expect(page).toMatch("Welcome to Radarin_es6b")
        //await expect(page).toClick("button", { id:"botonNav" })
        await expect(page).toClick("button")

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
  
