import { expect } from "@playwright/test";

class Cart {
  constructor(page) {
    this.page = page;

    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });

    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
  }

  async goToCart() {
    await this.cartButton.click();
  }

  async verifyProductsInCart(productNames) {
    const actualProducts = await this.productNames.allTextContents();

    for (const productName of productNames) {
      expect(actualProducts).toContain(productName);
    }
  }

  async removeProduct(productName) {
    const productCard = this.cartItems.filter({
      hasText: productName,
    });

    await productCard.getByRole("button", { name: "Remove" }).click();
  }

  async verifyProductNotInCart(productName) {
    const actualProducts = await this.productNames.allTextContents();

    expect(actualProducts).not.toContain(productName);
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  async fillCheckoutDetails(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }
}

export default Cart;
