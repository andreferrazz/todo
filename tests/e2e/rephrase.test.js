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

test('rephrase a task via inline edit', async ({ page }) => {
  const input = page.locator('#add-input');
  await input.fill('Hard task');
  await page.locator('button[type="submit"]').click();

  // Hover to reveal edit button, then click
  const taskRow = page.locator('.group').first();
  await taskRow.hover();
  await page.locator('button[title="Rephrase"]').click();

  // Input should appear with current text
  const editInput = page.locator('input[class*="border-blue-300"]');
  await expect(editInput).toBeVisible();
  await expect(editInput).toHaveValue('Hard task');

  // Type new text and press Enter
  await editInput.fill('Do 5 minutes on hard task');
  await editInput.press('Enter');

  // Verify updated text
  await expect(page.getByText('Do 5 minutes on hard task')).toBeVisible();
  await expect(page.getByText('Hard task', { exact: true })).not.toBeVisible();
});

test('escape cancels rephrase without saving', async ({ page }) => {
  const input = page.locator('#add-input');
  await input.fill('Keep this text');
  await page.locator('button[type="submit"]').click();

  const taskRow = page.locator('.group').first();
  await taskRow.hover();
  await page.locator('button[title="Rephrase"]').click();

  const editInput = page.locator('input[class*="border-blue-300"]');
  await editInput.fill('Changed text');
  await editInput.press('Escape');

  // Original text should remain
  await expect(page.getByText('Keep this text')).toBeVisible();
});
