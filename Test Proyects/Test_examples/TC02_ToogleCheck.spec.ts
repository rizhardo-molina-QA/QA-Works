import { test, expect } from '@playwright/test';

test('test', async ({ page }, testInfo) => {
  //Open the TodoMVC demo page
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  //Add three new todo items
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Review Pull Requests');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.screenshot({ path: testInfo.outputPath('01-item1.png') });
  await testInfo.attach('01-item1', {
  body: await page.screenshot(),
  contentType: 'image/png',});
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Update Test Documentation');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.screenshot({ path: testInfo.outputPath('02-Items2.png') });
  await testInfo.attach('02-Items2', {
  body: await page.screenshot(),
  contentType: 'image/png',});
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Investigate Failed Builds');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.screenshot({ path: testInfo.outputPath('03-Items3.png') });
  await testInfo.attach('03-Items3', {
  body: await page.screenshot(),
  contentType: 'image/png',});

  //Verify that the three new todo items are visible on the page
  await expect(page.getByText('Review Pull Requests')).toBeVisible();
  await expect(page.getByText('Update Test Documentation')).toBeVisible();
  await expect(page.getByText('Investigate Failed Builds')).toBeVisible();
  
  //Mark the Review Pull Requests item as completed and verify that it is checked
  await page.getByRole('listitem').filter({ hasText: 'Review Pull Requests' }).getByLabel('Toggle Todo').check();
  await expect(page.getByRole('listitem').filter({ hasText: 'Review Pull Requests' }).getByLabel('Toggle Todo')).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Review Pull Requests' }).getByLabel('Toggle Todo')).toBeChecked();
  await page.screenshot({ path: testInfo.outputPath('04-Itemchecked.png') });
  await testInfo.attach('04-Itemchecked', {
  body: await page.screenshot(),
  contentType: 'image/png',});
  await page.getByRole('listitem').filter({ hasText: 'Update Test Documentation' }).getByLabel('Toggle Todo').check();
  await page.getByRole('link', { name: 'Active' }).click();
  await page.screenshot({ path: testInfo.outputPath('05-Itemchecked2.png') });
  await testInfo.attach('05-Itemchecked2', {
  body: await page.screenshot(),
  contentType: 'image/png',});
  await expect(page.locator('body')).toContainText('1 item left');
  await page.screenshot({ path: testInfo.outputPath('06-ActiveItems.png') });
  await testInfo.attach('06-ActiveItems', {
  body: await page.screenshot(),
  contentType: 'image/png',});

  //Validate both the completed items are visible in the completed section
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByRole('listitem').filter({ hasText: 'Review Pull Requests' }).getByLabel('Toggle Todo')).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'Update Test Documentation' }).getByLabel('Toggle Todo')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('07-CompletedItems.png') });
  await testInfo.attach('07-CompletedItems', {
  body: await page.screenshot(),
  contentType: 'image/png',});

  //Uncheck the Update Test Documentation item and verify that it is unchecked
  await page.getByRole('listitem').filter({ hasText: 'Update Test Documentation' }).getByLabel('Toggle Todo').click();
  await expect(page.getByRole('listitem').filter({ hasText: 'Update Test Documentation' }).getByLabel('Toggle Todo')).toBeHidden();
  await expect(page.locator('body')).toContainText('2 items left');
  await page.screenshot({ path: testInfo.outputPath('08-UncheckedItem.png') });
  await testInfo.attach('08-UncheckedItem', {
  body: await page.screenshot(),
  contentType: 'image/png',});


  //Validating the number of items left after marking one item as completed
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByRole('listitem').filter({ hasText: 'Review Pull Requests' }).getByLabel('Toggle Todo')).toBeHidden();
  await expect(page.locator('body')).toContainText('2 items left');
  await page.screenshot({ path: testInfo.outputPath('09-New ItemsLeft.png') });
  await testInfo.attach('09-New ItemsLeft', {
  body: await page.screenshot(),
  contentType: 'image/png',});
  
});