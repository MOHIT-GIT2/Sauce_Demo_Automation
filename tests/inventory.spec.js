// @ts-check
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Loginpage";
import data from "../data/users";
import { products } from "../data/products";
import Inventory from "../pages/Inventory";
import { sortingOptions } from "../data/sortingOptions";

/** @type {Inventory} */
let inventory;

test.beforeEach(async ({ page }) => {
  const loginpage = new LoginPage(page);
  inventory = new Inventory(page);
  await loginpage.login(data.standardUser.username, data.standardUser.password);
});

test("Verify inventory products are displayed", async ({ page }) => {
  const product = page.locator('[data-test="inventory-item"]');
  await expect(product).toHaveCount(Number(process.env.PRODUCT_COUNT));
});

test("Verify item added to cart", async ({ page }) => {
  await inventory.addProduct(products.Backpacks);
  const cartCount = await inventory.getCartCount();
  expect(cartCount).toBe(1);
});

test.describe("Testing sort", () => {
  test("Sort Checking from A to Z", async ({ page }) => {
    await inventory.verifyOption(sortingOptions.A_Z);
  });

  test("Sort Checking from Z to A", async ({ page }) => {
    await inventory.verifyOption(sortingOptions.Z_A);
  });

  test("Sort Checking from Low to High", async ({ page }) => {
    await inventory.verifyOption(sortingOptions.Low_to_High);
  });

  test("Sort Checking from High to Low", async ({ page }) => {
    await inventory.verifyOption(sortingOptions.High_to_low);
  });
});
