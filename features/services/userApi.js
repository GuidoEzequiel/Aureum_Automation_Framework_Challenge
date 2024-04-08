const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const qs = require('qs');
const ApiServices = require('./apiServices');
const Environment = require('../environment/environment');

class UserApi {
    constructor() {
        this.apiServices = new ApiServices();
        this.storeUrl = Environment.userUrl;
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

module.exports = UserApi;