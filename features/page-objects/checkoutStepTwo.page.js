const BasePage = require('./base.page');
const itemSelectors = require('../utility/itemSelectors');
const { $ } = require('@wdio/globals');
const { expect: expectWDIO } = require('@wdio/globals');

class CheckoutStepTwoPage extends BasePage {

    get finishCheckout () {
        return $('#finish');
    }

    // Verifies items have been added correctly before chekout is finished.
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

    // Finishes checkout process.
    async finishCheckoutProcess() {
        await this.finishCheckout.click();
    }

}

module.exports = new CheckoutStepTwoPage();
