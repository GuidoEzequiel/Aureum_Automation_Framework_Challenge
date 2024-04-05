const { $ } = require('@wdio/globals')
const BasePage = require('./base.page');

//sub page containing specific selectors and methods for a specific page
class CheckoutStepTwo extends BasePage {

    // Define selectors using getter methods
    get firstNameInput () {
        return $('#first-name');
    }

    get lastNameInput () {
        return $('#last-name');
    }

    get postalCodeInput () {
        return $('#postal-code');
    }
    
    get itemTittle () {
        return $('#item_4_title_link');
    }

}

module.exports = new CheckoutStepTwo();
