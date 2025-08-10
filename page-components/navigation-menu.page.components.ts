import { Page, expect } from "@playwright/test";

class NavigationMenuActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isCategoriesDropdownVisible(): Promise<boolean> {
    const dropdown = await this.page.locator('[aria-label="nav-categories"]');
    return dropdown.isVisible();
  }

  async isLanguageDropdownVisible(): Promise<boolean> {
    const dropdown = await this.page.locator('[aria-labelledby="language"]');
    return dropdown.isVisible();
  }

  async isUserMenuVisible(): Promise<boolean> {
    const dropdown = await this.page.locator('[aria-labelledby="menu"]');
    return dropdown.isVisible();
  }

  async openCategoriesDropdown() {
    const isVisible = await this.isCategoriesDropdownVisible();
    if (!isVisible) {
      await this.page.locator('[data-test="nav-categories"]').click();
    }
  }

  async openLanguageDropdown() {
    const isVisible = await this.isLanguageDropdownVisible();
    if (!isVisible) {
      await this.page.locator('[data-test="language-select"]').click();    }
  }

  async openUserMenuDropdown() {
    const isVisible = await this.isUserMenuVisible();
    if (!isVisible) {
      await this.page.locator('[data-test="nav-menu"]').click();
    }
  }
}

export class NavigationMenu {
  private actions: NavigationMenuActions;

  constructor(page: Page) {
    this.actions = new NavigationMenuActions(page);
  }

  async goToHomeViaButton() {
    await this.actions.page.locator('[data-test="nav-home"]').click();
    await expect(this.actions.page).toHaveURL(
      "https://practicesoftwaretesting.com/"
    );
  }

  async goToHomeViaLogo() {
    await this.actions.page
      .getByRole("link", { name: "Practice Software Testing -" })
      .click();
    await expect(this.actions.page).toHaveURL(
      "https://practicesoftwaretesting.com/"
    );
  }

  async selectLanguage(languageCode: "DE" | "EN" | "ES" | "FR" | "NL" | "TR") {
    await this.actions.openLanguageDropdown();
    const locator = await this.actions.page.locator('[aria-labelledby="language"]');
    await locator.filter({ hasText: languageCode}).click();
    await expect(locator).not.toBeVisible();
  }

  async goToHandTools() {
    await this.actions.openCategoriesDropdown();
    await this.actions.page.locator('[data-test="nav-hand-tools"]').click();
    await expect(this.actions.page).toHaveURL(/\/category\/hand-tools/);
  }

  async goToPowerTools() {
    await this.actions.openCategoriesDropdown();
    await this.actions.page.locator('[data-test="nav-power-tools"]').click();
    await expect(this.actions.page).toHaveURL(/\/category\/power-tools/);
  }

  async goToRentals() {
    await this.actions.openCategoriesDropdown();
    await this.actions.page.locator('[data-test="nav-rentals"]').click();
    await expect(this.actions.page).toHaveURL(/\/rentals/);
  }

  async goToContact() {
    await this.actions.page.locator('[data-test="nav-contact"]').click();
    await expect(this.actions.page).toHaveURL(/\/contact/);
  }

  async goToSignIn() {
    await this.actions.page.locator('[data-test="nav-sign-in"]').click();
    await expect(this.actions.page).toHaveURL(/\/auth\/login/);
  }

  async goToMyAccount() {
    await this.actions.openUserMenuDropdown();
    await this.actions.page.locator('[data-test="nav-my-account"]').click();
    await expect(this.actions.page).toHaveURL(/\/account/);
  }

  async goToMyFavorites() {
    await this.actions.openUserMenuDropdown();
    await this.actions.page.locator('[data-test="nav-my-favorites"]').click();
    await expect(this.actions.page).toHaveURL(/\/account\/favorites/);
  }

  async goToMyProfile() {
    await this.actions.openUserMenuDropdown();
    await this.actions.page.locator('[data-test="nav-my-profile"]').click();
    await expect(this.actions.page).toHaveURL(/\/account\/profile/);
  }

  async goToMyInvoices() {
    await this.actions.openUserMenuDropdown();
    await this.actions.page.locator('[data-test="nav-my-invoices"]').click();
    await expect(this.actions.page).toHaveURL(/\/account\/invoices/);
  }

  async goToMyMessages() {
    await this.actions.openUserMenuDropdown();
    await this.actions.page.locator('[data-test="nav-my-messages"]').click();
    await expect(this.actions.page).toHaveURL(/\/account\/mesages/);
  }

  async goToMySignOut() {
    await this.actions.openUserMenuDropdown();
    await this.actions.page.locator('[data-test="nav-sign-out"]').click();
    await expect(this.actions.page).toHaveURL(/\/auth\/login/);
  }
}
