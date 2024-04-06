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

When(/^I send a (.+) request to add a new pet with (.+), (.+), and (.+)$/, async function (method, id, name, status) {
    const petData = {
        id: parseInt(id),
        name,
        status
    };
    // Use the generic method to send the request with a specified method.
    this.response = await this.petStoreApi.sendRequestWithWrongMethod(method, '/pet', petData);
});


// UPDATE -

Given(/^a pet with (\d+)$/, async function (petId) {
    // Convert petId from string to integer.
    petId = parseInt(petId, 10);
    
    // Assuming there is a method to retrieve a pet by ID to check if it exists.
    this.response = await this.petStoreApi.getPetById(petId);
    this.petData = this.response.data; // Store the pet object for later use.
  });
  
When(/^I update the pet (.+) and (.+)$/, async function (name, status) {
    // Update the stored pet object with the new name and status.
    this.petData.name = name;
    this.petData.status = status;

    // Send the update request with the updated pet details.
    this.response = await this.petStoreApi.updatePet(this.pet);
});

Then(/^the response code should be (\d+)$/, function (responseCode) {
    // Convert responseCode from string to integer.
    responseCode = parseInt(responseCode, 10);

    // Assert that the response code is as expected.
    assert.equal(this.response.status, responseCode);
});