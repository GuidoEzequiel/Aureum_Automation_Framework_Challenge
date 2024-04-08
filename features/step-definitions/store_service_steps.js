const { setWorldConstructor, Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const StoreApi = require('../services/storeApi');

class StoreWorld {
    constructor() {
        this.storeApi = new StoreApi();
        this.response = null;
        this.storeData = {
            id: 0,
            petId: 0,
            quantity: 0,
            shipDate: "2024-04-08T14:00:48.632Z",
            status: "placed",
            complete: true
        };
    }
}

storeWorld = new StoreWorld();

setWorldConstructor(storeWorld);

Given('I request the inventory status counts', async function () {
    console.log("Llegó al Primer Given");
    console.log(this.storeApi);

    console.log("World: ");
    console.log(storeWorld);
    console.log(setWorldConstructor(storeWorld));

    this.response = await this.storeApi.logs();
 
    //this.response = await this.storeApi.something();
});

Then('the response body should be a map of status counts', async function () {
    assert.strictEqual(typeof this.response.data, 'object', 'Expected response body to be an object');
    Object.values(this.response.data).forEach(value => {
        assert.strictEqual(typeof value, 'number', `Expected each inventory status count to be a number, but got ${typeof value}`);
    });
});

Then('the response body should reflect the placed order', function () {
    assert.deepStrictEqual(this.response.data, this.orderDetails);
});