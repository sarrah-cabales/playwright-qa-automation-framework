import { test, expect } from '../fixtures/pageFixtures';

test.describe('Visual Regression Tests', () => {

    test('Visual check: Login Page layout', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');

        // Capture baseline screenshots of the Login page
        await expect(page).toHaveScreenshot('login-page.png');
            maxDiffPixelRatio: 0.02
    });

    test('Visual check: Inventory Page layout', async ({ page, loginPage }) => {
        await page.goto('https://www.saucedemo.com');
        await loginPage.login('standard_eser', 'secret_sauce');

        // Capture basaeline screenshot of the Inventory page
        await expect(page).toHaveScreenshot('inventory-page.png');
            maxDiffPixelRatio: 0.02

        //Mask dynamic elements (like the shopping cart container or spesific item)
            mask: [
                page.locator('.shopping_cart_link'),
                page.locator('.inventory_item_img').first()
            ]

    });
});