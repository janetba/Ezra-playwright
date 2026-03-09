import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { WelcomePage } from '../page-objects/welcomePage';

export class LoginFlows {
        static async login(userName: string, password: string, page: Page): Promise<WelcomePage> {
            const loginPage = new LoginPage(page)
            await loginPage.navigateToPage()      
            await loginPage.assertLoginPageVisible()
            return await loginPage.login(userName, password)
    }

}