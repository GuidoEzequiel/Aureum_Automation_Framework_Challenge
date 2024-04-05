const BasePage = require('./base.page');
const itemSelectors = require('../utility/itemSelectors');
const { $ } = require('@wdio/globals');
const { expect: expectWDIO } = require('@wdio/globals');

//sub page containing specific selectors and methods for a specific page
class CheckoutStepTwoPage extends BasePage {

    get finishCheckout () {
        return $('#finish');
    }

    // Method to verify a items have been added correctly before chekout is finished.
    // Creates a list of elements based on elements passed from Feature file.
    async verifyCheckoutItems(itemsList) {
        const items = super.splitPassedItems(itemsList);
        for (const itemName of items) {
            const itemElement = $(itemSelectors[itemName]);
            if (!itemElement) {
                throw new Error(`Element not found for item "${itemName}"`);
            }
            await expectWDIO(itemElement).toBeDisplayed();
        }
    }

    async finishCheckoutProcess() {
        await this.finishCheckout.click();
    }

}

module.exports = new CheckoutStepTwoPage();
