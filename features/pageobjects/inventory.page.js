const { $ } = require('@wdio/globals')
const BasePage = require('./base.page');

//sub page containing specific selectors and methods for a specific page
class InventoryPage extends BasePage {

    // Define selectors using getter methods
    get addBackpackToCartButton () {
        return $('#add-to-cart-sauce-labs-backpack');
    }

    get addBikeLightsToCartButton () {
        return $('#add-to-cart-sauce-labs-bike-light');
    }

    get addTShirtToCartButton () {
        return $('#add-to-cart-sauce-labs-bolt-t-shirt');
    }

    get addJacketToCartButton () {
        return $('#add-to-cart-sauce-labs-fleece-jacket');
    }

    get addOnesieToCartButton () {
        return $('#add-to-cart-sauce-labs-onesie');
    }

    get addRedTShirtToCartButton () {
        return $('#add-to-cart-test.allthethings()-t-shirt-(red)');
    }
    
    get shoppingCartButton () {
        return $('#shopping_cart_container');
    }

    get productSortContainer () {
        return $('#select[class="product_sort_container"]');
    }

    //A method to encapsule automation code to interact with the page.
    //e.g. to login using username and password.
    async addItemToCart () {
        await this.addBackpackToCartButton.click();
        console.log("Clicked the Backpack");
    }
    
    async proceedToCart () {
        await this.shoppingCartButton.click();
    }

    async sortItemsBy (criteria) {
        await this.productSortContainer.click();

    }

}

module.exports = new InventoryPage();
