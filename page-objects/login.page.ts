import { expect, type Page } from "@playwright/test";
import type { UserCredentials } from "../test-data/testdata";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToLoginPage(): Promise<LoginPage> {
    await this.page.goto("/auth/login");
    return this;
  }

  public async signIn(creds: UserCredentials): Promise<LoginPage> {
    
    await this.page.locator('[data-test="email"]').click();
    await this.page.locator('[data-test="email"]').fill(creds.email);
    await this.page.locator('[data-test="password"]').click();
    await this.page.locator('[data-test="password"]').fill(creds.password);
    
    const [loginRes] = await Promise.all([
      this.page.waitForResponse(res =>
        res.url().includes("/users/login") &&
        res.request().method() === "POST"
      ),
      this.page.locator('[data-test="login-submit"]').click(),
    ]);

    await expect(loginRes.ok()).toBeTruthy();

    return this;
  }
}
