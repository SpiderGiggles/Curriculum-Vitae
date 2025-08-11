import { expect, type Page } from "@playwright/test";
import type { userCredentials, registerData } from "../test-data/testdata";
import { compliantEmail, compliantPassword } from "../utils/string-utils";


class LoginPageActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillRegistrationForm(registerData: registerData, email: string, password: string) {
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
    await this.page.locator('[data-test="email"]').fill(email);
    await this.page.locator('[data-test="password"]').fill(password);
  }

  async fillLoginForm(creds: userCredentials) {
    await this.page.locator('[data-test="email"]').fill(creds.email);
    await this.page.locator('[data-test="password"]').fill(creds.password);
  }
}

export class LoginPage {
  private actions: LoginPageActions;

  constructor(page: Page) {
    this.actions = new LoginPageActions(page);
  }

  async goToLoginPage(): Promise<LoginPage> {
    await this.actions.page.goto("/auth/login");
    return this;
  }

  async goToRegisterPage(): Promise<LoginPage> {
    await this.actions.page.goto("/auth/register");
    return this;
  }

  async register(registerData: registerData): Promise<userCredentials> {
    const generatedEmail = compliantEmail();
    const generatedPassword = compliantPassword();

    await this.actions.fillRegistrationForm(registerData, generatedEmail, generatedPassword);

    const [registerRes] = await Promise.all([
      this.actions.page.waitForResponse(
        (res) => res.url().includes("/users/register") && res.request().method() === "POST"
      ),
      this.actions.page.locator('[data-test="register-submit"]').click(),
    ]);

    await expect(registerRes.ok()).toBeTruthy();

    return { email: generatedEmail, password: generatedPassword };
  }

  async signIn(creds: userCredentials): Promise<LoginPage> {
    await this.actions.fillLoginForm(creds);

    const [loginRes] = await Promise.all([
      this.actions.page.waitForResponse(
        (res) => res.url().includes("/users/login") && res.request().method() === "POST"
      ),
      this.actions.page.locator('[data-test="login-submit"]').click(),
    ]);

    await expect(loginRes.ok()).toBeTruthy();
    return this;
  }
}