const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const path = require('path');

Given(/^I add a new pet with (\d+), (.+), and (.+)$/, async function (id, name, status) {
    this.response = await this.petApi.addPet(id, name, status);
});

When(/^I upload an image for the pet with ([^"]*)$/, async function (id) {
    const imagePath = path.join(__dirname, '..', 'images', 'petsImage.jpg');
    this.response = await this.petApi.uploadImage(id, imagePath);
});

Then('the response message should confirm the image upload', function () {
    assert.ok(this.response.statusText.includes('OK'), 'Image upload confirmation text not found in the response message');
});

Given(/^a pet with (\d+)$/, async function (petId) {

    // Convert petId from string to integer.
    this.petData.id = parseInt(petId);

    // Assuming there is a method to retrieve a pet by ID to check if it exists.
    this.response = await this.petApi.findPetById(petId);

    // Store the pet object for later use.
    this.petData = this.response.data;
});
 
Given(/^I ensure a pet with (\d+) exists$/, async function (petId) {
    this.response = await this.petApi.ensurePetExists(petId, this.petData);
});
  
When(/^I update the pet (.+) and (.+)$/, async function (name, status) {
    // Update the stored pet object with the new name and status. 
    this.petData.name = name;
    this.petData.status = status;

    // Send the update request with the updated pet details.
    this.response = await this.petApi.updatePet(this.petData);
});

Given(/^I want to find pets with the status (.+)$/, function (statuses) {
    this.petsStatuses = statuses;
});

When('I search for pets by status', async function () {
    this.response = await this.petApi.findPetsByStatus(this.petsStatuses);
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
    this.response = await this.petApi.findPetById(this.petData.id);
});

Then('I should receive the pet details', function () {
    assert.equal(this.response.status, 200, `Expected status code 200 but received ${this.response.status}`);
    // Validate the pet details (additional validations can be added as needed)
    assert.equal(this.response.data.id, this.petData.id, `Expected pet ID to be ${this.petData.id} but received ${this.response.data.id}`);
});

Given(/^I have the new pet name (.+) and status (.+)$/, function (name, status) {
    this.formData = { name, status };
});

When('I update the pet using form data', async function () {
    this.response = await this.petApi.updatePetWithFormData(this.petData.id, this.formData);
});

When('I send a request to remove the pet', async function () {
    this.response = await this.petApi.deletePet(this.petData.id);
});

When('I get a request to remove the pet', async function () {
    this.response = await this.petApi.deletePet(this.petData.id);
});