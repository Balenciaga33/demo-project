import { test, expect } from '@zest-pw/test';
import { loginNegativeCases } from '../data-objects/TC-001.data';
import { LoginPage } from '../page-objects/login.page';

test('Negative login cases', async ({ page }) => {
  const loginPage = new LoginPage(page);

  for (const { title, username, password, errorPattern } of loginNegativeCases) {
    await test.step(`Case: ${title}`, async () => {
      await loginPage.goto();
      await loginPage.login({ username, password });
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(errorPattern);
      await expect(page).not.toHaveURL(/inventory/);
    });
  }
});
