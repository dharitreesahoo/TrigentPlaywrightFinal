import { Page, Locator } from '@playwright/test';
import ENV from '../lib/env';
import config from '../config/local';
import * as locators from '../PageRepo/loginPageRepo'

const elements = {
  userName: 'input[name="username"]',
  password: 'input[name="password"]',
  submit: 'button[type="submit"]',
};

type Elements = Record<keyof typeof elements, Locator>;

export default class LoginPage {
  readonly page: Page;
  readonly elements: Elements;
  //dynamic locator sample
  readonly selectNewDisease: (diseaseName: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.elements = {} as Elements;
    this.selectNewDisease = (diseaseName: string) => page.locator(`//label[text()='${diseaseName}`);

    Object.entries(elements).forEach(([key, value]) => {
      this.elements[key as keyof typeof elements] = page.locator(value);
    });
  }
  async loginToApp()  {
    await this.elements.userName.fill('Admin');
    //sample code to use locator from external locator 
    //await this.page.locator(locators.UserName_txt).fill('Admin');
    await this.elements.password.fill('admin123');
    await this.elements.submit.click();
  }
}
