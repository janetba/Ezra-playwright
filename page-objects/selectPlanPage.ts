import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { ScheduleScanPage } from './scheduleScanPage';

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
  readonly mriWhatsIncludedText: Array<string>;
  readonly pageHeader: Locator;
  readonly mriWhatsIncludedLink: Locator;

  readonly SCAN_PLANS = {
    MRI_SCAN: "MRI Scan",
    MRI_SPINE: "MRI Scan with Spine",
    MRI_SKELETAL: "MRI Scan with Skeletal and Neurological Assessment",
    HEART_CT: "Heart CT Scan",
    LUNG_CT: "Lungs CT Scan",
  };

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { name: 'Review your Scan.' });
    this.continueButton = page.getByTestId('select-plan-submit-btn');
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });

    // Locators for specific scan options based on their titles
    this.mriScanCard = page.getByRole('listitem').filter({ 
    has: page.locator('.h4').getByText(this.SCAN_PLANS.MRI_SCAN, { exact: true }) 
  });
  
    this.mriWithSpineCard = page.getByRole('listitem').filter({ 
    has: page.locator('.h4').getByText(this.SCAN_PLANS.MRI_SPINE, { exact: true }) 
  });
 
    this.heartCTCard = page.getByRole('listitem').filter({
    has: page.locator('.h4').getByText(this.SCAN_PLANS.HEART_CT, { exact: true })
  });

    this.fullBodyAdvancedCard = page.getByRole('listitem').filter({
    has: page.locator('.h4').getByText(this.SCAN_PLANS.MRI_SKELETAL, { exact: true })
  });

    this.lungCTCard = page.getByRole('listitem').filter({
    has: page.locator('.h4').getByText(this.SCAN_PLANS.LUNG_CT, { exact: true })
  });

    this.mriWhatsIncludedText = ["Head", "Neck", "Abdomen", "Pelvis"];
    this.modalContainer = page.locator('div.organ-included-content').filter({ visible: true });
    this.modalCloseButton = this.modalContainer.getByRole('button').first();    
    this.pageHeader = page.getByRole('heading', { name: 'Review your Scan.' });
    // Locate the specific link within that card
    this.mriWhatsIncludedLink = this.mriScanCard.getByRole('button', { name: 'What\'s Included' });
  }


  async waitForPageToLoad(): Promise<this> {
     await expect(this.mriScanCard).toBeVisible();
     await expect(this.mriWithSpineCard).toBeVisible();
     return this;
  }

  async selectPlan(plan: Locator): Promise<this> {
    await plan.click();
    return this;
  }

  async clickContinue(): Promise<ScheduleScanPage> {
    await this.continueButton.click();
    return new ScheduleScanPage(this.page);
  }

  async getPlanPrice(plan: Locator): Promise<string | null> {
    return await plan.locator('text=/Available at \$\d+/').textContent();
  }

   async openMriWhatsIncluded(): Promise<this> {
    await this.mriWhatsIncludedLink.click();
    return this;
  }

  async verifyMriWhatsIncludedContent(): Promise<this> {
    await expect(this.modalContainer).toBeVisible();
    // Verify the specific body text is present in the modal
    const bodyText = await this.modalContainer.textContent();
    this.mriWhatsIncludedText.forEach((text) => {
      expect(bodyText).toContain(text);
    });
    return this;
  }

  async closeModal(): Promise<this> {
    await this.modalCloseButton.click();
    await expect(this.modalContainer).toBeHidden();
    return this;
  }

}