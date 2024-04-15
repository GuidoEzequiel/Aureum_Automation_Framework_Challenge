const { browser } = require('@wdio/globals')
const Environments = require('../environment/environments');

// Base page object containing functionality that is shared across all page objects.
class BasePage {
    constructor(pageKey) {
        this.url = Environments[pageKey];
    }

    open () {
        return browser.url(`https://www.saucedemo.com/`)
    }

    splitPassedItems(itemsList){
        return itemsList.split(',').map(item => item.trim());
    }
}

module.exports = BasePage;