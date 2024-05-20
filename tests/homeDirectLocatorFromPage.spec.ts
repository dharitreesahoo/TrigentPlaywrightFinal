import test, { expect } from './fixture/basePages';
import ENV from '../lib/env';
import fs from 'fs';
import * as locators from '../PageRepo/loginPageRepo'

const testData = JSON.parse(fs.readFileSync(`./data/testData.json`, `utf-8`));

test.beforeEach(async ({ loginPage, page }) => {
  console.log('Logged into Environment >>>>>', ENV.BASE_URL);
  await page.goto(ENV.BASE_URL);
});
test(
  'Verify Login success',
  async ({ loginPage, orangeAppPage,page }) => {
    console.log('>>>>>>>>>', testData.TC01.geolocation.lat); //sample to read data from JSON
    //sample code to use the locator directly in test file
    await loginPage.elements.userName.fill("Admin")
    await loginPage.elements.password.fill("admin123")
    await loginPage.elements.submit.click();
    await expect(orangeAppPage.elements.dashboardLabel).toBeVisible();
    await expect(orangeAppPage.elements.searchBar).toBeVisible();
    await orangeAppPage.elements.searchBar.fill('PIM');
    await orangeAppPage.elements.mainItemDropdown.click();
    await expect(orangeAppPage.elements.employeeInformationLabel).toHaveText('Employee Information');
    await expect(orangeAppPage.elements.resetBtnPIM).toBeVisible();
    await expect(orangeAppPage.elements.searchBtnPIM).toBeVisible();
  },
);

