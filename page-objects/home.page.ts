import { Page } from "@playwright/test";
import { NavigationMenu } from "../page-components/navigation-menu.page.components";

class HomePageActions {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}

export class HomePage {
  private actions: HomePageActions;
  readonly navigation: NavigationMenu;

  constructor(page: Page) {
    this.actions = new HomePageActions(page);
    this.navigation = new NavigationMenu(page);
  }
}