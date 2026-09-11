import { test, expect } from '@playwright/test';

test.describe('Day 32: Advanced API Testing', () => {

    test('Query Parameters: Search and filter users dynamically', async ({ request }) => {
        // Send GET request with query params (?page=2)
        const response = await request.get('https://reqres.in/api/users', {
            params: {
                page: 2,
                per_page: 3,
            },
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.page).toBe(2);
        expect(body.per_page).toBe(3);
        expect(body.data.length).toBe(3);
    });

    test('Automation: Send custom Bearer Token in headers', async ({ request }) => {
        // Pass custom headers (e.g Authorization token)
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1', {
            headers: {
                'Authorization': 'Bearer fake_token_abc123',
                'Custom-header': 'Playwright-Framework',
            },
        });

        expect(response.status()).toBe(200);
    });

    test('Negative Testing: Assert 404 for a resources that does not exist', async ({ request }) => {
        // Request a post ID that does not exist
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/999999');

        // Assert that the server returns 404 Not found
        expect(response.status()).toBe(404);
        expect(response.ok()).toBeFalsy();
    });
});