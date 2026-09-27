import { expect } from "@playwright/test";

class Inventory {
  constructor(page) {
    this.page = page;
    this.InventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.selectOptions = page.locator('[data-test="product-sort-container"]');
    this.inventoryPrice = page.locator('[data-test="inventory-item-price"]');
    this.inventoryName = page.locator('[data-test="inventory-item-name"]');
  }

   getProductCard(productName) {
    return  this.InventoryItems.filter({ hasText: productName });
  }

  async getInventory() {
    return await this.inventoryName.allTextContents();
  }

  async getPrice() {
    const priceText = await this.inventoryPrice.allTextContents();
    return  priceText.map((price) => Number(price.replace("$", "")));
  }

  async addProduct(productName) {
    const productCard = this.getProductCard(productName);
    await productCard.getByRole("button", { name: "Add to cart" }).click();
  }

  async getCartCount() {
    const hasBadge = await this.cartBadge.count();
    if (hasBadge === 0) return 0;
    return Number(await this.cartBadge.textContent());
  }

  async verifyOption(options) {
    await this.selectOptions.selectOption(options);
    await expect(this.selectOptions).toHaveValue(options);
    const productNames = await this.getInventory();

    const actualNames = [...productNames];
    const actualPrices = await this.getPrice();

    let expectedNames;
    let expectedPrices;

    switch (options) {
      case "az":
        expectedNames = [...actualNames].sort();
        expect(actualNames).toEqual(expectedNames);
        break;

      case "za":
        expectedNames = [...actualNames].sort().reverse();
        expect(actualNames).toEqual(expectedNames);
        break;

      case "lohi":
        expectedPrices = [...actualPrices].sort((a, b) => a - b);
        expect(actualPrices).toEqual(expectedPrices);
        break;

      case "hilo":
        expectedPrices = [...actualPrices].sort((a, b) => b - a);
        expect(actualPrices).toEqual(expectedPrices);
        break;

      default:
        throw new Error(`Unsupported sort option: ${options}`);
    }
  }
}

export default Inventory;
