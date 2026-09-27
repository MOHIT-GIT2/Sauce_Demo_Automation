// @ts-check
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Loginpage";
import data from "../data/users";
import constants from "../data/constants";

test.beforeEach(async ({ page }) => {
  const loginpage = new LoginPage(page);
  await loginpage.login(data.standardUser.username, data.standardUser.password);
});

test("Logging in...", async ({ page }) => {
  await expect(page).toHaveURL(constants.URL.inventory);
  await expect(page.locator('[data-test="title"]')).toBeVisible();
});
