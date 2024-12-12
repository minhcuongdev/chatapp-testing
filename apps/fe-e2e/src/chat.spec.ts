import { test, expect } from '@playwright/test';
import { baseURL } from '../playwright.config';

test.describe('Chat Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      sessionStorage.setItem('userId', '1');
    });
    await page.goto('/chat');
  });

  test('redirect to Login page', async ({ page }) => {
    await expect(page).toHaveURL(`${baseURL}/login`);
  });
});
