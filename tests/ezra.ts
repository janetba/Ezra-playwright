import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { LoginFlows } from '../flows/loginFlows';
import { SelectPlanFlows } from '../flows/selectPlanFlows';
import { CreditCardUtils } from '../utils/creditCards';

test('Schedule a scan and verify payment goes through', async({page}) => {
  const welcomePage = await LoginFlows.login('kdog1@outlook.com', 'Test1!23', page)
  await welcomePage.assertWelcomePageVisible()
  const selectPlanPage = await welcomePage.tapBookTreatment()
  const schedulePlanPage = await SelectPlanFlows.selectMRIPlanAndVerifyWhatsIncluded(selectPlanPage)
  await schedulePlanPage.waitForPageToLoad()
  const calendarPage = await schedulePlanPage.selectRecomendedLocation()
  await calendarPage.selectAvailableDate()
  await calendarPage.selectFirstTimeSlot()
  const paymentsPage = await calendarPage.submitAppointment()
  await paymentsPage.waitForPageToLoad()
  await paymentsPage.fillPaymentDetails(CreditCardUtils.ezraTestCardNumbers,
                                            CreditCardUtils.randomExpiry(),
                                              CreditCardUtils.randomCVV(),
                                              '12345')
  await paymentsPage.submitPayment()
});

test('Schedule a scan and verify payment does not go through', async({page}) => {
  const welcomePage = await LoginFlows.login('kdog1@outlook.com', 'Test1!23', page)
  await welcomePage.assertWelcomePageVisible()
  const selectPlanPage = await welcomePage.tapBookTreatment()
  const schedulePlanPage = await SelectPlanFlows.selectMRIPlanAndVerifyWhatsIncluded(selectPlanPage)
  await schedulePlanPage.waitForPageToLoad()
  const calendarPage = await schedulePlanPage.selectRecomendedLocation()
  await calendarPage.selectAvailableDate()
  await calendarPage.selectFirstTimeSlot()
  const paymentsPage = await calendarPage.submitAppointment()
  await paymentsPage.waitForPageToLoad()
  await paymentsPage.enterCreditCardNumber(CreditCardUtils.ezraTestCardNumberWrong)
  await paymentsPage.assertCreditCardError()
});

test('Schedule a scan and enter wrong promo code', async({page}) => {
  const welcomePage = await LoginFlows.login('kdog1@outlook.com', 'Test1!23', page)
  await welcomePage.assertWelcomePageVisible()
  const selectPlanPage = await welcomePage.tapBookTreatment()
  const schedulePlanPage = await SelectPlanFlows.selectMRIPlanAndVerifyWhatsIncluded(selectPlanPage)
  await schedulePlanPage.waitForPageToLoad()
  const calendarPage = await schedulePlanPage.selectRecomendedLocation()
  await calendarPage.selectAvailableDate()
  await calendarPage.selectFirstTimeSlot()
  const paymentsPage = await calendarPage.submitAppointment()
  await paymentsPage.waitForPageToLoad()
  await paymentsPage.enterCreditCardNumber(CreditCardUtils.ezraTestCardNumberWrong)
  await paymentsPage.assertCreditCardError()
});