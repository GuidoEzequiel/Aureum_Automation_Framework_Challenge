const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const qs = require('qs');

// Create the Axios instance only once
let response;
let petId;

class PetStoreApi{
    constructor() {
        this.baseURL = 'https://petstore.swagger.io/v2';
        this.petBasePath = '/pet';
        this.storeBasePath = '/store';
        this.userBasePath = '/user';

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
    async uploadImage(petId, imagePath) {
        try {
            
            // Create a new FormData instance to hold the file data for upload.
            const form = new FormData();

            // Read the image file into a buffer.
            const imageBuffer = fs.readFileSync(imagePath);
            
            // Append the file to the form data. 'file' is the field name expected by the API.
            // The options object includes the filename and content type of the file.
            form.append('file', imageBuffer, {
                filename: path.basename(imagePath),
                contentType: 'image/jpeg',
            });
            
            // Get the headers that need to be sent with the form data.
            const formHeaders = form.getHeaders();
            
            // Make an HTTP POST request to the pet's uploadImage endpoint with the form data.
            // Spread the form headers into the headers object of the request.
            const response = await this.jsonClient.post(`${this.petBasePath}/${petId}/uploadImage`, form, {
                headers: { ...formHeaders },
            });
            
            return response;
        } catch (error) {
            // Handles error cases.
            console.error("Error uploading pet image:", error.message);
            return { success: false, error: error.message };
        }
    }

    async addPet(id, name, status) {
        try {
            const petData = {
                id: parseInt(id),
                name: name,
                status: status
            };
            petId = id;

            return await this.jsonClient.post(this.petBasePath, petData);
        } catch (error) {
            console.error("Error adding new pet:", error);
            return { success: false, error: error.message };
        }
     }

    // Method to update an existing pet.
    async updatePet(petData) {
        try {
            return await this.jsonClient.put(this.petBasePath, petData);
        } catch (error) {
            console.error("Error updating pet:", error.message);
            return { success: false, error: error.message };
        }
    }

    async findPetsByStatus(statuses) {
        try {
            // Enconding to avoid URL query issues.
            const encodedStatuses = statuses.split(',').map(s => encodeURIComponent(s)).join(',');
            const response = await this.jsonClient.get(`${this.petBasePath}/findByStatus`, {
                params: { status: encodedStatuses }
            });
            return response;
        } catch (error) {
            console.error("Error finding pets by status:", error);
            return { success: false, error: error.message };
        }
    }

    async findPetById(petId) {
        try {
            return await this.jsonClient.get(`${this.petBasePath}/${petId}`);
        } catch (error) {
            console.error(`Error finding pet by ID ${petId}:`, error);
            return { success: false, error: error.message };
        }
    }

    async updatePetWithFormData(petId, formData) {
        try {
            // Convert the formData object to URL-encoded string
            const formBody = qs.stringify(formData);

            return await this.formClient.post(`${this.petBasePath}/${petId}`, formBody);
        } catch (error) {
            console.error("Error updating pet with form data:", error);
            return { success: false, error: error.message };
        }
    }

    async deletePet(petId) {
        try {
            return await this.jsonClient.delete(`${this.petBasePath}/${petId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }



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

    // User endpoints
    async createUserWithList(userList) {
        try {
            return await this.jsonClient.post(`${this.userBasePath}/createWithList`, userList);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserByUsername(username) {
        try {
            return await this.jsonClient.get(`${this.userBasePath}/${username}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateUser(username, userData) {
        try {
            return await this.jsonClient.put(`${this.userBasePath}/${username}`, userData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteUser(username) {
        try {
            return await this.jsonClient.delete(`${this.userBasePath}/${username}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async loginUser(username, password) {
        try {
            return await this.jsonClient.get(`${this.userBasePath}/login?username=${username}&password=${password}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async logoutUser() {
        try {
            return await this.jsonClient.get(`${this.userBasePath}/logout`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createUserWithArray(userArray) {
        try {
            return await this.jsonClient.post(`${this.userBasePath}/createWithArray`, userArray);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createUser(userData) {
        try {
            return await this.jsonClient.post(this.userBasePath, userData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = PetStoreApi;