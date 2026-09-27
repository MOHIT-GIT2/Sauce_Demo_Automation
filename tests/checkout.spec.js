import { test } from "@playwright/test";

import { LoginPage } from "../pages/Loginpage";
import Inventory from "../pages/Inventory";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

import data from "../data/users";
import { products } from "../data/products";

/** @type {Inventory} */
let inventory;

/** @type {Cart} */
let cart;

/** @type {Checkout} */
let checkout;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  inventory = new Inventory(page);
  cart = new Cart(page);
  checkout = new Checkout(page);

  await loginPage.login(data.standardUser.username, data.standardUser.password);

  await inventory.addProduct(products.Backpacks);

  await cart.goToCart();

  await cart.goToCheckout();

  await cart.fillCheckoutDetails(
    data.checkOutData.name,
    data.checkOutData.lastName,
    data.checkOutData.postalCode,
  );

  await page.getByRole("button", { name: "Continue" }).click();
});

test("Verify item total plus tax equals total amount", async () => {
  await checkout.verifyTotal();
});

test("Verify thank you message after finishing order", async () => {
  await checkout.finishOrder();

  await checkout.verifyThankYouMessage();
});
