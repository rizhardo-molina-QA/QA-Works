import { test, expect } from '@playwright/test';

test('test', async ({ page }, testInfo) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.screenshot({ path: testInfo.outputPath('01-mainMenu.png') });
  await testInfo.attach('01-mainMenu', {
  body: await page.screenshot(),
  contentType: 'image/png',});

  const todoMvcLink = page.getByRole('link', {
    name: 'TodoMVC',
    exact: true,
  });

  await expect(todoMvcLink).toHaveAttribute('href', 'http://todomvc.com');
  await todoMvcLink.click();
  await expect(page).toHaveURL(/https?:\/\/todomvc\.com\/?/);
  await page.screenshot({ path: testInfo.outputPath('02-redirected.png') });
  await testInfo.attach('02-redirected', {
  body: await page.screenshot(),
  contentType: 'image/png',});

});