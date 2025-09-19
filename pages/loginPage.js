const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.emailInput = page.locator("//input[@id='email']");
        this.passwordInput = page.locator("//input[@id='password']");
        this.loginButton = page.locator("//button[@type='submit']");
        this.userProfileName = page.locator("//span[@class='user-name font-bold text-xs sm:text-[15px]']");

        // Error messages
        this.errorInvalidEmail = page.locator("//p[normalize-space()='Username is incorrect.']");
        this.errorInvalidPassword = page.locator("//p[normalize-space()='Password is incorrect.']");
        this.errorEmptyEmail = page.locator("//p[normalize-space()='Email is a required field']");
        this.errorEmptyPassword = page.locator("//p[normalize-space()='Password is a required field']");
    }

    async navigateToLoginPage() {
        await this.page.goto("https://practice.qabrains.com/ecommerce/login");
        await this.page.waitForLoadState("domcontentloaded");
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getLoggedInUserName() {
        await this.userProfileName.waitFor({ state: 'visible', timeout: 5000 });
        return (await this.userProfileName.textContent()).trim();
    }
}

module.exports = LoginPage;
