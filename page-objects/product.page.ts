import { expect, Page } from "@playwright/test";

class ProductPageActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickAddToCart() {
    const addToCart = await this.page.locator('[data-test="add-to-cart"]');
    const outOfStock = await this.page.locator('[data-test="out-of-stock"]');

    if(outOfStock) {
      const isOutOfStockVisible = await outOfStock.isVisible();
      if(isOutOfStockVisible) {
        const outOfStockText = await outOfStock.textContent();
        if(outOfStockText && outOfStockText.includes('Out of stock')) {
          return null;
        }
      }
    }
    await addToCart.click();
    await this.page.waitForLoadState("networkidle");
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

  constructor(page: Page) {
    this.actions = new ProductPageActions(page);
  }

  async clickAddToCart(): Promise<ProductPage> {
    await this.actions.clickAddToCart();
    return this;
  }

  async clickFavourites(): Promise<ProductPage>  {
    await this.actions.clickFavourites();
    return this;
  }
}
