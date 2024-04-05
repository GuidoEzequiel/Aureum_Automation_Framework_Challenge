const { $ } = require('@wdio/globals')
const BasePage = require('./base.page');

//sub page containing specific selectors and methods for a specific page
class CheckoutComplete extends BasePage {

    // Define selectors using getter methods
    get checkoutCompleteContainer () {
        return $('#checkout_complete_container');
    }
}

module.exports = new CheckoutComplete();
