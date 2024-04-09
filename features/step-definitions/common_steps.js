const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const path = require('path');

 Then(/^the response code should be ([^"]*)$/, function (responseCode) {
     const expectedStatusCode = parseInt(responseCode);
     assert.strictEqual(this.response.status, expectedStatusCode, `Expected status code ${expectedStatusCode}, got ${this.response.status}`);
});