const { setWorldConstructor, Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const UserApi = require('../services/userApi');
const path = require('path');

class CustomWorld {
    constructor() {
        this.userApi = new UserApi();
        this.response = null;
        this.userData = {
            id: 0,
            username: "string",
            firstName: "string",
            lastName: "string",
            email: "string",
            password: "string",
            phone: "string",
            userStatus: 0
          };
    }
}

setWorldConstructor(CustomWorld);

Given(/^I add a new pet with ([^"]*), ([^"]*), and ([^"]*)$/, async function (id, name, status) {
    this.response = await this.petApi.addPet(id, name, status);
});

