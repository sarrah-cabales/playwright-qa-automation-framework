import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";

// Define the custom fixtures availble to your tests
type MyFixtures = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
};

// Extend Playwright's base test block
export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        // Instantiate using your exact class constructor
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    productsPage: async ({ page }, use) => {
        // Instantiate using your exact class constructor
        const productsPage = new ProductsPage(page);
        await use(productsPage)
    },
});

// Re-export expect so your tests can import both 'test' and 'expect' from one place
export { expect } from '@playwright/test';