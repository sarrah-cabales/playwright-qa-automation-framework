import { webkit } from "@playwright/test";

(async () => {
    const browser = await webkit.launch();

    const page = await browser.newPage();

    await page.goto('https://www.saucedemo.com/');

    console.log('Webkit launched successfully');

    await browser.close();
})();