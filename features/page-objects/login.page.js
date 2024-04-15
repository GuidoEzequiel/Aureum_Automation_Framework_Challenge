const BasePage = require('./base.page');
const { $ } = require('@wdio/globals');

class LoginPage extends BasePage {
    constructor() {
        super('sauceDemo');
    }

    get usernameInput () {
        return $('#user-name');
    }

    get passwordInput () {
        return $('#password');
    }

    get loginButton () {
        return $('#login-button');
    }

    async login (username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}

module.exports = new LoginPage();
