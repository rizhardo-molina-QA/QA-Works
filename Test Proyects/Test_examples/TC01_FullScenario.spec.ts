import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  //Open the TodoMVC demo page
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  //Add three new todo items
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Review Pull Requests');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Update Test Documentation');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Investigate Failed Builds');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

  //Verify that the three new todo items are visible on the page
  await expect(page.getByText('Review Pull Requests')).toBeVisible();
  await expect(page.getByText('Update Test Documentation')).toBeVisible();
  await expect(page.getByText('Investigate Failed Builds')).toBeVisible();
  //Validate the number of items left
  await expect(page.locator('body')).toContainText('3 items left');
  

  //Mark the Review Pull Requests item as completed and verify that it is checked
  await page.getByRole('listitem').filter({ hasText: 'Review Pull Requests' }).getByLabel('Toggle Todo').check();
  await expect(page.getByRole('listitem').filter({ hasText: 'Review Pull Requests' }).getByLabel('Toggle Todo')).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Review Pull Requests' }).getByLabel('Toggle Todo')).toBeChecked();
  //Validating the number of items left after marking one item as completed
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByRole('listitem').filter({ hasText: 'Review Pull Requests' }).getByLabel('Toggle Todo')).toBeHidden();
  await expect(page.locator('body')).toContainText('2 items left');
  
  await page.getByRole('listitem').filter({ hasText: 'Investigate Failed Builds' }).hover();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.locator('body')).toContainText('1 item left');
});