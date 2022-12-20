import { test, expect } from '@playwright/test';
import getColor from 'e2e/utils/getColor';

test.beforeEach(async ({ page }) => {
  await page.goto('/main');
});

test.describe('Main page', () => {
  test('should allow users to select dark or light theme', async ({ page }) => {
    const body = page.locator('body');

    expect(await getColor(body)).toBe('rgb(54, 53, 55)');

    await page.getByRole('button', { name: /activate dark mode/i }).click();
    expect(await getColor(body)).toBe('rgb(250, 250, 250)');

    await page.getByRole('button', { name: /activate light mode/i }).click();
    expect(await getColor(body)).toBe('rgb(54, 53, 55)');
  });

  test('should allow users to select English or Russian', async ({ page }) => {
    await expect(page.getByRole('heading')).toHaveText('Job Tracking App');

    await page
      .getByRole('button', {
        name: /change current language/i,
      })
      .click();

    await expect(page.getByRole('heading')).toHaveText('Трекер Вакансий');
  });

  test('should allow users to navigate to the Signup page', async ({
    page,
  }) => {
    await page.getByRole('link', { name: /sign in \/ sign up/i }).click();
    await expect(page).toHaveURL(/signup/);
  });
});
