const BaseApi = require('./baseApi');
const assert = require('assert');

class StoreApi extends BaseApi{
    constructor() {
        super("/store");
        this.serviceUrl = this.url;
    }

    async getInventory() {
        try {
            return await this.get(`${this.serviceUrl}/inventory`);
        } catch (error) {
            console.error("Error getting inventory items:", error.message);
            return { success: false, error: error.message };
        }
    }

    async placeOrder(orderData) {
        try {
            return await this.post(`${this.serviceUrl}/order`, orderData);
        } catch (error) {
            console.error("Error placing order:", error.message);
            return { success: false, error: error.message };
        }
    }

    async getOrderById(orderId) {
        try {
            return await this.get(`${this.serviceUrl}/order/${orderId}`);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Order not found, not an error in this workflow.
                return { success: false, data: null, error: 'Order Id not found' };
            }
            console.error("Error getting order by Id:", error.message);
            return { success: false, error: error.message };
        }
    }

    async deleteOrder(orderId) {
        try {
            return await this.delete(`${this.serviceUrl}/order/${orderId}`);
        } catch (error) {
            console.error("Error deleting order by Id:", error.message);
            return { success: false, error: error.message };
        }
    }

    async compareOrderResponseWithOrderData(orderResponse, orderDetails){
        assert.deepStrictEqual(orderResponse, orderDetails);
    }

    async ensureOrderIdExists(orderId, orderData) {
        try {
            orderData.id = orderId;

            const orderIdResponse = await this.getOrderById(orderId);

            // If the order id is found or successfully retrieved, return the response
            if (orderIdResponse.success && orderIdResponse.data) {
                return orderIdResponse;
            }

            // If the order id is not found, create it using the provided template
            const createResponse = await this.placeOrder(orderData);
            if (createResponse.success && createResponse.data) {
                return createResponse;
            } else {
                // Handle failure to get order id.
                const errorMessage = createResponse.error || 'Unknown error occurred while getting order data';
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(`Error in ensureOrderIdExists: ${error.message}`, error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = StoreApi;