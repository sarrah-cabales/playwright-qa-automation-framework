import { test, expect } from '@playwright/test';
import { FramePage } from '../pages/FramePage';

test.describe('Month 2: Frame Locators Verification', () => {
    let framePage: FramePage;

    test.beforeEach(async ({ page }) => {
        framePage = new FramePage(page);
        await framePage.navigate();
    });

    test('Should inteact with input fields isolated inside an iframe', async () => {
        await framePage.fillForm('Sarah', 'Automation');

        // Verify input fields inside the frame. hold the entered values
        await expect(framePage.firstnameInput).toHaveValue('Sarah');
        await expect(framePage.lastnameInput).toHaveValue('Automation');
    });
});