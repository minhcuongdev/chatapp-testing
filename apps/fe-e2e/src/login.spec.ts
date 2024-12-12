import { test, expect } from '@playwright/test';
import { baseURL } from '../playwright.config';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('has login title', async ({ page }) => {
    expect(await page.locator('h1').innerText()).toContain('Login');
  });

  test('redirect to chat page when logging successfully', async ({ page }) => {
    await page.fill('#email', 'dev1@gm');
    await page.fill('#password', '123456');

    await page.getByTestId('login').click();

    await expect(page).toHaveURL(`${baseURL}/chat`);
  });

  test('show Login error message when logging failed', async ({ page }) => {
    await page.fill('#email', '');
    await page.fill('#password', '');

    await page.getByTestId('login').click();

    const textLocator = page.locator('text=Login error');

    await expect(page).toHaveURL(`${baseURL}/login`);
    await expect(textLocator).toBeVisible();
  });

  test('background color of login button', async ({ page }) => {
    const loginButtonLocator = page.getByTestId('login');

    await expect(loginButtonLocator).toHaveCSS(
      'background-color',
      'rgb(79, 70, 229)',
    );
  });
});
