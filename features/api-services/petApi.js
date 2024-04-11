const FormData = require('form-data');
const path = require('path');
const fs = require('fs');
const qs = require('qs');
const BaseApi = require('./baseApi');

class PetApi extends BaseApi{
    constructor() {
        super("/pet");
        this.serviceUrl = this.url;
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
            const response = await this.postForm(`${this.serviceUrl}/${petId}/uploadImage`, form, {
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
                id: id,
                name: name,
                status: status
            };
            return await this.post(this.serviceUrl, petData);
        } catch (error) {
            console.error("Error adding new pet: ", error);
            return { success: false, error: error.message };
        }
     }

    // Method to update an existing pet.
    async updatePet(petData) {
        try {
            return await this.put(this.serviceUrl, petData);
        } catch (error) {
            console.error("Error updating pet:", error.message);
            return { success: false, error: error.message };
        }
    }

    async findPetsByStatus(statuses) {
        try {
            // Enconding to avoid URL query issues.
            const encodedStatuses = statuses.split(',').map(s => encodeURIComponent(s)).join(',');
            const response = await this.get(`${this.serviceUrl}/findByStatus`, {
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
            return await this.get(`${this.serviceUrl}/${petId}`);
        } catch (error) {
            console.error(`Error finding pet by ID ${petId}:`, error);
            return { success: false, error: error.message };
        }
    }

    async updatePetWithFormData(petId, formData) {
        try {
            // Convert the formData object to URL-encoded string
            const formBody = qs.stringify(formData);

            return await this.postForm(`${this.serviceUrl}/${petId}`, formBody);
        } catch (error) {
            console.error("Error updating pet with form data:", error);
            return { success: false, error: error.message };
        }
    }

    async deletePet(petId) {
        try {
            return await this.delete(`${this.serviceUrl}/${petId}`);
        } catch (error) {
            console.error('Error:', error.message);
            if (error.response) {
                return error.response;
            }
            throw error;
        }
    }

    async ensurePetExists(petId, petData) {
        try {
            petData.id = parseInt(petId);
            // Attempt to find the pet by ID
            const findResponse = await this.findPetById(petId);

            // If the pet is found or successfully retrieved, return the response
            if (findResponse.success && findResponse.data) {
                return findResponse;
            }

            // If the pet is not found, create it using the provided template
            const createResponse = await this.addPet(petData.id, petData.name, petData.status);
            if (createResponse.success && createResponse.data) {
                return createResponse;
            } else {
                // Handle failure to create a new pet
                const errorMessage = createResponse.error || 'Unknown error occurred while creating pet';
                throw new Error(errorMessage);
            }
        } catch (error) {
            // Log the error and return a failed response
            console.error(`Error in ensurePetExists: ${error.message}`, error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = PetApi;