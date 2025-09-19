const { test, expect, chromium } = require('@playwright/test');
const BasePage = require('../utils/basePage');
const QABrains = require('../pages/qabrains');
const testData = require('../utils/testData');

let browser;
let context;
let page;
let basePage;
let qabrains;

test.describe('QABrains Page', () => {

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();

    basePage = new BasePage(page);
    qabrains = new QABrains(page); 

    await basePage.navigateTo();
    await page.waitForLoadState('domcontentloaded');
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });

  test('Open Home Page', async () => {
    await qabrains.homePage();
  });

  /*test('Log in', async () => {
    const { ValidEmail, validPassword } = testData.validUser;
    await qabrains.loginPage(ValidEmail, validPassword);
    await qabrains.loginSuccessful();
  });*/

  test('Add to cart', async () => {
    
    await qabrains.addToCart();
    await qabrains.addToCartSuccess();
    const addToCartPopupText = await qabrains.addToCartSuccess();
    expect(addToCartPopupText.trim()).toBe(testData.addToCartSuccessPopup);
  });

});
