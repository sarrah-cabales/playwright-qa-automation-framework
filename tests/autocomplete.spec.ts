import { test, expect } from '@playwright/test';
import { AutocompletePage } from '../pages/AutocompletePage';

test.describe('Month 2: Dynamic Autocomplete Verification', () => {
    let autocompletePage: AutocompletePage;

    test.beforeEach(async ({ page }) => {
        autocompletePage = new AutocompletePage(page);
        await autocompletePage.navigate();
    });

    test('Should dynamically search and select a color option', async ({ page }) => {
        await autocompletePage.selectColor('Red');

        // Verify the tag was dynamically added to the UI
        const selectTag = page.locator('.auto-complete__multi-value__label', { hasText: 'Red' });
        await expect(selectTag).toBeVisible();
    
    });
});