import { test, expect } from '@playwright/test';

test.describe('API Testing with Playwright', () => {

    test('GET: Fetch list of users and validate response payload', async ({ request }) => {
        // Send a direct GET request
        const response = await request.get('https://jsonplaceholder.typicode.com/users');

        // Asser HTTP status code and status ok
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        // Parse JSON response body
        const users = await response.json();

        // Validate payload structure. & content
        expect(users.length).toBeGreaterThan(0);
        expect(users[0]).toHaveProperty('id');
        expect(users[0]).toHaveProperty('name');
    });

    test('POST: Create a new usesr post and assert 201 Created Status', async ({ request }) => {
        const payload = {
            title: 'Automated API Test Post',
            body: 'Testing API endpoints direclty via Playwright request contex.',
            userId: 1,
        };

        // Send POST request with JSON payload
        const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
            data: payload,
        });

        // 1. Assert Created Status code
        expect(response.status()).toBe(201);

        // Parse and validate returned record
        const responseBody = await response.json();
        expect(responseBody.title).toBe(payload.title);
        expect(responseBody.userId).toBe(payload.userId);
        expect(responseBody).toHaveProperty('id'); // API assignes a new ID
    })

    test('PUT: Update an exisitng post and asser 200 OK', async ({ request }) => {
        const updatePayload = {
            id: 1,
            title: 'Update Post Title via Playwright',
            body: 'This content was modified using an API PUT request.',
            userId: 1,
        };

        // Send PUT request to update post #1
        const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
            data: updatePayload,
        });

        // Assert Status Code 200 (Success / Updated)
        expect(response.status()).toBe(200);

        // Parse and validate updaated values
        const responseBody = await response.json();
        expect(responseBody.title).toBe(updatePayload.title);
        expect(responseBody.body).toBe(updatePayload.body);
    });

    test('DELETE: Remove a post and assert 200 OK', async ({ request }) => {
        // Send DELETE request for post #1
        const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');

        // Assert Status Code 200 OK (or 204 No Content depending on API spec)
        expect(response.status()).toBe(200);

        // Assert that the returned object is empty
        const responseBody = await response.json();
        expect(Object.keys(responseBody).length).toBe(0);
    })
});