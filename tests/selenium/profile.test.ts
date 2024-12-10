import { Builder, By, until } from 'selenium-webdriver';
import { expect } from '@jest/globals';

describe('Profile Page', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should load the profile page', async () => {
    await driver.get('http://localhost:3000/profile');
    const title = await driver.findElement(By.css('h1')).getText();
    expect(title).toBe('User Profile');
  });

  it('should fi await drivll and submit the profile form', async () => {
   er.findElement(By.name('name')).sendKeys('Test User');
    await driver.findElement(By.name('email')).sendKeys('test@example.com');
    
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    // Wait for success message or redirect
    const successElement = await driver.wait(
      until.elementLocated(By.css('.success-message')),
      5000
    );
    expect(await successElement.isDisplayed()).toBe(true);
  });
});