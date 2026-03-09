import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { SelectPlanPage } from './selectPlanPage';

export class WelcomePage extends BasePage{
  readonly bookScanButton: Locator;
  readonly myTasksButton: Locator;
  readonly homeButton: Locator;
  readonly reportsButton: Locator;
  readonly invoicesButton: Locator;
  readonly accountsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.bookScanButton = page.getByRole('button', { name: 'Book a scan' })
;
    this.myTasksButton = page.getByText('My Tasks')
    this.homeButton = page.getByText('Home')
    this.reportsButton = page.getByText('Reports')
    this.invoicesButton = page.getByText('Invoices')
    this.accountsButton = page.getByText('Accounts')
  }

   async assertWelcomePageVisible(): Promise<this> {
    await expect(this.homeButton).toBeVisible();
    await expect(this.reportsButton).toBeVisible();
    await expect(this.invoicesButton).toBeVisible();
    await expect(this.accountsButton).toBeVisible();
    return this;
  }

  async tapBookTreatment(): Promise<SelectPlanPage> {
    await this.bookScanButton.click();
    return new SelectPlanPage(this.page)
  }

}