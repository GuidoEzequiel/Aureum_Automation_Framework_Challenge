const { Given, When, Then } = require('@cucumber/cucumber');

Given(/^I have a collection of (.+)$/, function (usersCollection) {
    this.usersCollection = this.userApi.createUsersCollectionFromUserNames(usersCollection);
});

When('I create multiple users with the list', async function () {
    this.response = await this.userApi.createUserWithList(this.usersCollection);
});

Given(/^I have the username (.+)$/, function (username) {
    this.userData.username = username;
});

Given(/^I ensure the (.+) exists$/, async function(username) {
    this.response = await this.userApi.ensureUsernameExists(username, this.userData);
});

When('I retrieve the user by the username', async function () {
    this.response = await this.userApi.getUserByUsername(this.userData.username);
});

Given(/^I have the (.+), (.+), (.+), (.+), (.+) and (.+)$/,
function (userName, password, firstName, lastName, email, phone) {
    const userInfo = {
        userName,
        password,
        firstName,
        lastName,
        email,
        phone
    };

    this.userData = this.userApi.createUserData(userInfo);
});

When(/^I update the user by the (.+)$/, async function (username) {
    this.response = await this.userApi.updateUser(username, this.userData);
});

When(/^I delete the user by the (.+)$/, async function (username) {
    this.response = await this.userApi.deleteUser(username);
});

Given(/^I have valid (.+) and (.+)$/, function (username, password) {
    this.userData.username = username;
    this.userData.password = password;
});

When('I log in the user', async function () {
    this.response = await this.userApi.loginUser(this.userData.username, this.userData.password);
});

When('I log out the user', async function () {
    this.response = await this.userApi.logoutUser();
});

When('I create multiple users with the array', async function () {
    this.response = await this.userApi.createUsersWithArray(this.usersCollection);
});

When('I create the new user', async function () {
    this.response = await this.userApi.createUser(this.userData);
});