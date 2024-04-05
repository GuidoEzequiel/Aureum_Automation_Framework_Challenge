const BasePage = require('./base.page');
const { $ } = require('@wdio/globals');
const { expect: expectWDIO } = require('@wdio/globals');

//sub page containing specific selectors and methods for a specific page
class CheckoutCompletePage extends BasePage {

    // Define selectors using getter methods
    get checkoutCompleteContainer () {
        return $('#checkout_complete_container');
    }

    async verifyOrderSuccessful() {
        await expectWDIO(this.checkoutCompleteContainer).toBeDisplayed();
    }

}

module.exports = new CheckoutCompletePage();
