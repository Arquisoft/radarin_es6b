const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./features/friends.feature');

defineFeature(feature, test => {

  function wait(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  beforeAll(async () => {
    await global.page.goto('http://localhost:3000/LogIn')
  })

  test('The user wants to see the list friends', ({ given, when, then }) => {

    let webID;
    let username;
    let password;

    given('The user', () => {
      webID = "https://testpodasw.solidcommunity.net/profile/card#me";
      username = "testpodasw";
      password = "TestTest1?";
    });

    when('The user register in the application', async () => {

      // Accedemos a la ventana de inicio de sesión  
      newPagePromise = new Promise(x => page.once('popup', x));
      await expect(page).toClick('button', { text: 'Access with your POD' });
      popup = await newPagePromise;

      // Introducimos los datos de incio de sesión 
      await expect(popup).toFill('input[type="url"]', webID);
      await expect(popup).toClick('[type="submit"]');
      await wait(6000);
      await expect(popup).toFill('input[name="username"]', username);
      await expect(popup).toFill('input[name="password"]', password);
      await expect(popup).toClick('[id="login"]');
      await wait(8000);

    });

    then('The user access to the friends view', async () => {

      // Accedemos a la sección de amigos
      await page.goto('http://localhost:3000/amigos')

      await wait(8000);
      await expect(page).toMatch('Alberto');
      await expect(page).toMatch('David Álvarez');
      await expect(page).toMatch('Jonathan');
      await expect(page).toMatch('moises');
    });
  });
  
});