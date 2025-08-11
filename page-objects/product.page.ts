import { expect, Page } from "@playwright/test";
import { NavigationMenu } from "../page-components/navigation-menu.page.components";

class ProductPageActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickAddToCart() {
    const addToCart = await this.page.locator('[data-test="add-to-cart"]');
    await addToCart.click();
    return this.page.waitForResponse(
      (Response) =>
        Response.url().includes("/carts/") &&
        Response.request().method() == "POST" &&
        Response.status() == 200
    );
  }

  async clickFavourites() {
    const clickFavouritesButton = await this.page.locator(
      '[data-test="add-to-favorites"]'
    );
    await clickFavouritesButton.click();
    return this.page.waitForResponse(
      (response) =>
        response.url().includes("/favorites/") &&
        response.request().method() == "POST" &&
        response.status() == 204
    );
  }
}

export class ProductPage {
  private actions: ProductPageActions;
  readonly navigation: NavigationMenu;

  constructor(page: Page) {
    this.actions = new ProductPageActions(page);
    this.navigation = new NavigationMenu(page);
  }

  async clickAddToCart() {
    return await this.actions.clickAddToCart();
  }

  async clickFavourites() {
    return await this.actions.clickFavourites();
  }
}
