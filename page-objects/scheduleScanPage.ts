import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { CalendarPage } from './calendarPage';

export class ScheduleScanPage extends BasePage {

  // Selectors for specific static elements
  readonly stateDropdown: Locator;
  readonly locationCards: Locator;
  readonly continueBtn: Locator;
  readonly scrollContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.locationCards = page.locator('div.location-card');
    this.stateDropdown = page.getByText('State', { exact: false });
    this.continueBtn = page.getByRole('button', { name: 'Continue' });
    this.scrollContainer = page.locator('.sign-up-scroll-container');
  }

  async waitForPageToLoad() {
    await expect(this.locationCards.first()).toBeVisible({ timeout: 10000 });
  }

  async selectRecomendedLocation(): Promise<CalendarPage> {
    const firstCard = this.locationCards.filter({hasText: 'Recommended'});
    await expect(firstCard).toBeVisible({ timeout: 10000 });
    const calendarPage = new CalendarPage(this.page)

    await firstCard.click();
    await calendarPage.waitForPageToLoad();
    return calendarPage;
  }

  /**
   * Helper to click "What's Included" for a specific plan by text
   */
  async clickWhatsIncluded(planName: string) {
    const planContainer = this.page.locator('div').filter({ 
      hasText: new RegExp(`^${planName}$`, 'i') 
    }).first();
    
    await planContainer.getByText("What's Included").click();
  }

  async getModalText(): Promise<string> {
    const modal = this.page.locator('[role="dialog"], .modal-content').first();
    await expect(modal).toBeVisible();
    return await modal.innerText();
  }
}