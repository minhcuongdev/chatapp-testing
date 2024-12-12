import { test, expect } from '@playwright/test';
import { baseURL } from '../playwright.config';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('redirect to login page on unauthorized access', async ({ page }) => {
    await expect(page).toHaveURL(`${baseURL}/login`);
  });

  test('redirect to login page on authorized access', async ({ page }) => {
    await page.evaluate(() => {
      sessionStorage.setItem('userId', '1');
    });

    await page.goto('/');
    await expect(page).toHaveURL(`${baseURL}/chat`);
  });
});
