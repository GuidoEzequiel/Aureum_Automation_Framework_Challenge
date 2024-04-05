const BasePage = require('./base.page');
const { $ } = require('@wdio/globals');
const { expect: expectWDIO } = require('@wdio/globals');

//sub page containing specific selectors and methods for a specific page
class CheckoutCompletePage extends BasePage {

    // Checkout Complete Page Locators.
    get checkoutCompleteContainer () {
        return $('#checkout_complete_container');
    }

    // Checkout Complete Page Methods.

    // Verifies the order was sucessfull by looking for the container that has the order complete information.
    async verifyOrderSuccessful() {
        await expectWDIO(this.checkoutCompleteContainer).toBeDisplayed();
    }
}

module.exports = new CheckoutCompletePage();
