import { Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';

export class ActionUtil {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async downloadFile(locator: string): Promise<string> {
    const [download] = await Promise.all([this.page.waitForEvent('download'), this.page.locator(locator).click()]);
    await download.saveAs(path.join(__dirname, `../../downloads`, download.suggestedFilename()));
    return download.suggestedFilename();
  }
  async uploadFile(fileName: string): Promise<void> {
    await this.page.setInputFiles('input[type="file"]', fileName);
  }
  async dragAndDrop(dragElementLocator: string, dropElementLocator: string): Promise<void> {
    await this.page.waitForSelector(dragElementLocator);
    await this.page.waitForSelector(dropElementLocator);
    await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
  }
  clearFolder(dirName: string): void {
    fs.readdir(dirName, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(dirName, file), (err) => {
          if (err) throw err;
        });
      }
    });
  }
  async verifyPathPresence(pathName: string): Promise<boolean> {
    try {
      await fs.promises.access(pathName);
      return true;
    } catch (error) {
      return false;
    }
  }
  clearFile(pathName: string): void {
    fs.unlinkSync(pathName);
  }
}
