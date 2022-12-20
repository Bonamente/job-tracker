import { test, expect } from '@playwright/test';

test.describe('NotFound page', () => {
  test('should show users the NotFound page and allow them to navigate to the Main page', async ({
    page,
  }) => {
    await page.goto('/bad-route');

    expect(
      page.getByRole('heading', { name: /sorry, page not found/i })
    ).toBeVisible();

    await page.getByRole('link', { name: /back home/i }).click();
    await expect(page).toHaveURL('/main');
  });
});
