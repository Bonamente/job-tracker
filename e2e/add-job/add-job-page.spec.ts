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

  await page.getByRole('link', { name: 'add job' }).click();
});

test.afterAll(async () => {
  await page.close();
});

test.describe('Add Job page', () => {
  test(`should not allow users to add a job without a position or location provided`, async () => {
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(/please fill out all fields/i)).toBeVisible();
  });

  test('should allow users to add, edit, and delete jobs', async () => {
    // Add job
    await expect(page.getByRole('heading', { name: /add job/i })).toBeVisible();
    await page.getByLabel('Position').fill('test-position');
    await page.getByLabel('Company').fill('test-company');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(/job created/i)).toBeVisible();

    // Edit job
    await page.getByRole('link', { name: 'all jobs' }).click();

    await page
      .getByRole('article')
      .filter({
        hasText: /test-position/i,
      })
      .getByRole('link', { name: 'Edit' })
      .click();

    await expect(
      page.getByRole('heading', { name: /edit job/i })
    ).toBeVisible();
    await page.getByLabel('Position').fill('test-position-edited');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(/job modified/i)).toBeVisible();

    // Delete job
    await page.getByRole('link', { name: 'all jobs' }).click();
    await page.getByRole('heading', { name: 'test-position-edited' }).click();

    await page
      .getByRole('article')
      .filter({
        hasText: /test-position-edited/i,
      })
      .getByRole('button', { name: 'Delete' })
      .click();

    await expect(page.getByText(/success! job removed/i)).toBeVisible();
  });
});
