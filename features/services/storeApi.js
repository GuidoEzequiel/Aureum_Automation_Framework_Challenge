const FormData = require('form-data');
const path = require('path');
const fs = require('fs');
const qs = require('qs');
const ApiServices = require('./apiServices');
const Environment = require('../environment/environment');

class StoreApi {
    
    constructor() {
        this.apiServices = new ApiServices();
        this.storeUrl = Environment.storeUrl;
    }

    async logs(){
        console.log("Dentro del Log Method");
    }
    
    // Store endpoints.
    async something() {
        console.log("Llegó al getInve");

        try {
            return await this.apiServices.get(`${this.storeUrl}/inventory`);
        } catch (error) {
            console.error("Error getting inventory items:", error.message);
            return { success: false, error: error.message };
        }
    }

    async placeOrder(orderData) {
        try {
            return await this.apiServices.post(`${this.storeUrl}/order`, orderData);
        } catch (error) {
            console.error("Error placing order:", error.message);
            return { success: false, error: error.message };
        }
    }

    async getOrderById(orderId) {
        try {
            return await this.apiServices.get(`${this.storeUrl}/order/${orderId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteOrder(orderId) {
        try {
            return await this.apiServices.delete(`${this.storeUrl}/order/${orderId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = StoreApi;