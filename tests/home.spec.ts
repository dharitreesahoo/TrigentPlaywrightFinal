import test, { expect } from './fixture/basePages';
import ENV from '../lib/env';
import fs from 'fs';

test.beforeEach(async ({ loginPage, page }) => {
  console.log('Logged into Environment >>>>>', ENV.BASE_URL);
  await page.goto(ENV.BASE_URL);
});
test(
  'Verify Login success',
    //To show clear in report without @smoke symbol , the below line is added
  { tag: ['@smoke'] },
  async ({ loginPage, orangeAppPage,page }) => {
    await loginPage.loginToApp();
    await expect(orangeAppPage.elements.dashboardLabel).toBeVisible();
    await expect(orangeAppPage.elements.searchBar).toBeVisible();
    await orangeAppPage.elements.searchBar.fill('PIM');
    await orangeAppPage.elements.mainItemDropdown.click();
    await expect(orangeAppPage.elements.employeeInformationLabel).toHaveText('Employee Information');
    await expect(orangeAppPage.elements.resetBtnPIM).toBeVisible();
    await expect(orangeAppPage.elements.searchBtnPIM).toBeVisible();
  },
);
test.only(
    'Verify Home page',
    { tag: ['@regression'] },
    async ({ loginPage, orangeAppPage }) => {
      await loginPage.loginToApp();
      await expect(orangeAppPage.elements.searchBar).toBeVisible();
      await orangeAppPage.elements.searchBar.fill('Leave');
      await orangeAppPage.elements.mainItemDropdown.click();
      await expect(orangeAppPage.elements.liveListLabel).toHaveText('Leave List');
      await expect(orangeAppPage.elements.entitlementsHeader).toBeVisible();
      await orangeAppPage.elements.entitlementsHeader.click();
    },
  );
  

