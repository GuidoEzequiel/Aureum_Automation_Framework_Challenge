const { Given, When, Then } = require('@cucumber/cucumber');

 Then('the response code should be {int}', async function (expectedCodeResponse) {
    await this.baseApi.checkStatusCode(expectedCodeResponse, this.response);
});