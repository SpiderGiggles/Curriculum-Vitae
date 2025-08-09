import { test, expect } from "@playwright/test";
import { getUserCredentials } from "../../test-data/testdata";
import { LoginPage } from "../../page-objects/login.page";

test.describe.parallel("Login", () => {
  test("Successfully login", async ({ page }) => {
    const login = new LoginPage(page);
    const creds = getUserCredentials();

    await login.goToLoginPage();
    await login.signIn(creds);
  });
});
