const { test, expect, chromium } = require('@playwright/test');
const BasePage = require('../utils/basePage');
const LoginPage = require('../pages/loginPage');
const testData = require('../utils/testData');

let browser, context, page, basePage, loginPage;

test.describe('Login Page Tests', () => {

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();

    basePage = new BasePage(page);
    loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });

  

  // Negative test examples:
  test('should show error for invalid credentials', async () => {
    const { invalidEmail, invalidPassword } = testData.invalidUser;
    await loginPage.login( invalidEmail, invalidPassword );
    await expect(loginPage.errorInvalidEmail).toBeVisible();
  });

  test('should show error when email is empty', async () => {
    await loginPage.login("", "Password123");
    await expect(loginPage.errorEmptyEmail).toBeVisible();
  });

  test('should show error when password is empty', async () => {
    await loginPage.login("test@qabrains.com", "");
    await expect(loginPage.errorEmptyPassword).toBeVisible();
  });

  test('should login successfully with valid credentials', async () => {
    const { ValidEmail, validPassword } = testData.validUser;
    await loginPage.login(ValidEmail, validPassword);

    const loggedInUser = await loginPage.getLoggedInUserName();
    expect(loggedInUser).toBe(ValidEmail);
  });

});
