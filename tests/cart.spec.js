import { test } from "@playwright/test";
import { LoginPage } from "../pages/Loginpage";
import Inventory from "../pages/Inventory";
import Cart from "../pages/Cart";
import data from "../data/users";
import { products } from "../data/products";

/** @type {Inventory} */
let inventory;

/** @type {Cart} */
let cart;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  inventory = new Inventory(page);
  cart = new Cart(page);

  await loginPage.login(data.standardUser.username, data.standardUser.password);
});

test("Verify multiple added products are correctly present in cart", async ({
  page,
}) => {
  const selectedProducts = [
    products.Backpacks,
    products.BikeLights,
    products.Tshirt,
  ];

  for (const product of selectedProducts) {
    await inventory.addProduct(product);
  }

  cart.goToCart();

  await cart.verifyProductsInCart(selectedProducts);
});

test("Verify particular product can be removed from cart", async ({ page }) => {
  const selectedProducts = [
    products.Backpacks,
    products.BikeLights,
    products.Tshirt,
  ];

  for (const product of selectedProducts) {
    await inventory.addProduct(product);
  }

  await cart.goToCart();

  const productToRemove = products.BikeLights;

  await cart.removeProduct(productToRemove);

  await cart.verifyProductNotInCart(productToRemove);
});

test("Verify checkout details can be filled", async ({ page }) => {
  const selectedProducts = [products.Backpacks, products.BikeLights];

  for (const product of selectedProducts) {
    await inventory.addProduct(product);
  }

  await cart.goToCart();

  await cart.goToCheckout();

  await cart.fillCheckoutDetails(
    data.checkOutData.name,
    data.checkOutData.lastName,
    data.checkOutData.postalCode,
  );
});
