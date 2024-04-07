const { setWorldConstructor, Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const PetStoreApi = require('../api/petStoreApi');
const path = require('path');

class CustomWorld {
    constructor() {
        this.petStoreApi = new PetStoreApi();
        this.response = null;
        this.petData = {
            id: 0,
            category: {
                id: 0,
                name: "string"
            },
            name: "string",
            photoUrls: [],
            tags: [{
                id: 0,
                name: "string"
            }],
            status: "string"
        };;
        this.petsStatuses = null;
        this.formData = null;
    }
}

setWorldConstructor(CustomWorld);

// POST - 
Given(/^I add a new pet with ([^"]*), ([^"]*), and ([^"]*)$/, async function (id, name, status) {
    this.response = await this.petStoreApi.addPet(id, name, status);
});

Then(/^the response code should be ([^"]*)$/, function (responseCode) {
    const expectedStatusCode = parseInt(responseCode);
    console.log("this.response.status: " + this.response.status);
    assert.strictEqual(this.response.status, expectedStatusCode, `Expected status code ${expectedStatusCode}, got ${this.response.status}`);
});

When(/^I upload an image for the pet with ([^"]*)$/, async function (id) {
    const imagePath = path.join(__dirname, '..', 'images', 'petsImage.jpg');
    this.response = await this.petStoreApi.uploadImage(id, imagePath);
});

Then('the response message should confirm the image upload', function () {
    assert.ok(this.response.statusText.includes('OK'), 'Image upload confirmation text not found in the response message');
});

// PUT - 
Given(/^a pet with (\d+)$/, async function (petId) {
    // Convert petId from string to integer.
    this.petData.id = petId = parseInt(petId);

    // Assuming there is a method to retrieve a pet by ID to check if it exists.
    this.response = await this.petStoreApi.findPetById(petId);

    // Store the pet object for later use.
    this.petData = this.response.data; 

    // Debugging.
    console.log("this.response.data: " + JSON.stringify(this.response.data, null, 2));
    console.log("this.petData: " + JSON.stringify(this.petData, null, 2));
    console.log("this.petData.id: " + JSON.stringify(this.petData.id, null, 2));
    
    console.log("this.response [status, statusText, data]:", JSON.stringify({
        status: this.response.status,
        statusText: this.response.statusText,
        data: this.response.data,
        id: this.response.data.id
      }, null, 2));
});
  
When(/^I update the pet (.+) and (.+)$/, async function (name, status) {

    // Update the stored pet object with the new name and status. 
    this.petData.name = name;
    this.petData.status = status;
    console.log("this.petData: " + JSON.stringify(this.petData, null, 2));

    // Send the update request with the updated pet details.
    this.response = await this.petStoreApi.updatePet(this.petData);

    // Debugging.
    console.log("this.response:", JSON.stringify({
        status: this.response.status,
        statusText: this.response.statusText,
        data: this.response.data
      }, null, 2));
});

// GET - 
Given(/^I want to find pets with the status (.+)$/, function (statuses) {
    this.petsStatuses = statuses;
});

When('I search for pets by status', async function () {
    this.response = await this.petStoreApi.findPetsByStatus(this.petsStatuses);
});

Then(/^I should receive a list of pets with the status (.+)$/, function (statuses) {
    assert.equal(this.response.status, 200, `Expected status code 200 but received ${this.response.status}`);
    
    // Verify that all pets in the response have the correct status
    const expectedStatuses = statuses.split(',');
    this.petData = this.response.data;

    assert(Array.isArray(this.petData), 'Expected an array of pets');
    
    // If there are pets returned, check their status
    if (this.petData.length > 0) {
        this.petData.forEach(pet => {
            console.log("Entry " + pet.status);
            assert(expectedStatuses.includes(pet.status), `Expected pet status to be one of ${statuses} but received ${pet.status}`);
        });
    }
});

When('I search for the pet ID', async function () {
    this.response = await this.petStoreApi.findPetById(this.petData.id);
});

Then('I should receive the pet details', function () {
    assert.equal(this.response.status, 200, `Expected status code 200 but received ${this.response.status}`);
    // Validate the pet details (additional validations can be added as needed)
    assert.equal(this.response.data.id, this.petData.id, `Expected pet ID to be ${this.petData.id} but received ${this.response.data.id}`);
});

Given(/^I have the new name (.+) and status (.+)$/, function (name, status) {
    this.formData = { name, status };
    console.log("this.formData: " + JSON.stringify(this.formData, null, 2));
});

When('I update the pet using form data', async function () {
    this.response = await this.petStoreApi.updatePetWithFormData(this.petData.id, this.formData);
    console.log("this.response: " + this.response);
});