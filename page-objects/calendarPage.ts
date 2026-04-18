import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './basePage'
import { PaymentsPage } from './paymentsPage'
import { PaymentPage } from './paymentsPage'

export class CalendarPage extends BasePage {
  readonly page: Page
  readonly calendarContainer: Locator
  readonly monthYearTitle: Locator
  readonly prevMonthBtn: Locator
  readonly nextMonthBtn: Locator
  readonly dayCells: Locator
  readonly timeCells: Locator
  readonly submitBtn: Locator

  constructor(page: Page) {
    super(page)
    this.page = page
    this.calendarContainer = page.locator('.calendar')
    this.monthYearTitle = this.calendarContainer.locator('.calendar-title')
    this.prevMonthBtn = this.calendarContainer.locator('.header-btn').first()
    this.nextMonthBtn = this.calendarContainer.locator('.header-btn').last()
    this.dayCells = this.calendarContainer.locator('.vuecal__cell:not(.vuecal__cell--disabled):not(.vuecal__cell--out-of-scope)')
    this.timeCells = this.page.locator('.appointments__individual-appointment').first()
    this.submitBtn = this.page.locator('button', { name: 'Continue' })
  }

  async selectAvailableDate() {
    const firstDate = this.dayCells.first()
    await expect(firstDate).toBeVisible({ timeout: 90000 })
    await firstDate.click()
  }

  async waitForPageToLoad() {
    //await expect(this.calendarContainer).toBeVisible({ timeout: 80000 })
    await expect(this.monthYearTitle).toBeVisible({ timeout: 90000 })
  }

  async navigateToMonth(targetMonthYear: string) {
    let currentMonth = await this.monthYearTitle.innerText()
    while (currentMonth.trim() !== targetMonthYear) {
      await this.nextMonthBtn.click()
      await expect(this.monthYearTitle).not.toHaveText(currentMonth)
      currentMonth = await this.monthYearTitle.innerText()
    }
  }

  async selectDay(day: string) {
    const daySelector = this.dayCells.filter({ hasText: new RegExp(`^\\w\\n${day}$|^${day}$`) })
    await daySelector.click()
  }

  async getSelectedDateFeedback() {
    return await this.page.locator('.selected').innerText()
  }

  async selectFirstTimeSlot() {
    await this.retryAction(async () => {
      await expect(this.timeCells).toBeVisible({ timeout: 45000 })
      await this.timeCells.click()
    });
  }
  async submitAppointment(): Promise<PaymentsPage> {
    await expect(this.submitBtn).toBeVisible({ timeout: 45000 })
    await this.submitBtn.click()
    return new PaymentsPage(this.page)
  }
} 