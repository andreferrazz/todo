import { test, expect } from '@playwright/test';

test('navigate to signup page and see form fields', async ({ page }) => {
  await page.goto('/signup');
  await page.locator('#username').waitFor();

  await expect(page.getByText('Create an account to sync across devices')).toBeVisible();
  await expect(page.locator('#username')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.locator('#confirm-password')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toHaveText('Create account');
});

test('navigate from login to signup', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#username').waitFor();

  await page.getByRole('link', { name: 'Create an account' }).click();
  await page.locator('#confirm-password').waitFor();
  await expect(page.getByText('Create an account to sync across devices')).toBeVisible();
});

test('navigate from signup to login', async ({ page }) => {
  await page.goto('/signup');
  await page.locator('#username').waitFor();

  await page.getByRole('link', { name: 'Already have an account? Sign in' }).click();
  await page.locator('#username').waitFor();
  await expect(page.getByText('Sign in to sync across devices')).toBeVisible();
});

test('show error when passwords do not match', async ({ page }) => {
  await page.goto('/signup');
  await page.locator('#username').waitFor();

  await page.locator('#username').fill('testuser');
  await page.locator('#password').fill('password123');
  await page.locator('#confirm-password').fill('different');
  await page.locator('button[type="submit"]').click();

  await expect(page.getByText('Passwords do not match')).toBeVisible();
});

test('show error when username is taken', async ({ page }) => {
  await page.route('http://localhost:3000/', (route) =>
    route.fulfill({ status: 409, contentType: 'application/json', body: '{"error":"conflict"}' }),
  );

  await page.goto('/signup');
  await page.locator('#username').waitFor();

  await page.locator('#username').fill('existing');
  await page.locator('#password').fill('password123');
  await page.locator('#confirm-password').fill('password123');
  await page.locator('button[type="submit"]').click();

  await expect(page.getByText('Username already taken')).toBeVisible();
});

test('successful signup redirects to home', async ({ page }) => {
  await page.route('http://localhost:3000/', (route) =>
    route.fulfill({ status: 201, contentType: 'application/json', body: '{"ok":true}' }),
  );
  await page.route('**/_session', (route) => {
    if (route.request().method() === 'POST') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{"ok":true,"name":"newuser","roles":[]}',
      });
    }
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '{"ok":true,"userCtx":{"name":"newuser","roles":[]},"info":{}}',
    });
  });

  await page.goto('/signup');
  await page.locator('#username').waitFor();

  await page.locator('#username').fill('newuser');
  await page.locator('#password').fill('password123');
  await page.locator('#confirm-password').fill('password123');
  await page.locator('button[type="submit"]').click();

  await page.locator('#add-input').waitFor();
  await expect(page.locator('#add-input')).toBeVisible();
});
