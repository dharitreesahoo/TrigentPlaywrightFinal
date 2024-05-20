import { expect, test, Page, Locator } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import path from 'path';

export class CSVLib {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async readDataFromCSV() {
    const records = parse(fs.readFileSync('./data/UITestDataCSV.csv'), {
      columns: true,
      skip_empty_lines: true,
    });
    return records;
  }
  async getRowData(CSVRecords: any, TCNo: string) {
    for (const rowRecord of CSVRecords) {
      // console.log(record.TCID);
      if (rowRecord.TCID == TCNo) {
        return rowRecord;
      }
    }
  }
}
