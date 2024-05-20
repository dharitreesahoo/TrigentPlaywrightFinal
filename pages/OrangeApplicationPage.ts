import { Locator, Page } from '@playwright/test';

const elements = {
  columnResultNCTID: '[data-testid="column-result-nctid"]',
  userNameInputBox: "[name='username']",
  userPasswordInputBox: "[name='password']",
  submitBtn: "button[type='submit']",
  dashboardLabel: "//h6[text()='Dashboard']",
  searchBar: "[placeholder='Search']",
  mainItemDropdown: 'ul li a',
  employeeInformationLabel: "//h5[text()='Employee Information']",
  resetBtnPIM: "//button[text()=' Reset ']",
  searchBtnPIM: "//button[text()=' Search ']",
  liveListLabel: "//h5[text()='Leave List']",
  entitlementsHeader: "//span[text()='Entitlements ']",
  addLeaveEntitlementLabel: "//p[text()='Add Leave Entitlement']",
};
type Elements = Record<keyof typeof elements, Locator>;

export default class OrangeApplicationPage {
  readonly page: Page;
  readonly elements: Elements;
  readonly headerDropdownoptions: (options: string) => Locator;

  constructor(page: Page) {
    //constructor to get the elements value using locators
    this.page = page;
    this.elements = {} as Elements;
    Object.entries(elements).forEach(([key, value]) => {
      this.elements[key as keyof typeof elements] = page.locator(value);
    });
    this.headerDropdownoptions = (options: string) =>
      page.locator(`//span[text()='${options}']/parent::li/child::ul/li/a`);
  }
  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }
  async selectOption(text: string): Promise<void> {
    await this.page.getByRole('option', { name: text }).first().click();
  }
  async selectOptionSource(text: string): Promise<void> {
    await this.page.getByText(text, { exact: true }).first().click();
  }
  async clickSignOutBtn(): Promise<void> {
    await this.page.getByRole('button', { name: 'Sign out' }).click();
  }
}
