const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./features/nav.feature");

defineFeature(feature, test => {

    beforeEach(async () => {
        await global.page.goto("https://radarines6bwebapp.herokuapp.com/");
    });

    test("User opens nav", ({ when, then }) => {

        when("I click the button",  async () => {
            await expect(page).toClick("button", { class: "MuiButtonBase-root MuiButton-root MuiButton-contained logButton MuiButton-containedPrimary" })
        });

        then("I expect to see the nav menu", async () => {
           await expect(page).toMatch("Log in");
           ;
        });
    });
});