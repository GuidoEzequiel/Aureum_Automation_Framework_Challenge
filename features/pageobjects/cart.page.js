const BasePage = require('./base.page');
const { $ } = require('@wdio/globals');
const itemSelectors = require('../utility/itemSelectors');
const { expect: expectWDIO } = require('@wdio/globals');

//sub page containing specific selectors and methods for a specific page
class CartPage extends BasePage {

    get checkoutButton() {
        return $('#checkout');
    }

    // Method to verify a comma-separated list of items is visible in the cart
    async verifyItemsAdded(itemsList) {
        const items = super.splitPassedItems(itemsList);
        for (const itemName of items) {
            const itemElement = $(itemSelectors[itemName]);
            if (!itemElement) {
                throw new Error(`Element not found for item "${itemName}"`);
            }
            await expectWDIO(itemElement).toBeDisplayed();
        }
    }

    async proceedToCheckout () {
        await this.checkoutButton.click();
    }

}

module.exports = new CartPage();
