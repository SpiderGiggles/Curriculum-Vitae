import { test, expect } from "@playwright/test";
import { getUserCredentials } from "../../test-data/testdata";
import { LoginPage } from "../../page-objects/login.page";

test.describe.parallel("Login", () => {
  test("Successfully login", async ({ page }) => {
    await new LoginPage(page).goToLoginPage().then((p) => p.signIn(getUserCredentials()));
  });
});
