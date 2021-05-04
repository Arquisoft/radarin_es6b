const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("../e2e/features/login.feature");
const puppeteer = require("puppeteer");


defineFeature((feature), (test) => {
test("We want to login into radarin", ({given, when, then})=> {
    let popup;

    given("The login page", async()=> {
        //se crear un navegador
        /* browser= await puppeteer.launch({
            headless:false, ignoreDefaultArgs: ["--disable-extensions"],defaultViewPort:null
        }); */
        //abrimos una nueva pagina
        //page=await browser.newPage();
        await global.page.goto("http://localhost:3000", {waitUntil: "load", timeout: 0});
    });

    when("We click Log In and enter our information", async()=>{
        const newPagePromise = new Promise((x) =>  global.browser.once(("targetcreated"), (target) => x(target.page())));	
        await expect(global.page).toClick("button", { className: "logButton" });
      
        popup = await newPagePromise;
        await expect(popup).toMatchElement("button", { text: "Solid Community", waitUntil: "load", timeout: 0, visible: true});
        await expect(popup).toClick("button", { text: "Solid Community" });
        await popup.waitForNavigation({waitUntil: "load", timeout: 0});


        await popup.type("[name='username']", "Radarin6b", {visible: true});
      await popup.type("[name='password']", "Radarin_es6b", {visible: true});
      await expect(popup).toClick("button", { text: "Log In" });

    });

    then("I expect to be on HomeView of radarin", async ()=> {
        await expect(global.page).toMatch("Geolocation is not supported by this browser!", {waitUntil: "load", timeout:0});
    });
});
});