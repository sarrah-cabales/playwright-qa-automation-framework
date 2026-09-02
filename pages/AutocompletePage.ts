import { Page, Locator } from "@playwright/test";

export class AutocompletePage {
    readonly page: Page;
    readonly multiInput: Locator;

    constructor(page: Page) {
        this.page = page;
        // Input locator for the dynamic auto-complete container
        this.multiInput = page.locator('#autoCompleteMultipleInput');
    }

    async navigate() {
        await this.page.goto('https://demoqa.com/auto-complete', {
            waitUntil: 'domcontentloaded',
        });
    }

/**
 *  Types search text into the dynamic component and picks the matching option
 */

async selectColor(colorToSearch: string) {
 // 1. Type into the dynamic input field
 await this.multiInput.fill(colorToSearch);

 // 2. Playwright waits for the option overlay to render dynamically and clicks it
 const dynamicOption = this.page.locator('.auto-complete__option', {
    hasText: colorToSearch,
 }); 

 await dynamicOption.click();
}
}
