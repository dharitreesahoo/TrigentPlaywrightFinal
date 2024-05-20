import test from './fixture/basePages';
import { expect } from '@playwright/test';

test(`Verify Page Accessibility`, async ({ page, makeAxeBuilder }) => {
  await page.goto('https://google.com/');
  const accessibilityScanResults = await makeAxeBuilder.analyze();
  // Automatically uses the shared AxeBuilder configuration,
  expect(accessibilityScanResults.violations).toEqual([]);
});
