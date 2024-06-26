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
  //when execute in CI its blob and when executing locally it html
  //reporter: process.env.CI ? 'blob' : 'html',
  reporter: [['list', { printSteps: true }], ['blob'], ['allure-playwright', { detail: false, outputFolder: 'allure-results', suiteTitle: false }], ['html', { outputFolder: 'my-report', open: 'never' }]],
  expect: {
    timeout: 20000,
  },

  use: {
    headless: true,
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
    // httpCredentials: {
    //   username: 'admin',
    //   password: 'admin'
    // },
  },
  projects: [
    {
      name: 'chrome',
      //grep:/@smoke|@cart/,
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'Microsoft Edge',
      //grep:/@smoke|@bill/,
      use: { ...devices['Desktop Chrome'], channel: 'msedge' },
    },
    {
      name: 'chromium',
      //grep:/@smoke|@bill/,
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
