import { test, expect } from '@playwright/test';

test('navigate to info page and back', async ({ page }) => {
  await page.goto('/');
  await page.locator('#add-input').waitFor();

  await page.getByRole('link', { name: 'How it works' }).click();
  await expect(page.getByText('What is Resistance Zero?')).toBeVisible();
  await expect(page.getByText('Core Principles')).toBeVisible();

  await page.getByRole('link', { name: 'Back to tasks' }).click();
  await page.locator('#add-input').waitFor();
  await expect(page.locator('#add-input')).toBeVisible();
});

test('navigate to login page and back', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#username').waitFor();

  await expect(page.getByText('Sign in to sync across devices')).toBeVisible();
  await expect(page.locator('#username')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();

  await page.getByRole('link', { name: 'Use without syncing' }).click();
  await page.locator('#add-input').waitFor();
  await expect(page.locator('#add-input')).toBeVisible();
});
