import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class SelectPlanPage extends BasePage {
  readonly pageTitle: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  // Scan Plan Containers
  readonly mriScanCard: Locator;
  readonly mriWithSpineCard: Locator;
  readonly fullBodyAdvancedCard: Locator;
  readonly heartCTCard: Locator;
  readonly lungCTCard: Locator;
  readonly modalContainer: Locator;
  readonly modalCloseButton: Locator;
  readonly mriWhatsIncludedText: string;
  readonly pageHeader: Locator;
  readonly mriWhatsIncludedLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { name: 'Review your Scan.' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });

    // Locators for specific scan options based on their titles
    this.mriScanCard = page.locator('div').filter({ hasText: /^MRI Scan$/ }).first();
    this.mriWithSpineCard = page.locator('div').filter({ hasText: /^MRI Scan with Spine$/ });
    this.fullBodyAdvancedCard = page.locator('div').filter({ hasText: /Skeletal and Neurological Assessment/ });
    this.heartCTCard = page.locator('div').filter({ hasText: /^Heart CT Scan$/ });
    this.lungCTCard = page.locator('div').filter({ hasText: /^Lungs CT Scan$/ });

    this.mriWhatsIncludedText = "Scans for hundreds of potential conditions including cancers of the brain, thyroid, liver, gallbladder, pancreas, spleen, kidneys, adrenal glands, bladder, ovaries, uterus, and prostate. Also scans for signs of stroke, sinus inflammation, fatty liver, uterine fibroids, and abdominal aortic aneurysm.";
    this.modalContainer = page.locator('role=dialog');
    this.modalCloseButton = page.locator('role=dialog').getByRole('button').first();    
    this.pageHeader = page.getByRole('heading', { name: 'Review your Scan.' });
    // Locate the specific link within that card
    this.mriWhatsIncludedLink = this.mriScanCard.getByText("What's Included");
  }


  async waitForPageToLoad() {
     await expect(this.mriScanCard).toBeVisible();
     await expect(this.mriWithSpineCard).toBeVisible();
  }

  /**
   * Selects a scan plan by clicking on its title or container
   * @param plan The locator of the scan card to select
   */
  async selectPlan(plan: Locator) {
    await plan.click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  /**
   * Gets the price text for a specific plan
   * @param plan The locator of the scan card
   */
  async getPlanPrice(plan: Locator): Promise<string | null> {
    return await plan.locator('text=/Available at \$\d+/').textContent();
  }

   async openMriWhatsIncluded() {
    const whatsIncluded =  this.mriScanCard.getByText("What's Included")
    await this.scrollDownToElement(whatsIncluded)
    await whatsIncluded.click();
  }

  /**
   * Verifies the MRI Scan modal title and the specific content string
   */
  async verifyMriWhatsIncludedContent() {
    await expect(this.modalContainer).toBeVisible();
    
    // Verify Header
    const header = this.modalContainer.getByRole('heading', { name: 'MRI Scan', exact: true });
    await expect(header).toBeVisible();

    // Verify the specific body text is present in the modal
    const bodyText = this.modalContainer.getByText(this.mriWhatsIncludedText);
    await expect(bodyText).toBeVisible();
  }

  async closeModal() {
    await this.modalCloseButton.click();
    await expect(this.modalContainer).toBeHidden();
  }

 async scrollToMriWhatsIncluded() {
    this.scrollDownToElement(this.mriWhatsIncludedLink)
    await this.mriWhatsIncludedLink
    await expect(this.mriWhatsIncludedLink).toBeInViewport();
  }

}