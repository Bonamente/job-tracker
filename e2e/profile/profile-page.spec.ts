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

  await page.getByRole('link', { name: 'profile' }).click();
});

test.afterAll(async () => {
  await page.close();
});

test.describe('Profile page', () => {
  test('should allow users to edit their profile', async () => {
    await page.getByLabel('Last name').fill('lastName edited');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/user updated!/i)).toBeVisible();

    await page.getByLabel('Last name').fill('lastName');
    await page.getByRole('button', { name: 'Save changes' }).click();
  });
});
