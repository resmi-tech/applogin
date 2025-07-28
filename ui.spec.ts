import { test, expect } from "@playwright/test";

const URL = "http://localhost:3000";

test.describe("Todo App UI Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test("Login with valid credentials", async ({ page }) => {
    await page.click("text=Login as test/1234");
    await expect(page.locator("text=Todo App")).toBeVisible();
  });

  test("Add and delete todo", async ({ page }) => {
    await page.click("text=Login as test/1234");
    await page.fill("input[placeholder='Enter todo']", "Buy milk");
    await page.click("text=Add");
    await expect(page.locator("li")).toContainText("Buy milk");

    await page.click("text=Delete");
    await expect(page.locator("li")).not.toContainText("Buy milk");
  });
});
