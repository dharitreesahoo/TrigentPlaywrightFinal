import { expect, test, Page, Locator } from '@playwright/test';
import fs from 'fs';
export class JSONLib {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async readFromJSON() {
    fs.readFile('./data/testData.json', 'utf8', (err, jsonString) => {
      const JSONData = JSON.parse(jsonString);
      console.log(JSONData);
      return JSONData;
    });
  }
}
