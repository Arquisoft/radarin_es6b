const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('../e2e/features/friends.feature');

defineFeature(feature, test => {

  /*function wait(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }*/

  beforeAll(async () => {
    await global.page.goto('http://localhost:3000')
  })

  test('The user wants to see the list friends', ({ given, when, then }) => {

    let webID;
    let username;
    let password;

    given('The user', () => {
      //webID = "https://radarin6b.solidcommunity.net/profile/card#me";
      //username = "Radarin6b";
      //password = "Radarin_es6b";

      await expect(page).toMatch('Monica');
    });

    when('The user register in the application', async () => {
      await expect(page).toClick('[id="menu"]');
     
     /* newPagePromise = new Promise(x => page.once('popup', x));
      await expect(page).toClick('button', { text: 'LOG IN' });
      popup = await newPagePromise;

      
      await expect(popup).toFill('input[type="url"]', webID);
      await expect(popup).toClick('[type="submit"]');
      await wait(6000);
      await expect(popup).toFill('input[name="username"]', username);
      await expect(popup).toFill('input[name="password"]', password);
      await expect(popup).toClick('[id="login"]');
      await wait(8000);*/

    });

    then('The user access to the friends view', async () => {

      // Para acceder a la vista de amigos hay que:
      //click en el menu
      //await expect(page).toClick('[id="menu"]');
      //clik friends
      
/*
      await wait(8000);
      await expect(page).toMatch('Adrian');
      await expect(page).toMatch('Pablo');
      await expect(page).toMatch('Candela');*/
      
    });
  });
  
});