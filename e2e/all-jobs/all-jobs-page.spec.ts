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

  await page.getByRole('link', { name: 'all jobs' }).click();
});

test.afterAll(async () => {
  await page.close();
});

test.describe('All Jobs page', () => {
  test('should allow users to search, filter, and sort jobs', async () => {
    const body = page.locator('body');

    // Search
    await page.getByRole('textbox', { name: /search/i }).fill('driver');
    await expect(body).toHaveText(/1 job found/i);
    await page.getByRole('button', { name: 'Clear filters' }).click();

    // Filter
    await page
      .getByRole('combobox', { name: 'Status' })
      .selectOption('interview');
    await expect(body).toHaveText(/6 jobs found/i);
    await page.getByRole('button', { name: 'Clear filters' }).click();

    await page.getByRole('combobox', { name: 'Type' }).selectOption('remote');
    await expect(body).toHaveText(/1 job found/i);
    await page.getByRole('button', { name: 'Clear filters' }).click();

    // Sort
    await page.getByRole('combobox', { name: 'Sort' }).selectOption('oldest');
    await expect(body).toHaveText(/november 11, 2022/i);
    await page.getByRole('button', { name: 'Clear filters' }).click();
  });

  test('should allow users to paginate', async () => {
    const body = page.locator('body');
    const page1Btn = page.getByRole('button', { name: /go to page 1/i });
    const page2Btn = page.getByRole('button', { name: /go to page 2/i });
    const nextBtn = page.getByRole('button', { name: 'next' });

    await expect(page2Btn).toHaveClass(/pageBtn/);
    await nextBtn.click();
    await expect(page2Btn).toHaveClass(/pageBtn active/);
    await expect(body).toHaveText(/frontend developer/i);

    await expect(page1Btn).toHaveClass(/pageBtn/);
    await page1Btn.click();
    await expect(page1Btn).toHaveClass(/pageBtn active/);
    await expect(body).toHaveText(/lighthouse keeper/i);
  });
});
