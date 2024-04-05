const BasePage = require('./base.page');
const { $ } = require('@wdio/globals');

//sub page containing specific selectors and methods for a specific page
class InventoryPage extends BasePage {

    // Define selectors directly related to the inventory page
    buttonSelectors = {
        backpack: '#add-to-cart-sauce-labs-backpack',
        bikeLight: '#add-to-cart-sauce-labs-bike-light',
        tShirt: '#add-to-cart-sauce-labs-bolt-t-shirt',
        jacket: '#add-to-cart-sauce-labs-fleece-jacket',
        onesie: '#add-to-cart-sauce-labs-onesie',
        redTShirt: '#add-to-cart-test.allthethings()-t-shirt-(red)',
    };
    
    get shoppingCartContainer () {
        return $('#shopping_cart_container');
    }

    get productSortContainer () {
        return $('select[class="product_sort_container"]');
    }

    //A method to encapsule automation code to interact with the page.
    //e.g. to login using username and password.

    async addItemsToCart(itemsList) {
        const items = super.splitPassedItems(itemsList);
        for (const itemName of items) {
            const itemElement = this.buttonSelectors[itemName];
            if (!itemElement) {
                throw new Error(`Selector for item "${itemName}" not found`);
            }
            await (await $(itemElement)).click();
        }
    }
    
    async proceedToCart () {
        await this.shoppingCartContainer.click();
    }

    async sortItemsBy (criteria) {
        //await this.productSortContainer.click();
        await this.productSortContainer.selectByVisibleText(criteria);
    }

    async verifySortedItems (criteria) {
        // Implement the logic to verify that the items are sorted correctly
        // This might involve fetching text from item elements and comparing their order
        await this.productSortContainer.click();
    }

}

module.exports = new InventoryPage();
