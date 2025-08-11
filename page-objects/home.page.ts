import { expect, Page } from "@playwright/test";
import { ProductPage } from "./product.page";

class HomePageActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isSortingDropdownVisible(): Promise<boolean> {
    const dropdown = await this.page.locator('[aria-label="sort"]');
    return dropdown.isVisible();
  }

  async openSortingDropdown() {
    const isVisible = await this.isSortingDropdownVisible();
    if (!isVisible) {
      await this.page.locator('[data-test="sort"]').click();
    }
  }

  async setPriceRange(minValue: number, maxValue: number) {
    const minHandle = this.page.locator('[aria-label="ngx-slider"]').first();
    const maxHandle = this.page.locator('[aria-label="ngx-slider-max"]');
    const sliderContainer = this.page.locator(".ngx-slider");
    const containerBounds = await sliderContainer.boundingBox();

    if (!containerBounds) {
    } else {
      const minClickX =
        containerBounds.x + (minValue / 200) * containerBounds.width;
      const maxClickX =
        containerBounds.x + (maxValue / 200) * containerBounds.width;
      const clickY = containerBounds.y + containerBounds.height / 2;

      await this.page.mouse.click(minClickX, clickY);
      await this.page.mouse.click(maxClickX, clickY);

      await this.page.waitForLoadState("networkidle");
    }
  }

  async clickSearchField() {
    const search = await this.page.locator('[data-test="search-query"]');
    await search.click();
  }

  async writeInSearchField(searchText: string) {
    const searchInput = this.page.locator('input[placeholder="Search"]');
    await searchInput.fill(searchText);
  }

  async clearSearchField() {
    const clearSearch = this.page.locator('[data-test="search-reset"]');
    await clearSearch.click();
  }

  async clickSearchButton() {
    const searchButton = await this.page.locator('[data-test="search-submit"]');
    await searchButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async selectCategoryCheckbox(cateogryName: string) {
    const checkbox = this.page.locator(
      `input[type="checkbox"][value="${cateogryName}"]`
    );
    await checkbox.check();
    await this.page.waitForLoadState("networkidle");
  }

  async unselectCategoryCheckbox(cateogryName: string) {
    const checkbox = this.page.locator(
      `input[type="checkbox"][value="${cateogryName}"]`
    );
    await checkbox.check();
    await this.page.waitForLoadState("networkidle");
  }

  async selectProduct(productName: string, maxPages: number = 5) {
    let currentPage = 1;
    let productFound = false;

    while (currentPage <= maxPages && !productFound) {
      await this.page.waitForLoadState("networkidle");

      const card = this.page.locator(
        `.card:has(h5[data-test='product-name']:has-text("${productName}"))`
      );
      try {
        await card.waitFor({ state: "visible", timeout: 500 });
        const isProductVisible = await card.isVisible();

        if (isProductVisible) {
          await card.scrollIntoViewIfNeeded();
          await card.click();
          await expect(this.page).toHaveURL(/\/product/);
          productFound = true;
          return;
        }
      } catch (error) {}
      if (currentPage < maxPages) {
        const nextPageFound = await this.navigateToNextPage(currentPage + 1);
        if (!nextPageFound) {
          break;
        }
        currentPage++;
      }
    }
  }

  async navigateToNextPage(pageNumber: number): Promise<boolean> {
    const pageButton = this.page.locator(`[aria-label="Page-${pageNumber}"]`);

    if ((await pageButton.count()) > 0) {
      if (!(await pageButton.isVisible())) {
        await pageButton.scrollIntoViewIfNeeded();
      }
      await pageButton.click();
      await this.page.waitForLoadState("networkidle");
      return true;
    }
    return false;
  }
}

export class HomePage {
  private actions: HomePageActions;

  constructor(page: Page) {
    this.actions = new HomePageActions(page);
  }

  async selectNameEmpty(): Promise<HomePage> {
    await this.actions.openSortingDropdown();
    await this.actions.page
      .locator('[aria-label="sort"]')
      .filter({ hasText: "" })
      .click();
    return this;
  }

  async selectNameAZ(): Promise<HomePage> {
    await this.actions.openSortingDropdown();
    await this.actions.page
      .locator('[aria-label="sort"]')
      .filter({ hasText: "Name (A - Z)" })
      .click();
    return this;
  }

  async selectNameZA(): Promise<HomePage> {
    await this.actions.openSortingDropdown();
    await this.actions.page
      .locator('[aria-label="sort"]')
      .filter({ hasText: "Name (Z - A)" })
      .click();
    return this;
  }

  async selectPriceHL(): Promise<HomePage> {
    await this.actions.openSortingDropdown();
    await this.actions.page
      .locator('[aria-label="sort"]')
      .filter({ hasText: "Price (High - Low)" })
      .click();
    return this;
  }

  async selectPriceLH(): Promise<HomePage> {
    await this.actions.openSortingDropdown();
    await this.actions.page
      .locator('[aria-label="sort"]')
      .filter({ hasText: "Price (Low - High)" })
      .click();
    return this;
  }

  async setPriceRange(minValue: number, maxValue: number): Promise<HomePage> {
    if (minValue < 0 || maxValue > 200 || minValue > maxValue) {
    } else {
      await this.actions.setPriceRange(minValue, maxValue);
    }
    return this;
  }

  async searchForProduct(productName: string): Promise<HomePage> {
    await this.actions.clickSearchField();
    await this.actions.writeInSearchField(productName);
    await this.actions.clickSearchButton();
    return this;
  }

  async clearSearch(): Promise<HomePage> {
    await this.actions.clearSearchField();
    return this;
  }

  async selectSpecificProduct(
    productSpecificName: string,
    maxPages: number = 5
  ): Promise<ProductPage> {
    await this.actions.selectProduct(productSpecificName, maxPages);
    return new ProductPage(this.actions.page);
  }
}
