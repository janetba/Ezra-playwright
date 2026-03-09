import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { LoginFlows } from '../flows/loginFlows';

test('verify whats included pop up has correct text', async({page}) => {
  const welcomePage = await LoginFlows.login('kdog1@outlook.com', 'Test1!23', page)
    await welcomePage.assertWelcomePageVisible()
    const selectPlanPage = await welcomePage.tapBookTreatment()
    await selectPlanPage.waitForPageToLoad()

    await selectPlanPage.openMriWhatsIncluded()
    await selectPlanPage.verifyMriWhatsIncludedContent()
    await selectPlanPage.closeModal()
    
    await selectPlanPage.selectPlan(selectPlanPage.mriScanCard)
    await selectPlanPage.clickContinue()
});