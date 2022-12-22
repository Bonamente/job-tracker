import { test, expect, Page } from '@playwright/test';
import getColor from 'e2e/utils/getColor';

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

test.describe('Dashboard page', () => {
  test('should show users the Stats page by default', async () => {
    await expect(page.locator('text=Pending applications')).toBeVisible();
    await expect(page.locator('text=Monthly applications')).toBeVisible();
  });

  test('should allow users to select dark or light theme', async () => {
    const body = page.locator('body');

    expect(await getColor(body)).toBe('rgb(54, 53, 55)');

    await page.getByRole('button', { name: /activate dark mode/i }).click();
    expect(await getColor(body)).toBe('rgb(250, 250, 250)');

    await page.getByRole('button', { name: /activate light mode/i }).click();
    expect(await getColor(body)).toBe('rgb(54, 53, 55)');
  });

  test('should allow users to select English or Russian', async () => {
    await expect(page.locator('text=Dashboard')).toBeVisible();

    await page
      .getByRole('button', {
        name: /change current language/i,
      })
      .click();

    await expect(page.locator('text=Панель управления')).toBeVisible();
    await page.getByRole('button', { name: /изменить текущий язык/i }).click();
  });

  test('should allow users to show or hide the navigation menu', async () => {
    const navMenu = page.locator(
      '#root > div:nth-child(1) > div > aside:nth-child(2) > div'
    );
    const navMenuToggler = page.getByRole('button', {
      name: 'show/hide navigation menu',
    });

    await expect(navMenu).toHaveClass(/sidebar-container show-sidebar/);

    await navMenuToggler.click();
    await expect(navMenu).toHaveClass(/sidebar-container/);

    await navMenuToggler.click();
    await expect(navMenu).toHaveClass(/sidebar-container show-sidebar/);
  });

  test('should allow users to navigate to a specific page with the navigation menu', async () => {
    await page.getByRole('link', { name: 'all jobs' }).click();
    await expect(page).toHaveURL(/all-jobs/);

    await page.getByRole('link', { name: 'add job' }).click();
    await expect(page).toHaveURL(/add-job/);

    await page.getByRole('link', { name: 'profile' }).click();
    await expect(page).toHaveURL(/profile/);
  });

  test('should allow users to sign out', async () => {
    await page.getByRole('button', { name: 'User' }).click();
    await page.getByRole('button', { name: 'sign out' }).click();

    await expect(page.getByRole('heading')).toHaveText('Job Tracking App');
  });
});
