import { expect, type Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToLoginPage(): Promise<LoginPage> {
        await this.page.goto( "/auth/login");
        return this;
    }
}