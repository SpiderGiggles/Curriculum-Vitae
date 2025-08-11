import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/home.page';
import testData from '../../test-data/testdata.json';
import { productData } from '../../test-data/testdata';

test('should select a specific product', async ({ page }) => {
    const homePage = new HomePage(page);
    const productData = testData.find(data => data.name === "products")!.testData as productData;
    await page.goto('/');
    await homePage.selectSpecificProduct(productData.lnp);
  });