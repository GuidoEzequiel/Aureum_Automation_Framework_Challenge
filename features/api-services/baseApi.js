const axios = require('axios');
const Environments = require('../environment/environments');
const assert = require('assert');

// Base Api object containing  methods, selectors and functionality that is shared across all Api objects
class BaseApi {
    constructor(serviceFirm){
        this.url = Environments.baseURL + serviceFirm;
        this.createJsonHeader();
        this.createFormHeader();
    }

    createJsonHeader() {
        this.jsonClient = axios.create({
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    createFormHeader() {
        // Separate client for form data
        this.formClient = axios.create({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    async get(path) {
        try {
            return await this.jsonClient.get(path);
        } catch (error) {
            console.error("Error:", error);
            return { success: false, error: error.message };
        }
    }

    async post(path, data) {
        try {
            return await this.jsonClient.post(path, data);
        } catch (error) {
            console.error("Error:", error);
            return { success: false, error: error.message };
        }
    }

    async postForm(path, data) {
        try {
            return await this.formClient.post(path, data);
        } catch (error) {
            console.error("Error:", error);
            return { success: false, error: error.message };
        }
    }

    async put(path, data) {
        try {
            return await this.jsonClient.post(path, data);
        } catch (error) {
            console.error("Error:", error);
            return { success: false, error: error.message };
        }
    }

    async delete(path, data) {
        try {
            return await this.jsonClient.delete(path, data);
        } catch (error) {
            console.error("Error:", error);
            return { success: false, error: error.message };
        }
    }

    async checkStatusCode(expectedCode, response) {
        const expectedStatusCode = parseInt(expectedCode);

        assert.strictEqual(response.status, expectedStatusCode, `Expected status code ${expectedStatusCode}, got ${response.status}`);
    }
}

module.exports = BaseApi;