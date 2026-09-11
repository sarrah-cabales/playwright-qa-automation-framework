import { test, expect } from '@playwright/test';

// Tell playwright to load our saved storage file BEFORE launching this test!
test.use({ storageState: 'playwright/.auth/state.json' });

test('Verify page opens with pre-saved storageState', async ({ page }) => {
    // Navigate direclty to the app
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    // Assert that the item from our saved state file automatically appears!
    const todoItem =page.locator('.todo-list li');
    await expect(todoItem).toHaveCount(1);
    await expect(todoItem).toHaveText('Session Task Saved via storageState');
});