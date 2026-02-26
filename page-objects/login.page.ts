import type { Page } from '@playwright/test';

export class LoginPage {
  private readonly username: string;
  private readonly password: string;

  /**
   * Creates a login page object and reads default credentials from env.
   *
   * @param page Playwright {@link Page} instance for the current browser tab.
   */
  constructor(private readonly page: Page) {
    this.username = process.env.SAUCEDEMO_USERNAME ?? '';
    this.password = process.env.SAUCEDEMO_PASSWORD ?? '';
    if (!this.username || !this.password) {
      throw new Error(
        'SAUCEDEMO_USERNAME and SAUCEDEMO_PASSWORD must be set in .env',
      );
    }
  }

  private get usernameInput() {
    return this.page.locator('[data-test="username"]');
  }

  private get passwordInput() {
    return this.page.locator('[data-test="password"]');
  }

  private get loginButton() {
    return this.page.locator('[data-test="login-button"]');
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  /**
   * Navigates to the login page using BASE_URL from env.
   */
  async goto() {
    const baseURL = process.env.BASE_URL;
    if (!baseURL) throw new Error('BASE_URL must be set in .env or environment');
    await this.page.goto(baseURL);
  }

  /**
   * Performs login with provided or default credentials.
   *
   * @param options Optional overrides for `username` and/or `password`.
   * When omitted, values from env (loaded in the constructor) are used.
   */
  async login(options?: { username?: string; password?: string }) {
    const { username = this.username, password = this.password } = options ?? {};
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

