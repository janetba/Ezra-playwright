import { Page, Locator, expect } from '@playwright/test';
import { WelcomePage } from './welcomePage';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByText('Submit');
  }

   async navigateToPage() {
    await this.page.goto('/sign-in',{ waitUntil: 'load'});
    await this.page.getByRole('button', { name: 'Accept' }).click();
  }

  async login(this: any, username: string, password: string): Promise<WelcomePage> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    return new WelcomePage(this.page);
  }

  async assertLoginPageVisible(): Promise<this> {
    await expect(this.usernameInput).toBeVisible();
    return this;
  }
}