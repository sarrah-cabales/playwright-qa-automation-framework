import { test, expect } from '../fixtures/pageFixtures';

test.describe('SauceDemo Login & Product Tests', () => {

    // This runs ONCE before EVERT test inside this describe block
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
    })

    test('User Successfully Logs in', async ({ page, loginPage }) => {

        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page.getByText('Products')).toBeVisible();
    })

    test('Product page displays Sauce Labs Backpack', async ({ loginPage, productsPage }) => {
        
        await loginPage.login('standard_user', 'secret_sauce');

        const backpack = productsPage.getProductCard('Sauce Labs Backpack');
        await expect(backpack).toBeVisible();

        await productsPage.addProductToCart('Sauce Labs Backpack');
    })
});