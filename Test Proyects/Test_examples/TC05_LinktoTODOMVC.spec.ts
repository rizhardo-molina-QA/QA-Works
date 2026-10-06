import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  const todoMvcLink = page.getByRole('link', {
    name: 'TodoMVC',
    exact: true,
  });

  await expect(todoMvcLink).toHaveAttribute('href', 'http://todomvc.com');
  await todoMvcLink.click();
  await expect(page).toHaveURL(/https?:\/\/todomvc\.com\/?/);

});