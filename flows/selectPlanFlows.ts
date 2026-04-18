import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { WelcomePage } from '../page-objects/welcomePage';
import { ScheduleScanPage } from '../page-objects/scheduleScanPage';
import { SelectPlanPage } from '../page-objects/selectPlanPage';

export class SelectPlanFlows {
    static async selectMRIPlanAndVerifyWhatsIncluded(page: SelectPlanPage): Promise<ScheduleScanPage> {
        await page.waitForPageToLoad()
        await page.selectPlan(page.mriScanCard)
        await page.openMriWhatsIncluded()
        await page.verifyMriWhatsIncludedContent()
        await page.closeModal()
        if (!page.continueButton.isVisible()) {
             await page.selectPlan(page.mriScanCard)
        }
        return await page.clickContinue();
    }
}