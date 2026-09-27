import { expect } from "@playwright/test";

class Checkout {
  constructor(page) {
    this.page = page;

    this.subtotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');

    this.finishButton = page.getByRole("button", { name: "Finish" });
    this.thankYouMessage = page.getByText("Thank you for your order!");
  }

  async verifyTotal() {
    const subtotalText = await this.subtotal.textContent();
    const taxText = await this.tax.textContent();
    const totalText = await this.total.textContent();

    const subtotal = Number(subtotalText.replace("Item total: $", ""));
    const tax = Number(taxText.replace("Tax: $", ""));
    const total = Number(totalText.replace("Total: $", ""));

    expect(subtotal + tax).toBeCloseTo(total, 2);
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async verifyThankYouMessage() {
    await expect(this.thankYouMessage).toBeVisible();
  }
}

export default Checkout;
