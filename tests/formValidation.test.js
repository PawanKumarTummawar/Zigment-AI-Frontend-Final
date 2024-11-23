import { test, expect } from '@playwright/test';

test('form validation and submission', async ({ page }) => {
    // Navigate to the page
    await page.goto('/'); // Adjust with your app's URL

    // Fill the form with invalid data (empty fields)
    await page.fill('input[name="name"]', '');
    await page.fill('input[name="email"]', '');

    // Submit the form
    await page.click('button[type="submit"]');

    // Check for validation messages (based on your schema)
    const errorMessage = await page.locator('p.text-red-500');
    expect(await errorMessage.isVisible()).toBe(true); // Expect error message to be visible

    // Now fill the form correctly
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');

    // Submit the form again
    await page.click('button[type="submit"]');

    // Check for success message
    const successMessage = await page.locator(
        'text=Form submitted successfully!'
    );
    expect(await successMessage.isVisible()).toBe(true);
});
