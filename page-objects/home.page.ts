import { Page } from "@playwright/test";
import { NavigationMenu } from "../page-components/navigation-menu.page.components";

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
    await this.page.waitForLoadState('networkidle');
  }

  async selectCategoryCheckbox(value: string) {
    // const checkbox = this.page.locator('[data-test="category-01K2AJ7P27TKS2QX2VVX8KQFC3"]');
    const checkbox = this.page.locator(`input[type="checkbox"][value="${value}"]`);
    await checkbox.check();
    await this.page.waitForLoadState('networkidle');
  }

  async unselectCategoryCheckbox(value: string) {
    const checkbox = this.page.locator(`input[type="checkbox"][value="${value}"]`);
    await checkbox.check();
    await this.page.waitForLoadState('networkidle');
  }
}

export class HomePage {
  private actions: HomePageActions;
  readonly navigation: NavigationMenu;

  constructor(page: Page) {
    this.actions = new HomePageActions(page);
    this.navigation = new NavigationMenu(page);
  }

  async selectNameEmpty() {
    await this.actions.openSortingDropdown();
    await this.actions.page
      .locator('[aria-label="sort"]')
      .filter({ hasText: "" })
      .click();
  }

  async selectNameAZ() {
    await this.actions.openSortingDropdown();
    await this.actions.page
      .locator('[aria-label="sort"]')
      .filter({ hasText: "Name (A - Z)" })
      .click();
  }

  async selectNameZA() {
    await this.actions.openSortingDropdown();
    await this.actions.page
      .locator('[aria-label="sort"]')
      .filter({ hasText: "Name (Z - A)" })
      .click();
  }

  async selectPriceHL() {
    await this.actions.openSortingDropdown();
    await this.actions.page
      .locator('[aria-label="sort"]')
      .filter({ hasText: "Price (High - Low)" })
      .click();
  }

  async selectPriceLH() {
    await this.actions.openSortingDropdown();
    await this.actions.page
      .locator('[aria-label="sort"]')
      .filter({ hasText: "Price (Low - High)" })
      .click();
  }

  async setPriceRange(minValue: number, maxValue: number) {
    if (minValue < 0 || maxValue > 200 || minValue > maxValue) {
    } else {
      await this.actions.setPriceRange(minValue, maxValue);
    }
  }

  async searchForProduct(productName: string) {
    await this.actions.clickSearchField();
    await this.actions.writeInSearchField(productName);
    await this.actions.clickSearchButton();
  }

  async clearSearch() {
    await this.actions.clearSearchField();
  }
}
