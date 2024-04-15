const BasePage = require('./base.page');
const { $ } = require('@wdio/globals');
const { expect: expectWDIO } = require('@wdio/globals');

class CheckoutCompletePage extends BasePage {

    get checkoutCompleteContainer () {
        return $('#checkout_complete_container');
    }

    // Verifies the order was sucessfull by looking for the container that has the order's whole information.
    async verifyOrderSuccessful() {
        await expectWDIO(this.checkoutCompleteContainer).toBeDisplayed();
    }
}

module.exports = new CheckoutCompletePage();
