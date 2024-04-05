const { $ } = require('@wdio/globals')
const BasePage = require('./base.page');

//sub page containing specific selectors and methods for a specific page
class CheckoutStepTwo extends BasePage {

    // Define selectors using getter methods    
    get backpackCartItem() {
        return $('#item_4_title_link');
    }

    get bikeLightCartItem() {
        return $('#item_0_title_link');
    }

    get tShirtCartItem() {
        return $('#item_1_title_link');
    }

    get jacketCartItem() {
        return $('#item_5_title_link');
    }

    get onesieCartItem() {
        return $('#item_2_title_link');
    }

    get redTShirtCartItem() {
        return $('#item_3_title_link');
    }
    
    get finishCheckout () {
        return $('#finish');
    }
}

module.exports = new CheckoutStepTwo();
