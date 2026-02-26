import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { authFile } from '../playwright.config';
import { LoginPage } from '../page-objects/login.page';

setup('authenticate user for SauceDemo', async ({ page }) => {
  // Ensure auth directory exists
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();

  // Verify login succeeded (expect auto-waits for URL)
  await expect(page).toHaveURL(/inventory\.html/);

  // Save authenticated storage state for reuse in tests
  await page.context().storageState({ path: authFile });
});
