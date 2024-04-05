const { browser } = require('@wdio/globals')

//main page object containing all methods, selectors and functionality
//that is shared across all page objects
module.exports = class BasePage {
    //Opens a sub page of the page
    //@param path path of the sub page (e.g. /path/to/page.html)
    
   //Opens the Login page.
    open () {
        return browser.url(`https://www.saucedemo.com/`)
    }

    splitPassedItems(itemsList){
        return itemsList.split(',').map(item => item.trim());
    }
}
