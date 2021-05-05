const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./features/register-form.feature');

defineFeature(feature, test => {

  beforeEach(async () => {
    await global.page.goto('http://localhost:3000')
  })

  test('The user is not registered in the site', ({given,when,then}) => {
       given('An unregistered user', () => {

    	});

    	when('I fill the data in the form and press submit', () => {

    	});

    	then('A welcome message should be shown in the screen', () => {

    	});
  });
});