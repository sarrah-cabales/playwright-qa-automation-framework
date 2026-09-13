import { test, expect } from '@playwright/test';

test.describe('Day 35: API Testing Fundamentals', () => {

    test('Verify fetching user data via GET request', async ({ request }) => {
        // Send GET request directly to the API endpoint
        const response = await request.get('https://reqres.in/api/users/2');

        // Assert HTTP response status code is 200 (OK)
        expect(response.status()).toBe(200);

        // Extract the JSON body from the response
        const responseBody = await response.json();

        // Assert specific data fields in the JSON payload
        expect(responseBody.data.id).toBe(2);
        expect(responseBody.data.first_name).toBe('Janet');
        expect(responseBody.data.email).toBe('janet.weaver@reqres.in');

    });

    test('Verify creating a new user via POST request', async ({ request }) => {
        // Send POST request with JSON bogy
        const response = await request.post('https://reqres.in/api/users', {
            data: {
                name: 'Sarrah QA',
                job: 'Automation Engineer',
            },
        });

        // Assert HTTP response status code is 201 (Created)
        expect(response.status()).toBe(201);

        // Extract and asser response body values
        const responseBody = await response.json();
        expect(responseBody.name).toBe('Sarrah QA');
        expect(responseBody.job).toBe('Automation Engineer');

        // Server generates a unique ID and timestamp
        expect(responseBody).toHaveProperty('id');
        expect(responseBody).toHaveProperty('createdAt');
    });

    test('Verify deleting a user via DELETE request', async ({ request }) => {
        // Send DELETE request to target user endpoint
        const response = await request.delete('https://reqres.in/api/users/2');

        // Assert HTTP response status code is 204 (No Content)
        expect(response.status()).toBe(204);
    });

    test('Verify updating a user via PUT request', async ({ request }) => {
        // Send PUT request with updated fields
        const response = await request.put('https://reqres.in/api/users/2', {
            data: {
                name: 'Sarrah QA Lead',
                job: 'Senior Automation Engineer',
            },
    });

        // Assert HTTP status 200 (OK) and updated payload
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.name).toBe('Sarrah QA Lead');
        expect(responseBody.job).toBe('Senior Automation Engineer');
        expect(responseBody).toHaveProperty('updatedAt');
    });

    test('Verify error handling for non-existent user (404)', async ({ request }) => {
        // Query an invalid/non-exisitng user endpoint
        const response = await request.get('https://reqres.in/api/users/23');

        // Assert HTTP status 404 (Not Found)
        expect(response.status()).toBe(404);
    });
});