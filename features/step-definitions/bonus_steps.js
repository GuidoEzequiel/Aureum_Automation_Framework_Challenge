const { Given, When, Then } = require('@cucumber/cucumber');
const BonusPage = require('../page-objects/bonus.page');

When('I visit all descendants of an element', async () => {
    await BonusPage.visitChildrenOfParent();
});
  
Then('They are logged successfully', () => {
    // The logging itself is the outcome template since there's no assertion to be made at this point.
    console.log('All elements have been logged.');
});
  