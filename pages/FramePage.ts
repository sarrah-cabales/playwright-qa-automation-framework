import { Page, FrameLocator, Locator } from '@playwright/test';

export class FramePage {
    readonly page: Page;
    readonly innerFrame: FrameLocator;
    readonly firstnameInput: Locator;
    readonly lastnameInput: Locator;

    constructor(page: Page) {
        this.page = page;

        // 1. Target the iframe using its ID
        this.innerFrame = page.frameLocator('#firstFr');

        // 2. Locate elements WITHIN the frame contex
        this.firstnameInput = this.innerFrame.locator('input[name="fname"]');
        this.lastnameInput = this.innerFrame.locator('input[name="lname"]');
    }

    async navigate() {
        await this.page.goto('https://letcode.in/frame', {
            waitUntil: 'domcontentloaded',
        });
    }

    async fillForm(firstName: string, lastName: string) {
        await this.firstnameInput.fill(firstName);
        await this.lastnameInput.fill(lastName);

    }
}