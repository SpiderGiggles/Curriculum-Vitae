import { test, expect } from "@playwright/test";
import { NavigationMenu } from "../../page-components/navigation-menu.page.components";

test.describe("Language Selector", () => {
  test("Switch to French Language", async ({ page }) => {
    await page.goto("/");
    const navigationMenu = new NavigationMenu(page);

    await navigationMenu.selectLanguage('FR');
    // const nonEnglishLanguages: ('DE' | 'ES' | 'FR' | 'NL' | 'TR')[] = ['DE', 'ES', 'FR', 'NL', 'TR'];

    // for (const language of nonEnglishLanguages) {
    //   await navigationMenu.selectLanguage(language);
    // }

    // await navigationMenu.selectLanguage('EN');
  });
});