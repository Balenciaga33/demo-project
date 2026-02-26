import { test, expect } from '@zest-pw/test';

test('Check page title', async ({ page }) => {
  // Auth is done in auth.setup.ts; this test runs with logged-in state (storageState)
  await test.step('Open inventory (post-login)', async () => {
    await page.goto('/inventory.html');
  });

  await test.step('Title check', async () => {
    await expect(page).toHaveTitle(new RegExp('Swag Labs'));
  });
});

