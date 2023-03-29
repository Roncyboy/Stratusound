import { test, expect } from '@playwright/test';

let urlHome = 'http://localhost:3000/home';
let urlIndex = 'http://localhost:3000/';
let urlSettings = 'http://localhost:3000/settings';
let urlWindow = 'http://localhost:3000/window';


test.beforeAll(async () => {
    console.log('Before all tests');
});

test.afterAll(async () => {
    console.log('After all tests');
});

test.describe('Settings', () => {
    test('Settings page', async ({ page }) => {
        await page.goto(urlSettings);
        expect(await page.title()).toBe('Settings');
    });
});