const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../page-objects/login.page');
const InventoryPage = require('../page-objects/inventory.page');
const CartPage = require('../page-objects/cart.page');
const CheckoutStepOnePage = require('../page-objects/checkoutStepOne.page');
const CheckoutStepTwoPage = require('../page-objects/checkoutStepTwo.page');
const CheckoutCompletePage = require('../page-objects/checkoutComplete.page');

Given('I am on the login page', async () => {
    await LoginPage.open();
});

Given(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password);
});

When(/^I add the ([^"]*) to the cart$/, async function (itemsList) {
    await InventoryPage.addItemsToCart(itemsList);
});

When('I proceed to the cart page', async () => {
    await InventoryPage.proceedToCart();
});

Then(/^the ([^"]*) should be visible in the cart$/, async function (itemsList) {
    await CartPage.verifyItemsAdded(itemsList);
});

When('I move on to the checkout', async () => {
    await CartPage.proceedToCheckout();
});

When('I fill user information', async () => {
    await CheckoutStepOnePage.fillUserInformation();
});

When('I continue the checkout', async () => {
    await CheckoutStepOnePage.continueWithCheckout();
});

When(/^I verify checkout ([^"]*)$/, async (itemsList) => {
    await CheckoutStepTwoPage.verifyCheckoutItems(itemsList);
});

When('I finish checkout process', async () => {
    await CheckoutStepTwoPage.finishCheckoutProcess();
});

When('I see the order has been confirmed', async () => {
    await CheckoutCompletePage.verifyOrderSuccessful();
});

Then(/^I sort items by ([^"]*)$/, async (criteria) => {
    await InventoryPage.sortItemsBy(criteria);
});

Then(/^I see sorted items by ([^"]*)$/, async (criteria) => {
    await InventoryPage.verifySortedItems(criteria);
});

When('I send a request to delete the pet', async function () {
    this.response = await petStoreApi.deletePet(this.petId);
});