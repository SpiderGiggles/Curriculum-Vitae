import { expect, type Page } from "@playwright/test";
import type { userCredentials, registerData } from "../test-data/testdata";
import { compliantEmail, compliantPassword } from "../utils/string-utils";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToLoginPage(): Promise<LoginPage> {
    await this.page.goto("/auth/login");
    return this;
  }

  async goToRegisterPage(): Promise<LoginPage> {
    await this.page.goto("/auth/register");
    return this;
  }

  public async register(
    registerData: registerData,
  ): Promise<userCredentials> {

    const generatedEmail = compliantEmail();
    const generatedPassword = compliantPassword();

    // Fill registration form with data from testdata.json
    await this.page.locator('[data-test="first-name"]').fill(registerData.firstName);
    await this.page.locator('[data-test="last-name"]').fill(registerData.lastName);
    await this.page.locator('[data-test="dob"]').fill(registerData.dob);
    await this.page.locator('[data-test="street"]').fill(registerData.street);
    await this.page.locator('[data-test="postal_code"]').fill(registerData.postcode);
    await this.page.locator('[data-test="city"]').fill(registerData.city);
    await this.page.locator('[data-test="state"]').fill(registerData.state);
    await this.page.locator('[data-test="country"]').click();
    await this.page.locator('[data-test="country"]').selectOption({ label: registerData.country});
    await this.page.locator('[data-test="phone"]').fill(registerData.phone);
    // Fill generated email and password
    await this.page.locator('[data-test="email"]').fill(generatedEmail);
    await this.page.locator('[data-test="password"]').fill(generatedPassword);

    // Submit registration
    const [registerRes] = await Promise.all([
      this.page.waitForResponse(
        (res) =>
          res.url().includes("/users/register") &&
          res.request().method() === "POST"
      ),
      this.page.locator('[data-test="register-submit"]').click(),
    ]);

    await expect(registerRes.ok()).toBeTruthy();

    return {
      email: generatedEmail,
      password: generatedPassword,
    };
  }

  public async signIn(creds: userCredentials): Promise<LoginPage> {
    await this.page.locator('[data-test="email"]').fill(creds.email);
    await this.page.locator('[data-test="password"]').fill(creds.password);

    const [loginRes] = await Promise.all([
      this.page.waitForResponse(
        (res) =>
          res.url().includes("/users/login") &&
          res.request().method() === "POST"
      ),
      this.page.locator('[data-test="login-submit"]').click(),
    ]);

    await expect(loginRes.ok()).toBeTruthy();

    return this;
  }
}
