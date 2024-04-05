const BasePage = require('./base.page');
const { $ } = require('@wdio/globals');

//sub page containing specific selectors and methods for a specific page.
class LoginPage extends BasePage {

    //define selectors using getter methods
    get usernameInput () {
        return $('#user-name');
    }

    get passwordInput () {
        return $('#password');
    }

    get loginButton () {
        return $('#login-button');
    }

    //A method to encapsule automation code to interact with the page.
    //e.g. to login using username and password.
    async login (username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }

}

module.exports = new LoginPage();
