import { Page } from '@playwright/test';

export class ProductsPage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addProductToCart(productName: string) {

        const productCard = this.getProductCard(productName);
            
        await productCard
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }

    getProductCard(productName: string) {
        return this.page
            .locator('[data-test="inventory-item"]')
            .filter({
                hasText: productName
            });
    }
}
