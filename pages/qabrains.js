const { expect } = require('@playwright/test');

class QABrains {
    constructor(page) {
        this.page = page;

        // Home Page Locators
        this.siteBtn = page.locator("//span[normalize-space()='E-Commerce Site']");
        this.demoSiteBtn = page.locator("//a[@class='text-blue-600']");

        

        // Cart Locators
        this.addToCartBtn = page.locator("(//button[@type='button'][normalize-space()='Add to cart'])[1]");
        this.addToCartPopup = page.locator("section[aria-label='Notifications alt+T']");
        this.removeFromCartBtn = page.locator("//button[normalize-space()='Remove from cart']");
        this.removeFromCartPopup = page.locator("//div[contains(text(),'Removed from cart')]");
        
        //this. = page.locator("");
    }

    async homePage() {
        await this.siteBtn.click();
        await this.page.waitForTimeout(2000);
        await this.demoSiteBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async addToCart() {
        await this.addToCartBtn.click();
    }

    async addToCartSuccess() {
        await this.addToCartPopup.waitFor({ state: 'visible'});
        return await this.addToCartPopup.textContent();
    }


}

module.exports = QABrains; 