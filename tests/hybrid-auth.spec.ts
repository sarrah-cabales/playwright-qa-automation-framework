import { test, expect } from '@playwright/test';

test.describe('Day 33: Hybrid API + UI Testing', () => {

    test('Bypass UI setup by pre-population browser storage', async ({ page }) => {
        // Simulate receiving initial state or auth session from an API payload
        const initialTodos = [
            { id: '1', title: 'Task 1 created via API/State Seeding', completed: false },
            { id: '2', title: 'Task 2 created via API/State Seeding', completed: true },
        ];

        // Inject state directy into localStorage BEFORE navigating to the page
        await page.addInitScript((todos) => {
            window.localStorage.setItem('react-todos', JSON.stringify(todos));
        }, initialTodos);

        // Navigate directly to the UI page
        await page.goto('https://demo.playwright.dev/todomvc/#/');

        // Assert that the UI immediately renders the seeded data without manual typing
        const todoItems = page.locator('.todo-list li');
        await expect(todoItems).toHaveCount(2);
        await expect(todoItems.nth(0)).toHaveText('Task 1 created via API/State Seeding');
        await expect(todoItems.nth(1)).toHaveText('Task 2 created via API/State Seeding');
        
    });
});