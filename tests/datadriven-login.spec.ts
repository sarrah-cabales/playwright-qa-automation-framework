import { test, expect } from '../fixtures/pageFixtures';
import loginData from '../data/users.json';


// 2. Loop over dataset to dynamically create 3 distict tests
test.describe('Data-Driven Login Tests', () => {

    for (const data of loginData) {

        test(`Login Attemp: ${data.description}`, async ({ loginPage, page }) => {
            await page.goto('https://www.saucedemo.com');
            await loginPage.login(data.username, data.password);

            if (data.username === 'locked_out_user') {
                await expect(page).toHaveURL(data.expectedUrl);
                await expect(loginPage.errorMessage).toBeVisible();
            } else {
                await expect(page).toHaveURL(data.expectedUrl);
            }
        });
    }
});