const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("../e2e/features/logout.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;


defineFeature((feature), (test) => {
test("The user wants to logout", ({given, when, then})=> {
    let popup;

    given("The user register in the application", async()=> {
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

    when("The user click the logout button", async()=>{
        await expect(page).toClick("button", { className: "logButton" });

    });

    then("The user should be in the notloginhome view", async ()=> {
        await expect(page).toMatch("Welcome to Radarin_es6b", {waitUntil: "load", timeout:0});
    });
});
});