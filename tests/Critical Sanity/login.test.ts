import { test, expect } from "@playwright/test";
import { userCredentials } from "../../test-data/testdata";
import { LoginPage } from "../../page-objects/login.page";
import testDataJson from "../../test-data/testdata.json";

// Global variable to store generated credentials for the test chain
let generatedCredentials: userCredentials;

test.describe.serial("Registration and Login", () => {
  test("Register new user", async ({ page }) => {
    const login = new LoginPage(page);
    const localData = testDataJson.find(data => data.name === "local")!;
    const registerData = localData.testData;
    await login.goToRegisterPage();
    generatedCredentials = await login.register(registerData);
  });

  test("Login with the registered user", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goToLoginPage();
    await login.signIn(generatedCredentials);
  });
});