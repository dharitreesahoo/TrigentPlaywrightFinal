import LoginPage from '../../pages/LoginPage';
import OrangeApplicationPage from '../../pages/OrangeApplicationPage';
import AxeBuilder from '@axe-core/playwright';

import { test as baseTest } from '@playwright/test';
const test = baseTest.extend<{
  loginPage: LoginPage;
  orangeAppPage: OrangeApplicationPage;
  makeAxeBuilder: AxeBuilder;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  orangeAppPage: async ({ page }, use) => {
    await use(new OrangeApplicationPage(page));
  },
  makeAxeBuilder: async ({ page }, use) => {
    await use(
      new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('#commonly-reused-element-with-known-issue'),
    );
  },
});
export default test;
export const expect = test.expect;
