import { Page, expect } from "@playwright/test";
import { HomePage } from "../page-objects/home.page";
import { LoginPage } from "../page-objects/login.page";

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

  async goToHomeViaButton(): Promise<HomePage> {
    await this.actions.page.locator('[data-test="nav-home"]').click();
    await expect(this.actions.page).toHaveURL(
      "https://practicesoftwaretesting.com/"
    );
    return new HomePage(this.actions.page);
  }

  async goToHomeViaLogo(): Promise<HomePage> {
    await this.actions.page
      .getByRole("link", { name: "Practice Software Testing -" })
      .click();
    await expect(this.actions.page).toHaveURL(
      "https://practicesoftwaretesting.com/"
    );
    return new HomePage(this.actions.page);
  }

  async selectLanguage(languageCode: "DE" | "EN" | "ES" | "FR" | "NL" | "TR"): Promise<void> {
    await this.actions.openLanguageDropdown();
    const locator = await this.actions.page.locator('[aria-labelledby="language"]');
    await locator.filter({ hasText: languageCode}).click();
    await expect(locator).not.toBeVisible();
  }

  async goToHandTools(): Promise<HomePage>  {
    await this.actions.openCategoriesDropdown();
    await this.actions.page.locator('[data-test="nav-hand-tools"]').click();
    await expect(this.actions.page).toHaveURL(/\/category\/hand-tools/);
    return new HomePage(this.actions.page);
  }

  async goToPowerTools(): Promise<HomePage>  {
    await this.actions.openCategoriesDropdown();
    await this.actions.page.locator('[data-test="nav-power-tools"]').click();
    await expect(this.actions.page).toHaveURL(/\/category\/power-tools/);
    return new HomePage(this.actions.page);
  }

  async goToRentals(): Promise<void>   {
    await this.actions.openCategoriesDropdown();
    await this.actions.page.locator('[data-test="nav-rentals"]').click();
    await expect(this.actions.page).toHaveURL(/\/rentals/);
  }

  async goToContact(): Promise<void> {
    await this.actions.page.locator('[data-test="nav-contact"]').click();
    await expect(this.actions.page).toHaveURL(/\/contact/);
  }

  async goToSignIn(): Promise<LoginPage>   {
    await this.actions.page.locator('[data-test="nav-sign-in"]').click();
    await expect(this.actions.page).toHaveURL(/\/auth\/login/);
    return new LoginPage(this.actions.page);
  }

  async goToMyAccount(): Promise<void>  {
    await this.actions.openUserMenuDropdown();
    await this.actions.page.locator('[data-test="nav-my-account"]').click();
    await expect(this.actions.page).toHaveURL(/\/account/);
  }

  async goToMyFavorites(): Promise<void>  {
    await this.actions.openUserMenuDropdown();
    await this.actions.page.locator('[data-test="nav-my-favorites"]').click();
    await expect(this.actions.page).toHaveURL(/\/account\/favorites/);
  }

  async goToMyProfile(): Promise<void>  {
    await this.actions.openUserMenuDropdown();
    await this.actions.page.locator('[data-test="nav-my-profile"]').click();
    await expect(this.actions.page).toHaveURL(/\/account\/profile/);
  }

  async goToMyInvoices(): Promise<void>  {
    await this.actions.openUserMenuDropdown();
    await this.actions.page.locator('[data-test="nav-my-invoices"]').click();
    await expect(this.actions.page).toHaveURL(/\/account\/invoices/);
  }

  async goToMyMessages(): Promise<void>  {
    await this.actions.openUserMenuDropdown();
    await this.actions.page.locator('[data-test="nav-my-messages"]').click();
    await expect(this.actions.page).toHaveURL(/\/account\/mesages/);
  }

  async goToMySignOut(): Promise<void>  {
    await this.actions.openUserMenuDropdown();
    await this.actions.page.locator('[data-test="nav-sign-out"]').click();
    await expect(this.actions.page).toHaveURL(/\/auth\/login/);
  }

  async goToMyCart(): Promise<void>  {
    const myCart = await this.actions.page.locator('[data-test="nav-cart"]');
    await myCart.click();
    await expect(this.actions.page).toHaveURL(/\/checkout/);
  }
}
