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
  // Edit a todo only if it exists
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Investigate Failed Builds' });
  if (await todoItem.count() > 0) {
    await todoItem.getByText('Investigate Failed Builds', { exact: true }).dblclick();
    const editTextbox = page.getByRole('textbox', { name: 'Edit' });
    await editTextbox.fill('edited value');
    await editTextbox.press('Enter');

    await expect(
      page.getByRole('listitem').filter({ hasText: 'edited value' })
    ).toBeVisible();
  }

});