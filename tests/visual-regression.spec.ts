import { test, expect } from '@playwright/test';

test.describe('Day 34: Visual Regression Testing', () => {

    test('Verify full page layout againts baseline snapshot', async ({ page }) => {
        // Navigate ti targer application
        await page.goto('https://demo.playwright.dev/todomvc/#/');

        // Perform visual snapshot comparison on the whole page
        await expect(page).toHaveScreenshot('todomvc-home-page.png', {
            // Allow up to 100 pixels to differ (prevents OS fonr rendering flakiness)
            maxDiffPixels: 100,
        });
    });

    test('Verify specific component layout (Header only', async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/#/');

        // Target a specific element instead of the whole viewport
        const header = page.locator('header.header');

        // Take snapshot of ONLY the header element
        await expect(header).toHaveScreenshot('todomvc-header-component.png');

    });

    test('Verify page layout while masking dynamic elements', async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/#/');

        // Add a todo item dynamically so the UI changes
        const newTodo = page.locator('.new-todo');
        await newTodo.fill('Dynamic Tasl for Masking Test');
        await newTodo.press('Enter');

        // Locate the dynamic element (e.g, the todo counter or list item)
        const todoItem = page.locator('.todo-list li');

        // Take a snapshot while masking the dynamic item text
        await expect(page).toHaveScreenshot('todomvc-masked-page.png', {
            mask: [todoItem], // Playwirght covers this element with a magenta box
        });
    });

    test('Detect deliberate visual bug using laypit modification', async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/#/');

        // Inject a style change to simulate a UI bug (e.g, header font/color shifted)
        await page.evaluate(() => {
            const heading = document.querySelector('h1');
            if (heading) {
                heading.style.color = 'red';
                heading.style.fontSize = '80px';
            }
        });

        // Assert against out existing baseline - this SHOULD fail!
        await expect(
            expect(page).toHaveScreenshot('todomvc-home-page.png')
        ).rejects.toThrow();
        });
    });