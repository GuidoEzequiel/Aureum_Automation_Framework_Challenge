const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Create the Axios instance only once
const apiClient = axios.create({
    baseURL: 'https://petstore.swagger.io/v2',
});

let response;
let petId;

class PetStoreApi{

    constructor() {
        // Define base paths for different sections.
        this.petBasePath = '/pet';
        this.storeBasePath = '/store';
        this.userBasePath = '/user';
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
            const response = await apiClient.post(`${this.petBasePath}/${petId}/uploadImage`, form, {
                headers: { ...formHeaders },
            });
            
            return response;
        } catch (error) {
            // Handles error cases.
            console.error(error);
            throw error;
        }
    }

    async addPet(id, name, status) {
        const petData = {
            id: parseInt(id),
            name,
            status
        };
        petId = id;
        
        return await apiClient.post(this.petBasePath, petData);
     }

    // Method to update an existing pet.
    async updatePet(petData) {
        return await apiClient.put(this.petBasePath, petData);
    }

    async findPetsByStatus(status) {
        return await apiClient.get(`${this.petBasePath}/findByStatus?status=${status}`);
    }

    async findPetsByTags(tags) {
        return await apiClient.get(`${this.petBasePath}/findByTags?tags=${tags}`);
    }

    async getPetById(petId) {
        return await apiClient.get(`${this.petBasePath}/${petId}`);
    }

    async updatePetWithFormData (petId, formData) {
        return await apiClient.post(`${this.petBasePath}/${petId}`, formData);
    }

    async deletePet(petId) {
        try {
            return await apiClient.delete(`${this.petBasePath}/${petId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }




    // Store endpoints
    async getInventory() {
        try {
            return await apiClient.get(`${this.storeBasePath}/inventory`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async placeOrder(orderData) {
        try {
            return await apiClient.post(`${this.storeBasePath}/order`, orderData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getOrderById(orderId) {
        try {
            return await apiClient.get(`${this.storeBasePath}/order/${orderId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteOrder(orderId) {
        try {
            return await apiClient.delete(`${this.storeBasePath}/order/${orderId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // User endpoints
    async createUserWithList(userList) {
        try {
            return await apiClient.post(`${this.userBasePath}/createWithList`, userList);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserByUsername(username) {
        try {
            return await apiClient.get(`${this.userBasePath}/${username}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateUser(username, userData) {
        try {
            return await apiClient.put(`${this.userBasePath}/${username}`, userData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteUser(username) {
        try {
            return await apiClient.delete(`${this.userBasePath}/${username}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async loginUser(username, password) {
        try {
            return await apiClient.get(`${this.userBasePath}/login?username=${username}&password=${password}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async logoutUser() {
        try {
            return await apiClient.get(`${this.userBasePath}/logout`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createUserWithArray(userArray) {
        try {
            return await apiClient.post(`${this.userBasePath}/createWithArray`, userArray);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createUser(userData) {
        try {
            return await apiClient.post(this.userBasePath, userData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = PetStoreApi;