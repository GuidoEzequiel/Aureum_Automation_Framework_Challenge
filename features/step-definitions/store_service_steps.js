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

Given('the order details for a pet with {int} and {int}', function (petId, quantity) {
    this.orderDetails.petId = petId;
    this.orderDetails.quantity = quantity;
});

When('I place an order for the pet', async function () {
    this.response = await this.storeApi.placeOrder(this.orderDetails);
});

Then('the response body should reflect the placed order', function () {
    this.storeApi.compareOrderResponseWithOrderData();
});

Given('I ensure an order with {int} exists', async function(orderId) {
    this.response = await this.storeApi.ensureOrderIdExists(orderId, this.orderDetails);
});

When('I retrieve the order by ID', async function() {
    this.response = await this.storeApi.getOrderById(this.orderDetails.id);
});

When('I delete the order by ID', async function() {
    this.response = await this.storeApi.deleteOrder(this.orderDetails.id);
});

Then('the response body should reflect the retrieved order', function() {
    const responseBody = this.response.data;

    assert.strictEqual(responseBody.id, this.orderDetails.id);
    assert.strictEqual(responseBody.petId, this.orderDetails.petId);
    assert.strictEqual(responseBody.quantity, this.orderDetails.quantity);
    assert.strictEqual(responseBody.status, this.orderDetails.status);
    assert.strictEqual(responseBody.complete, this.orderDetails.complete);
});