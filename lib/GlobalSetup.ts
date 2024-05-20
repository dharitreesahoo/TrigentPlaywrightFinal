import { FullConfig, chromium, Browser, Page } from '@playwright/test';
import dotenv from 'dotenv';
import setup from '../tests/fixture/basePages';
import { userRolesAccessMatrix } from '../tests/testUserStates';
import config from '../config/local'

async function globalSetup(config: FullConfig) {
  if (process.env.test_env) {
    dotenv.config({
      path: `.env.${process.env.test_env}`,
      override: true,
    });
  }
  for (const userRole of userRolesAccessMatrix.setup) {
    const browser: Browser = await chromium.launch({ headless: false })
    const context = await browser.newContext();
    const page = await context.newPage();
    await loginToApp(page, userRole);
    await page.context().storageState({ path: `user-states/${userRole}UserStorageState.json` });
  }
  async function loginToApp(page: Page, userRole: any) {
    if (userRole == "internal") {
      await page.goto("https://opensource-demo.orangehrmlive.com")
      await page.locator('input[name="username"]').fill("Admin")
      await page.locator('input[name="password"]').fill("admin123")
      await page.locator('button[type="submit"]').click();
    } else if (userRole == "external") {
      await page.goto("https://opensource-demo.orangehrmlive.com")
      await page.locator('input[name="username"]').fill("Admin")
      await page.locator('input[name="password"]').fill("admin123")
      await page.locator('button[type="submit"]').click();
    }
  }
}
export default globalSetup;
