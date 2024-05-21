import test, { expect } from './fixture/basePages';
import ENV from '../lib/env';
import fs from 'fs';
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";

test.describe(`Storage state validation`, () => {
  test.use({ storageState: `user-states/internalUserStorageState.json` });
test.beforeEach(async ({ loginPage, page }) => {
  console.log('Logged into Environment >>>>>', ENV.BASE_URL);
  await page.goto(ENV.BASE_URL);
});
test(
  'Verify Login success',
    //To show clear in report without @smoke symbol , the below line is added
  { tag: ['@smoke'] },
  async ({  orangeAppPage }) => {
    await test.step('Verify Login', async () => {
      await allure.description(
        "This test attempts to log into the website using a login and a password. Fails if any error happens.\n\nNote that smoke test",
      );
      await allure.owner("John Doe");
      await allure.tags("NewUI", "Essentials", "Authentication");
      await allure.severity(Severity.CRITICAL);
      await allure.link("https://example.com/docs", "Related Documentation");
      await allure.issue("AUTH-123", "https://example.com/issues/AUTH-123");
      await allure.tms("TMS-456", "https://example.com/tms/TMS-456");
    //await loginPage.loginToApp();
    //the below parameter will show in allure report 
    await expect(orangeAppPage.elements.dashboardLabel,'Verify dashboard label').toBeVisible();
    await expect(orangeAppPage.elements.searchBar,'Verify Search Bar').toBeVisible();
    await orangeAppPage.elements.searchBar.fill('PIM');
    await orangeAppPage.elements.mainItemDropdown.click();
    await expect(orangeAppPage.elements.employeeInformationLabel,'Verify Employee Information').toHaveText('Employee Information');
    await expect(orangeAppPage.elements.resetBtnPIM,'Verify reset button').toBeVisible();
    await expect(orangeAppPage.elements.searchBtnPIM,'Verify Search bo').toBeVisible();
    });
  },
);
test(
    'Verify Home page',
    { tag: ['@regression'] },
    async ({  orangeAppPage }) => {
      //await loginPage.loginToApp();
      await test.step('Verify Home page', async () => {
      await expect(orangeAppPage.elements.searchBar).toBeVisible();
      await orangeAppPage.elements.searchBar.fill('Leave');
      await orangeAppPage.elements.mainItemDropdown.click();
      await expect(orangeAppPage.elements.liveListLabel).toHaveText('Leave List');
      await expect(orangeAppPage.elements.entitlementsHeader).toBeVisible();
      await orangeAppPage.elements.entitlementsHeader.click();
      });
    },
  );
});
  

