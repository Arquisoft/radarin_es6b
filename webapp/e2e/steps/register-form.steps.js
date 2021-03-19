const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./features/register-form.feature');

defineFeature(feature, test => {

  beforeEach(async () => {
    await global.page.goto('http://localhost:3000')
  })

  test('The user is not registered in the site', ({given,when,then}) => {
      console.log("Pase los test");
  });
});