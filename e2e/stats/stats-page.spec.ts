import { test, expect, Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  // Create page once and sign in.
  page = await browser.newPage();
  await page.goto('/signup');

  await page.getByLabel('Email').fill(process.env.USER_MAIL as string);
  await page.getByLabel('Password').fill(process.env.USER_PASSWORD as string);
  await page.getByRole('button', { name: 'Sign In' }).click();
});

test.afterAll(async () => {
  await page.close();
});

test.describe('Stats page', () => {
  test('should show users the Stats page by default', async () => {
    await expect(page.locator('text=Pending applications')).toBeVisible();
    await expect(page.locator('text=Monthly applications')).toBeVisible();
  });

  test('should allow users to select a bar or area chart', async () => {
    const barChart = page.locator('text=Bar Chart');

    await expect(barChart).toBeVisible();

    await barChart.click();
    await expect(page.locator('text=Area Chart')).toBeVisible();
  });
});
