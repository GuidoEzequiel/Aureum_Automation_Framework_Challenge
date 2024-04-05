const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')

const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutStepOne = require('../pageobjects/checkoutStepOne.page');
const CheckoutStepTwo = require('../pageobjects/checkoutStepTwo.page');
const CheckoutComplete = require('../pageobjects/checkoutComplete.page');

Given('I am on the login page', async () => {
    await LoginPage.open();
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password);
});

Then('I add an item to the cart', async () => {
    await InventoryPage.addItemToCart();
});

Then('I proceed to the cart page', async () => {
    await InventoryPage.proceedToCart();
});

Then('I see the item has been added correctly', async () => {
    await CartPage.verifyItemAdded();
});