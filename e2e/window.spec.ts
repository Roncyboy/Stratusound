import { test, expect } from '@playwright/test';

let urlHome = 'http://localhost:3000/home';
let urlIndex = 'http://localhost:3000/';
let urlProfile = 'http://localhost:3000/profile';
let urlWindow = 'http://localhost:3000/window';

test.beforeAll(async () => {
    console.log('Before all tests');
});

test.afterAll(async () => {
    console.log('After all tests');
});

test.describe("Window Page", () => {
    test("Window page", async ({ page }) => {
        await page.goto(urlWindow);
        expect(await page.title()).toBe("Window");
        const metaDescription = await page.$('meta[name="description"]');
        expect(await metaDescription.getAttribute("content")).toBe("Stratusound window");
    });
});
