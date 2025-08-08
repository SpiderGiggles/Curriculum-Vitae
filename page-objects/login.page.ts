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

  async signIn(creds: UserCredentials): Promise<LoginPage> {
    
    return this;
  }
}
