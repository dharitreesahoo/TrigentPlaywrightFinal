import test, { expect } from './fixture/basePages';

test('Locator Handler example>>>', async ({ page }) => {
  //await page.pause();
  await page.addLocatorHandler(page.getByText('Random Popup'), async () => {
    await page.locator(`//button[text()='Close']`).click();
  });
  await page.goto('https://commitquality.com/practice-random-popup');

  await new Promise((resolve) => setTimeout(resolve, 5000));
  await page.getByTestId('accordion-1').click({ timeout: 2000 });
});
