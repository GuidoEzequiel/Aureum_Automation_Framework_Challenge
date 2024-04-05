const { $ } = require('@wdio/globals')
const BasePage = require('./base.page');
const { expect: expectWDIO } = require('@wdio/globals');

//sub page containing specific selectors and methods for a specific page
class CartPage extends BasePage {

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

    async verifyItemAdded () {
        await expectWDIO(this.backpackCartItem).toBeDisplayed();
    }

}

module.exports = new CartPage();
