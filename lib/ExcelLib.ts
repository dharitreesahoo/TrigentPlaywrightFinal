import reader from 'xlsx';
import { expect, test, Page, Locator } from '@playwright/test';
const testData: any[] = [];

export class ExcelLib {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async readDataFromExcel(fileName: any, sheetName: any) {
    const temp = reader.utils.sheet_to_json(fileName.Sheets[sheetName]);
    temp.forEach((xlData) => {
      testData.push(xlData);
    });
    return testData;
  }
  async getRowData(tcData: any, TCNo: string) {
    let rowData = '';
    tcData.forEach(async (tc: any) => {
      if (tc.TCID === TCNo) {
        rowData = tc;
      }
    });
    return rowData;
  }
}
