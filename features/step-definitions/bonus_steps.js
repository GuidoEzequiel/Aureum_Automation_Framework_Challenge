const { Given, When, Then } = require('@cucumber/cucumber');
const visitDirectChildren = require('../utility/bonusUtility');

Given('I am on the homepage', async () => {
    await browser.url('https://the-internet.herokuapp.com/'); 
});

When('I visit all descendants of an element', async () => {
    // Select the body element as the starting point.
    const rootElement = await browser.$('body'); 
    
    // Define the callback function to log element details.
    const logElementDetails = async (element) => {
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
    };
    
    // Call the visitElements function with the rootElement and logElementDetails callback.
    await visitDirectChildren(rootElement, logElementDetails);
});
  
Then('They are logged successfully', () => {
    // The logging itself is the outcome template since there's no assertion to be made at this point.
    console.log('All elements have been logged.');
});