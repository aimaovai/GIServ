// Dependencies
const { Given, When, Then } = require('@cucumber/cucumber');
const {
  clickOnItem,
  fillInFormFieldwithPlaceholder,
  pressButton,
  shouldBeOnPage,
  wait,
  visitLoginPage,
  clickDropDown
} = require('../support/actions');

Given('I am on the Login Page', visitLoginPage)

When('I click on {string} option of {string} drop down', clickDropDown)

Given('I click on {string}', clickOnItem);

When('I fill in placeholder {string} with {string}', fillInFormFieldwithPlaceholder);

When('I press {string}', pressButton);

Then('I should be on the {string} page', shouldBeOnPage);

Then('I wait for {int} seconds', { timeout: 60 * 1000 }, wait);


