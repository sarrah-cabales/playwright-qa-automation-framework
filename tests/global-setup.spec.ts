import {test as setup, expect } from '@playwright/test';


setup('Authenticate via UI/API ande save storageState', async ({ page }) => {

    await page.goto('https://demo.playwright.dev/todomvc/#/');

    // Add an item manually to create browser state
    const newTodo = page.locator('.new-todo');
    await newTodo.fill('Session Task Saved via storageState');
    await newTodo.press('Enter');

    // Save the entire session state (Cookies + localStorage) to a JSON file on disk
    await page.context().storageState({ path: 'playwright/.auth/state.json' });
})