import { Page, Locator, expect } from '@playwright/test';


// utility for common funcitons
export abstract class BasePage {
    readonly page: Page;

    abstract waitForPageToLoad(): Promise<void>;

    constructor(page: Page) {
        this.page = page;
    }

    async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async retryAction(action: () => Promise<void>, retries = 3, delayMs = 500) {
        let lastError: unknown;
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                await action();
                return; // Success
            } catch (err) {
                lastError = err;
                console.warn(`Attempt ${attempt} failed. Retrying...`);
                if (attempt < retries) {
                await this.page.waitForTimeout(delayMs);
                }
            }
        }
        throw lastError; // Throw last error if all retries fail
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