import { Page, Locator, expect } from '@playwright/test';


// utility for common funcitons
export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async scrollDownToElement(locator: Locator, maxRetries: number = 20) {
        let isVisible = await locator.isVisible();
        let count = 0;

        while (!isVisible && count < maxRetries) {
            await this.page.mouse.wheel(0, 300);
            await this.page.waitForTimeout(200); 
        
            isVisible = await locator.isVisible();
            count++;
        }

        if (!isVisible) {
            throw new Error(`Element was not found after scrolling ${count * 300} pixels.`);
        }
  }
}