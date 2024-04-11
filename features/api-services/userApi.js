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
            return await this.jsonClient.post(`${this.serviceUrl}/createWithList`, userList);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserByUsername(username) {
        try {
            return await this.jsonClient.get(`${this.serviceUrl}/${username}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateUser(username, userData) {
        try {
            return await this.jsonClient.put(`${this.serviceUrl}/${username}`, userData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteUser(username) {
        try {
            return await this.jsonClient.delete(`${this.serviceUrl}/${username}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async loginUser(username, password) {
        try {
            return await this.jsonClient.get(`${this.serviceUrl}/login?username=${username}&password=${password}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async logoutUser() {
        try {
            return await this.jsonClient.get(`${this.serviceUrl}/logout`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createUserWithArray(userArray) {
        try {
            return await this.jsonClient.post(`${this.serviceUrl}/createWithArray`, userArray);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createUser(userData) {
        try {
            return await this.jsonClient.post(this.serviceUrl, userData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = UserApi;