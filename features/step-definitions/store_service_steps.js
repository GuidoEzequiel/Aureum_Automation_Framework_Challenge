const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('I request the inventory status counts', async function () {
    this.response = await this.storeApi.getInventory();
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