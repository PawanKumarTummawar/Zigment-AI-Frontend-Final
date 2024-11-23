const { chromium } = require('playwright');

describe('Real-Time Form Generation', () => {
    let browser;
    let page;

    beforeAll(async () => {
        // Launch browser and page instance before tests
        browser = await chromium.launch();
        page = await browser.newPage();
    });

    afterAll(async () => {
        // Close the browser after tests
        await browser.close();
    });

    test('Form should render correctly with real-time JSON schema', async () => {
        // Go to your app's page that contains the form
        await page.goto('http://localhost:3000'); // Adjust this URL based on your app's location

        // Check if the form title is rendered
        const formTitle = await page.textContent('h2');
        expect(formTitle).toBe('Contact Information'); // Replace with your dynamic form title

        // Check if input fields are present
        const input = await page.$('input[name="name"]');
        expect(input).toBeTruthy();

        // Check if email field is present
        const emailInput = await page.$('input[name="email"]');
        expect(emailInput).toBeTruthy();
    });

    test('Form validation should work correctly', async () => {
        // Go to the form page
        await page.goto('http://localhost:3000');

        // Select and fill in the name field (invalid email for validation)
        await page.fill('input[name="name"]', 'John Doe');
        await page.fill('input[name="email"]', 'invalid-email');

        // Submit the form
        await page.click('button[type="submit"]');

        // Check for validation error (assuming your form has error messages)
        const errorMessage = await page.textContent('.text-red-500');
        expect(errorMessage).toContain('Please enter a valid email address');
    });

    test('Form submission should work correctly with valid inputs', async () => {
        // Go to the form page
        await page.goto('http://localhost:3000');

        // Fill out the form with valid data
        await page.fill('input[name="name"]', 'John Doe');
        await page.fill('input[name="email"]', 'john.doe@example.com');

        // Submit the form
        await page.click('button[type="submit"]');

        // Check for success message or form submission success
        const successMessage = await page.textContent('p'); // Adjust selector as needed
        expect(successMessage).toBe('Form submitted successfully!');
    });

    test('Form should be responsive', async () => {
        // Test the responsiveness of the form layout by resizing the viewport
        await page.goto('http://localhost:3000');

        // Resize viewport to simulate mobile view
        await page.setViewportSize({ width: 375, height: 667 });

        // Check if the form is still functional and well-structured
        const formTitle = await page.textContent('h2');
        expect(formTitle).toBe('Contact Information'); // Replace with your dynamic form title

        // Verify that input fields are still displayed
        const input = await page.$('input[name="name"]');
        expect(input).toBeTruthy();

        // Resize viewport back to desktop view
        await page.setViewportSize({ width: 1024, height: 768 });
    });
});
