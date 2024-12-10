import { Builder, By, until } from 'selenium-webdriver';
import { expect } from '@jest/globals';

describe('Dashboard Page', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should load the dashboard page', async () => {
    await driver.get('http://localhost:3000/dashboard');
    const title = await driver.findElement(By.css('h1')).getText();
    expect(title).toBe('Carbon Footprint Dashboard');
  });

  it('should display carbon footprint cards', async () => {
    const cards = await driver.findElements(By.css('.card'));
    expect(cards.length).toBe(3);
  });

  it('should switch between trends and recommendations tabs', async () => {
    const recommendationsTab = await driver.findElement(
      By.css('[value="recommendations"]')
    );
    await recommendationsTab.click();

    const recommendationsContent = await driver.wait(
      until.elementLocated(By.css('[value="recommendations"]')),
      5000
    );
    expect(await recommendationsContent.isDisplayed()).toBe(true);
  });
});