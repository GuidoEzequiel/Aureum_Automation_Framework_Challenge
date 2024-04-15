const BasePage = require('./base.page');
const { $ } = require('@wdio/globals');
const visitDirectChildren = require('../utility/bonusUtility');

class BonusPage extends BasePage {
    constructor() {
        super('bonusURL');
    }

    get parentElement () {
        return $('body');
    }

    // Define the callback function to log element details.
    async logElementDetailsCallback(element) {
        const tagName = await element.getTagName();
        const elementId = await element.getAttribute('id');
        const elementClass = await element.getAttribute('class');
        
        console.log(`Element Tag: ${tagName}`);
        if (elementId) {
            console.log(`Element ID: ${elementId}`);
        }
        if (elementClass) {
            console.log(`Element Class: ${elementClass}`);
        }
    }

    async visitChildrenOfParent(){
        await visitDirectChildren(this.parentElement, this.logElementDetailsCallback);
    }
}

module.exports = new BonusPage();