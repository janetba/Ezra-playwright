import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class PaymentPage extends BasePage {
  readonly consentPreferencesLink: Locator;
  readonly appContainer: Locator;
  readonly navbar: Locator;
  readonly stepper: Locator;
  readonly promoCodeInput: Locator;
  readonly applyCodeButton: Locator;
  readonly backButton: Locator;
  readonly continueButton: Locator;
  readonly reserveAppointmentButton: Locator;
  readonly creditCardNumberInput: Locator;
  readonly expiryDateInput: Locator;
  readonly cvvInput: Locator;
  readonly zipCodeInput: Locator;
  readonly submitPaymentButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    this.consentPreferencesLink = page.locator('#termly-consent-preferences');
    this.appContainer = page.locator('#app');
    this.navbar = page.locator('.signup-navbar-container');
    this.stepper = page.locator('.stepper.--schedule-flow');
    
    // Form controls
    this.promoCodeInput = page.locator('#promo-promoCode');
    this.applyCodeButton = page.getByRole('button', { name: 'Apply Code' });
    this.backButton = page.getByRole('button', { name: 'Back' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.reserveAppointmentButton = page.getByRole('button', { name: 'Reserve your appointment' });
    this.creditCardNumberInput = page.locator('#payment-numberInput');
    this.expiryDateInput = page.locator('#payment-expiryInput');
    this.cvvInput = page.locator('#payment-cvcInput');
    this.zipCodeInput = page.locator('#payment-postalCodeInput');
    this.submitPaymentButton = page.getByRole('button').locator('#stripe-ops-continue-tippy__trigger');
    this.errorMessage = page.locator('.p-FieldError.Error');
  }

  async waitForPageToLoad() {
    await expect(this.appContainer).toBeVisible();
  }

  async applyPromoCode(code: string) {
    await this.promoCodeInput.fill(code);
    await this.applyCodeButton.click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async openConsentPreferences() {
    await this.consentPreferencesLink.click();
  }

  async expectAppointmentStepVisible() {
    await expect(this.reserveAppointmentButton).toBeVisible();
  }

  async enterCreditCardNumber(cardNumber: string) {
    await expect(this.creditCardNumberInput).toBeVisible();
    await this.creditCardNumberInput.fill(cardNumber);
  }

  async assertCreditCardError() {
    await expect(this.expiryDateInput).toBeVisible();
  }

  async fillPaymentDetails(cardNumber: string, expiry: string, cvv: string, zip: string) {
    await expect(this.creditCardNumberInput).toBeVisible();
    await this.creditCardNumberInput.fill(cardNumber);
    await expect(this.expiryDateInput).toBeVisible();
    await this.expiryDateInput.fill(expiry);
    await expect(this.cvvInput).toBeVisible();
    await this.cvvInput.fill(cvv);
    await expect(this.zipCodeInput).toBeVisible();
    await this.zipCodeInput.fill(zip);
  }

  async submitPayment() {
    await expect(this.submitPaymentButton).toBeVisible();
    await this.submitPaymentButton.click();
  }
}