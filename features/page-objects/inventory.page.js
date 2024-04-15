const BasePage = require('./base.page');
const { $ } = require('@wdio/globals');

class InventoryPage extends BasePage {

    // Map between item names and button locators.
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

    get itemNamesList () {
        return $$('div[class="inventory_item_name "]');
    }

    get itemPricesList () {
        return $$('div[class="inventory_item_price"]');
    }

    // Adds items to Cart based on item names passed on Feature file.
    async addItemsToCart(itemsList) {
        const items = super.splitPassedItems(itemsList);
        // Adds item to cart based on elements passed on Feature file.
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

    //Sorts Items based on criteria passed on Feature file.
    async sortItemsBy (criteria) {
        let visibleText;

        switch (criteria) {
            case 'Price':
                visibleText = 'Price (high to low)';
                break;
            case 'Name':
                visibleText = 'Name (Z to A)';
                break;
            default:
                throw new Error(`Sorting criteria "${criteria}" is not implemented.`);
        }
        await this.productSortContainer.selectByVisibleText(visibleText);
    }

    //Helper method to get
    async fetchItemDetails() {
        // Get all the item names.
        const itemNamesList = await this.itemNamesList;
        const names = [];
        for (const itemName of itemNamesList) {
            names.push(await itemName.getText());
        }

        // Get all the item prices and convert to numbers.
        const itemPricesList = await this.itemPricesList;
        const prices = [];
        for (const itemPrice of itemPricesList) {
            const priceText = await itemPrice.getText();
            // Remove the currency symbol and convert to number.
            const priceNumber = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            prices.push(priceNumber);
        }

        // Creates a map of names to prices.
        const items = names.map((name, index) => ({
            name: name,
            price: prices[index]
        }));

        return items;
    }

    async verifySortedItems (criteria) {
        // Fetches text from item elements and compares their order.
        const items = await this.fetchItemDetails();
        let sorted;

        // Sort items locally to later compare to actual sorted items in the web site.
        switch (criteria) {
            case 'Price':
                sorted = items.slice().sort((a, b) => b.price - a.price);
                break;
            case 'Name':
                sorted = items.slice().sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                throw new Error(`Verification criteria "${criteria}" is not implemented.`);
        }

        // Compares locally sorted items to website indexes to check if items have been ordered correctly. 
        for (let i = 0; i < items.length; i++) {
            if (items[i].name !== sorted[i].name || items[i].price !== sorted[i].price) {
                throw new Error('Items are not sorted correctly.');
            }
        }
    }
}

module.exports = new InventoryPage();
