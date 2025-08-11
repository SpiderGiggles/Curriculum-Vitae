import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/login.page";
import testDataJson from "../../test-data/testdata.json";
import { registerData, userCredentials, productData } from "../../test-data/testdata";
import { HomePage } from "../../page-objects/home.page";
import { ProductPage } from "../../page-objects/product.page";
import { CheckoutPage } from "../../page-objects/checkout.page";
import { NavigationMenu } from "../../page-components/navigation-menu.page.components";

// Global variable to store generated credentials for the test chain
let generatedCredentials: userCredentials;

test.describe.serial("Registration and Login", () => {
  test("Register new user", async ({ page }) => {
    const login = new LoginPage(page);
    const localData = testDataJson.find(data => data.name === "local")!;
    const registerData = localData.testData as registerData;
    await login.goToRegisterPage();
    generatedCredentials = await login.register(registerData);
  });

  test("Login & purchase products", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goToLoginPage();
    await login.signIn(generatedCredentials);
    const navigation = new NavigationMenu(page);
    await navigation.goToHomeViaButton();
  
    const productData = testDataJson.find(data => data.name === "products")!;
    const products = productData.testData as productData;
  
    const homePage = new HomePage(page);
    await homePage.selectSpecificProduct(products.bc);
  
    const productPage = new ProductPage(page);
    await productPage.clickAddToCart();
  
    const homePageViaLogo = await navigation.goToHomeViaLogo();
    await homePageViaLogo.selectSpecificProduct(products.m4);
    await productPage.clickAddToCart();
  
    const homePageViaButton = await navigation.goToHomeViaButton();
    await homePageViaButton.selectSpecificProduct(products.sledge);
    await productPage.clickAddToCart();
  
    await navigation.goToMyCart();
  
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.goToCheckout();
  });
});