const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./features/homepage.feature");

defineFeature(feature, test => {
    beforeEach(async () => {
        await global.page.goto("https://radarines6bwebapp.herokuapp.com/");
    });

    
    test("User opens the app", ({ when, then }) => {
    

        when("I go to the homepage", async () => {
            await expect(page).toMatch("Radarin");
            await page.goto("https://radarines6bwebapp.herokuapp.com/friends");
            await expect(page).toMatch("Log in");
        });

        then("I try to go to the friends view but I can't because I'm not register", function () {
            
            
        });
    });
});