const FormData = require('form-data');
const path = require('path');
const fs = require('fs');
const qs = require('qs');
const ApiServices = require('./apiServices');
const Environment = require('../environment/environment');

class BaseApi{
    constructor() {
        this.apiServices = new ApiServices();
        this.url = Environment.baseURL;
    }

    // Base Methods.
    async checkStatusCode(id, name, status) {
        const expectedStatusCode = parseInt(responseCode);
        assert.strictEqual(this.response.status, expectedStatusCode, `Expected status code ${expectedStatusCode}, got ${this.response.status}`);
     }
}

module.exports = BaseApi;