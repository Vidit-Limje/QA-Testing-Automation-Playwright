const { test, expect } = require('@playwright/test');

// Small helper for visual pauses (clean & readable)
const pause = (ms) => new Promise(res => setTimeout(res, ms));

test('OrangeHRM Login and Dashboard Actions', async ({ page }) => {

  // 1. Launch Application
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  await pause(1500);

  // Login Page Assertions
  await expect(page.getByPlaceholder('Username')).toBeVisible({ timeout: 10000 });
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await pause(1000);

  // -------------------------------
  // 2. Login
  // -------------------------------
  await page.fill('input[name="username"]', 'Admin');
  await pause(500);

  await page.fill('input[name="password"]', 'admin123');
  await pause(500);

  await page.click('button[type="submit"]');

  // Wait for Dashboard
  await page.waitForURL('**/dashboard**', { timeout: 15000 });
  await expect(
    page.getByRole('heading', { name: 'Dashboard' })
  ).toBeVisible({ timeout: 10000 });

  await pause(2000); 

  // -------------------------------
  // Action 1: Navigate to PIM
  // -------------------------------
  await page.getByRole('link', { name: 'PIM' }).click();

  await expect(
    page.getByRole('heading', { name: 'PIM' })
  ).toBeVisible({ timeout: 10000 });

  await pause(1500);

  // Click Add Employee
  await page.getByRole('link', { name: 'Add Employee' }).click();

  await expect(
    page.getByRole('heading', { name: 'Add Employee' })
  ).toBeVisible({ timeout: 10000 });

  await pause(1500);

  // -------------------------------
  // Enter Employee Details
  // -------------------------------
  await page.fill('input[name="firstName"]', 'John');
  await pause(500);

  await page.fill('input[name="lastName"]', 'Doe');
  await pause(2000); 

  // -------------------------------
  // Action 2: Open My Info
  // -------------------------------
  await page.getByRole('link', { name: 'My Info' }).click();

  await expect(
    page.getByRole('heading', { name: 'Personal Details' })
  ).toBeVisible({ timeout: 10000 });

  await pause(2000);

});
