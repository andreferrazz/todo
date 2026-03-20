import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(async () => {
    const dbs = await indexedDB.databases();
    for (const db of dbs) {
      if (db.name) indexedDB.deleteDatabase(db.name);
    }
  });
  await page.reload();
  await page.locator('#add-input').waitFor();
});

test('add tasks and verify they appear in order', async ({ page }) => {
  const input = page.locator('#add-input');
  const submitBtn = page.locator('button[type="submit"]');

  await input.fill('Task A');
  await submitBtn.click();
  await input.fill('Task B');
  await submitBtn.click();
  await input.fill('Task C');
  await submitBtn.click();

  const tasks = page.locator('#active-tasks .task-text, #active-tasks span.text-gray-700');
  await expect(page.getByText('Task A')).toBeVisible();
  await expect(page.getByText('Task B')).toBeVisible();
  await expect(page.getByText('Task C')).toBeVisible();
});

test('dot a task moves it to dotted section', async ({ page }) => {
  const input = page.locator('#add-input');
  const submitBtn = page.locator('button[type="submit"]');

  await input.fill('Easy task');
  await submitBtn.click();

  // Click the dot button (empty circle)
  const dotBtn = page.locator('button[title="Dot this task"]');
  await dotBtn.click();

  // Task should now be in dotted section
  await expect(page.getByText('Dotted tasks')).toBeVisible();
  await expect(page.getByText('Easy task')).toBeVisible();

  // Active section should show empty message
  await expect(page.getByText('No tasks yet')).toBeVisible();
});

test('complete a dotted task removes it', async ({ page }) => {
  const input = page.locator('#add-input');
  const submitBtn = page.locator('button[type="submit"]');

  await input.fill('Complete me');
  await submitBtn.click();

  // Dot it
  await page.locator('button[title="Dot this task"]').click();

  // Complete it
  await page.getByRole('button', { name: 'Done' }).click();

  // Should be gone
  await expect(page.getByText('Complete me')).not.toBeVisible();
  await expect(page.getByText('No tasks yet')).toBeVisible();
});

test('re-enter a dotted task adds it back at the end', async ({ page }) => {
  const input = page.locator('#add-input');
  const submitBtn = page.locator('button[type="submit"]');

  await input.fill('First task');
  await submitBtn.click();
  await input.fill('Re-enter me');
  await submitBtn.click();

  // Dot the second task
  const dotBtns = page.locator('button[title="Dot this task"]');
  await dotBtns.nth(1).click();

  // Click Re-enter
  await page.getByRole('button', { name: 'Re-enter' }).click();

  // Edit the text and save
  const editInput = page.locator('input[class*="border-blue-300"]');
  await editInput.fill('Re-entered version');
  await editInput.press('Enter');

  // Re-entered task should appear in active list
  await expect(page.getByText('Re-entered version')).toBeVisible();
  // Original should be gone from dotted
  await expect(page.getByText('Re-enter me')).not.toBeVisible();
});

test('undot all resets dotted tasks', async ({ page }) => {
  const input = page.locator('#add-input');
  const submitBtn = page.locator('button[type="submit"]');

  await input.fill('Task A');
  await submitBtn.click();
  await input.fill('Task B');
  await submitBtn.click();

  // Dot both — wait for first dot to take effect before clicking second
  await page.locator('button[title="Dot this task"]').first().click();
  await expect(page.locator('button[title="Dot this task"]')).toHaveCount(1);
  await page.locator('button[title="Dot this task"]').click();

  // Both should be dotted
  await expect(page.getByText('Dotted tasks')).toBeVisible();

  // Undot all
  await page.getByText('Undot all').click();

  // Both should be back in active list
  await expect(page.getByText('Task A')).toBeVisible();
  await expect(page.getByText('Task B')).toBeVisible();
  await expect(page.getByText('Dotted tasks')).not.toBeVisible();
});
