const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const qs = require('qs');
const BaseApi = require('./baseApi');
const assert = require('assert');


class UserApi extends BaseApi{
    constructor() {
        super("/user");
        this.serviceUrl = this.url;
    }

    // User endpoints
    async createUserWithList(userList) {
        try {
            // Enconding to avoid URL query issues.
            // const encodedUsers = userList.split(',').map(s => encodeURIComponent(s)).join(',');
            // console.log("encodedUsers", encodedUsers);

            // const response = await this.post(`${this.serviceUrl}/findByStatus`, {
            //     params: { users: encodedUsers }
            // });
            
            const response = await this.post(`${this.serviceUrl}/createWithList`, userList);
            return response;

        } catch (error) {
            console.error("Error finding users with a list:", error);
            return { success: false, error: error.message };
        }
    }

    async getUserByUsername(username) {
        try {
            return await this.jsonClient.get(`${this.serviceUrl}/${username}`);
        } catch (error) {
            console.error("Error getting user by name:", error);
            return { success: false, error: error.message };
        }
    }

    async getUserByUsername(username) {
        try {
            return await this.jsonClient.get(`${this.serviceUrl}/${username}`);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // User not found, not an error in this workflow.
                return { success: false, data: null, error: 'User not found' };
            }
            // Log other errors and return a failure response
            console.error("Error getting user by name:", error);
            return { success: false, error: error.message };
        }
    }

    async updateUser(username, userData) {
        try {
            return await this.jsonClient.put(`${this.serviceUrl}/${username}`, userData);
        } catch (error) {
            console.error("Error Updating user:", error);
            return { success: false, error: error.message };
        }
    }

    async deleteUser(username) {
        try {
            return await this.jsonClient.delete(`${this.serviceUrl}/${username}`);
        } catch (error) {
            console.error("Error deleting user:", error);
            return { success: false, error: error.message };
        }
    }

    async loginUser(username, password) {
        try {
            return await this.jsonClient.get(`${this.serviceUrl}/login?username=${username}&password=${password}`);
        } catch (error) {
            console.error("Error attempting to login:", error);
            return { success: false, error: error.message };
        }
    }

    async logoutUser() {
        try {
            return await this.jsonClient.get(`${this.serviceUrl}/logout`);
        } catch (error) {
            console.error("Error attempting to logout:", error);
            return { success: false, error: error.message };
        }
    }

    async createUserWithArray(userArray) {
        try {
            return await this.jsonClient.post(`${this.serviceUrl}/createWithArray`, userArray);
        } catch (error) {
            console.error("Error while attempting to create user with Array:", error);
            return { success: false, error: error.message };
        }
    }

    async createUser(userData) {
        try {
            return await this.jsonClient.post(this.serviceUrl, userData);
        } catch (error) {
            console.error("Error while attempting to create user:", error);
            return { success: false, error: error.message };
        }
    }

    createUsersCollectionFromUserNames(usernamesString) {
         // Split the string into individual usernames.
        const usernames = usernamesString.split(',');
        //Creates users list.
        return usernames.map((username, index) => {
            return {
                id: index, // Incremental ID to provide different data.
                username: username.trim(), // Trim whitespace.
                firstName: `Template FirstName${index}`,
                lastName: `Template LastName${index}`,
                email: `${username}${index}@example.com`,
                password: `Template Password${index}`,
                phone: `Template Phone${index}`,
                userStatus: 0
            };
        });
    }

    async ensureUsernameExists(username, userData) {
        try {
            // Attempt to get username.
            const usernameResponse = await this.getUserByUsername(username);
            // If the username is found or successfully retrieved, return the response.
            if (usernameResponse.success && usernameResponse.data) {
                return usernameResponse;
            }
            // If the username is not found, create it using the provided template.
            userData.username = username;
            const createResponse = await this.createUser(userData);
            if (createResponse.success && createResponse.data) {
                return createResponse;
            } else {
                // Handle failure to get username.
                const errorMessage = createResponse.error || 'Unknown error occurred while getting username';
                throw new Error(errorMessage);
            }
        } catch (error) {
            // Log the error and return a failed response.
            console.error(`Error in ensureUsernameExists: ${error.message}`, error);
            return { success: false, error: error.message };
        }
    }

    createUserData(updatedUserInfo) {
        return {
            username: updatedUserInfo.updatedUserName,
            firstName: updatedUserInfo.updatedFirstName,
            lastName: updatedUserInfo.updatedLastName,
            email: updatedUserInfo.updatedEmail,
            password: updatedUserInfo.updatedPassword,
            phone: updatedUserInfo.updatedPhone,
            // Add any additional fields that your API may require for a user update
        };
    }

    

    async createUsersWithArray(usersArray) {
        try {
            const response = await this.post(`${this.serviceUrl}/createWithArray`, usersArray);
            return { success: true, data: response.data, status: response.status };
        } catch (error) {
            console.error("Error creating users with an array:", error);
            return { success: false, error: error.message, status: error.response ? error.response.status : null };
        }
    }

    createUserArrayFromUserNames(usernamesString) {
        // Split the string into individual usernames.
        const usernames = usernamesString.split(',');
        // Creates users array.
        return usernames.map((username, index) => {
            return {
                id: index + 1, // Incremental ID to provide unique data.
                username: username.trim(),
                firstName: `Template FirstName${index + 1}`,
                lastName: `Template LastName${index + 1}`,
                email: `${username.trim()}${index + 1}@example.com`,
                password: `Template Password${index + 1}`,
                phone: `Template Phone${index + 1}`,
                userStatus: 1 
            };
        });
    }
}

module.exports = UserApi;