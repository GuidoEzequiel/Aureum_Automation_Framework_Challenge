const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const qs = require('qs');

// Create the Axios instance only once
let response;
let petId;

class StoreApi {
    constructor() {
        this.baseURL = 'https://petstore.swagger.io/v2/store';

        // Default client for JSON
        this.jsonClient = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Separate client for form data
        this.formClient = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    // Pet endpoints.
    // Store endpoints.
    async getInventory() {
        try {
            return await this.jsonClient.get(`${this.storeBasePath}/inventory`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async placeOrder(orderData) {
        try {
            return await this.jsonClient.post(`${this.storeBasePath}/order`, orderData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getOrderById(orderId) {
        try {
            return await this.jsonClient.get(`${this.storeBasePath}/order/${orderId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteOrder(orderId) {
        try {
            return await this.jsonClient.delete(`${this.storeBasePath}/order/${orderId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = StoreApi;