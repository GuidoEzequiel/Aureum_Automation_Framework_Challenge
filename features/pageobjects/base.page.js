const { browser } = require('@wdio/globals')

// Base page object containing  methods, selectors and functionality that is shared across all page objects
module.exports = class BasePage {
    // Opens the Login page.
    open () {
        return browser.url(`https://www.saucedemo.com/`)
    }

    splitPassedItems(itemsList){
        return itemsList.split(',').map(item => item.trim());
    }
}
