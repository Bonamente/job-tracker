import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const mockAPI = (page: Page, endpoint: string) =>
  page.route(`**/${endpoint}`, (route) => {
    route.fulfill({
      body: JSON.stringify({
        user: {
          email: '',
          name: 'TestUser',
          lastName: '',
          location: '',
        },
      }),
    });
  });

test.beforeEach(async ({ page }) => {
  await page.goto('/signup');
});

test.describe('Signup page', () => {
  test('should not allow users to sign in without credentials ', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByText(/please fill out all fields/i)).toBeVisible();
  });

  test('should allow users to sign in', async ({ page }) => {
    await mockAPI(page, 'auth/login');

    await page.getByLabel('Email').fill('test@test.com');
    await page.getByLabel('Password').fill('TestPassword');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByText(/welcome back, testuser!/i)).toBeVisible();
  });

  test('should not allow users to sign up without credentials ', async ({
    page,
  }) => {
    await page.getByRole('button', { name: /sign up/i }).click();
    await page.getByRole('button', { name: /sign up/i }).click();
    await expect(page.getByText(/please fill out all fields/i)).toBeVisible();
  });

  test('should allow users to sign up', async ({ page }) => {
    await mockAPI(page, 'auth/register');

    await page.getByRole('button', { name: /sign up/i }).click();
    await page.getByLabel('Name').fill('TestUser');
    await page.getByLabel('Email').fill('test@test.com');
    await page.getByLabel('Password').fill('TestPassword');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await expect(page.getByText(/hi, testuser!/i)).toBeVisible();
  });
});
