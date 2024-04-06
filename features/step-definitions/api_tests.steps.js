const { setWorldConstructor, Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const PetStoreApi = require('../api/petStoreApi');
const path = require('path');

class CustomWorld {
    constructor() {
        this.petStoreApi = new PetStoreApi();
        this.response = null;
        this.petData = null;
    }
}

setWorldConstructor(CustomWorld);

// POST - 
Given(/^I add a new pet with ([^"]*), ([^"]*), and ([^"]*)$/, async function (id, name, status) {
    this.response = await this.petStoreApi.addPet(id, name, status);
    console.log("this.response: " + this.response );
});

Then(/^the response code should be ([^"]*)$/, function (responseCode) {
    const expectedStatusCode = parseInt(responseCode, 10);
    console.log("expectedStatusCode: " + expectedStatusCode );
    console.log("this.response.status: " + this.response.status );
    assert.strictEqual(this.response.status, expectedStatusCode, `Expected status code ${expectedStatusCode}, got ${this.response.status}`);
});

When(/^I upload an image for the pet with ([^"]*)$/, async function (id) {
    const imagePath = path.join(__dirname, '..', 'images', 'petsImage.jpg');
    this.response = await this.petStoreApi.uploadImage(id, imagePath);
    console.log("this.response: " + this.response );
});

Then('the response message should confirm the image upload', function () {
    assert.ok(this.response.statusText.includes('OK'), 'Image upload confirmation text not found in the response message');
});

Given(/^I attempt to add a new pet with ([^"]*), ([^"]*), and ([^"]*)$/, async function (id, name, status) {
    const petData = {
        id: parseInt(id),
        name,
        status,
        // Assuming photoUrls is required, sends an empty array to omit the field
        photoUrls: [],
    };
    try {
        response = await API.addPet(petData);
        petId = id;
    } catch (error) {
        // If the API call throws an error (e.g., due to a 405 response), store the error response
        response = error.response;
        console.log("Response error: " + reponse);
    }
});