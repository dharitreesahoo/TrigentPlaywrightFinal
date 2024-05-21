// @ts-check

//** @type { import('@playwright/test').PlaywrightTestConfig } * /
import { PlaywrightTestConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const config: PlaywrightTestConfig = {
  globalSetup: 'lib/GlobalSetup.ts',
  //grep:/@smoke|@regression/,
  testDir: 'tests',
  timeout: 30 * 1000,
  testMatch: ['tests/homeStorageState.spec.ts'],
  retries: 0,
  workers: 3,
  reporter: [['dot'],['allure-playwright'], ['html', { outputFolder: 'my-report', open: 'never' }]],
  expect: {
    timeout: 20000,
  },
  use: {
    headless: false,
    actionTimeout: 0,
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    acceptDownloads: true,
    colorScheme: 'dark',
    launchOptions: {
      slowMo: 500,
    },
  },
projects: [
  {
    name: 'chrome',
    use: { ...devices['Desktop Chrome'],channel:'chrome' },
  },
  {
    name: 'Microsoft Edge',
    use: { ...devices['Desktop Chrome'],channel:'msedge' },
  },
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
  {
    name: 'Pixel-5',
    use: {
      browserName: 'chromium',
      ...devices['Pixel 5'],
    },
  },
  {
    name: 'iPhone-12',
    use: {
      browserName: 'webkit',
      ...devices['iPhone 12'],
    },
  },
],

 };

export default config;
