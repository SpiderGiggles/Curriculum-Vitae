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

    async clickPaymentDropDown() {
        const dropdown = await this.page.locator('[data-test="payment-method"]');
        await dropdown.click();
        await dropdown.selectOption('cash-on-delivery');
    }

    async clickConfirm() {
        const confirmButton = await this.page.locator('[data-test="finish"]');
        await confirmButton.click();
        await this.page.waitForResponse(
            (Response) =>
              Response.url().includes("/payment/check") &&
              Response.request().method() == "POST" &&
              Response.status() == 200
          );
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
        await this.actions.clickPaymentDropDown();
        await this.actions.clickConfirm();
        return this;
    }
}
