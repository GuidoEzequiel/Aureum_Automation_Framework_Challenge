const BasePage = require('./base.page');
const { $ } = require('@wdio/globals');


//sub page containing specific selectors and methods for a specific page
class CheckoutStepOnePage extends BasePage {

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

    get continueButton () {
        return $('#continue');
    }

    async fillUserInformation () {
        await this.firstNameInput.setValue("FirstName");
        await this.lastNameInput.setValue("LastName");
        await this.postalCodeInput.setValue("1991");
    }

    async continueWithCheckout () {
        await this.continueButton.click();
    }

}

module.exports = new CheckoutStepOnePage();
