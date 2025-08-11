import { expect, Page } from "@playwright/test";

class CheckoutPageActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async firstCheckOutButton() {
        const checkOutButton = await this.page.locator('[data-test="proceed-1"]');
        await checkOutButton.click();
    }

    async secondCheckOutButton() {
        const checkOutButton = await this.page.locator('[data-test="proceed-2"]');
        await checkOutButton.click();
    }

    async thirdCheckOutButton() {
        const checkOutButton = await this.page.locator('[data-test="proceed-3"]');
        await checkOutButton.click();
    }

    async isPaymentDropdownVisible(): Promise<boolean> {
        const dropdown = await this.page.locator('[aria-label="nav-categories"]');
        return dropdown.isVisible();
      }
}

export class CheckoutPage {
    private actions: CheckoutPageActions;

    constructor(page: Page) {
        this.actions = new CheckoutPageActions(page);
    }

    async goToCheckout(): Promise<CheckoutPage> {
        await this.actions.firstCheckOutButton();
        await this.actions.page.waitForLoadState("networkidle");
        await this.actions.secondCheckOutButton();
        await this.actions.page.waitForLoadState("networkidle");
        await this.actions.thirdCheckOutButton();
        await this.actions.page.waitForLoadState("networkidle");
        return this;
    }
}
