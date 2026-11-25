import { test, expect } from '@playwright/test';

test('test', async ({ page }, testInfo) => {

  //1) Navigate to the Practice Test Automation login page and click on the "Test Exceptions" link
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.getByRole('link', { name: 'Practice', exact: true }).dblclick();
  await page.getByRole('link', { name: 'Test Exceptions' }).click();
  await page.screenshot({ path: testInfo.outputPath('01-TestExceptions.png') });
  await testInfo.attach('01-TestExceptions', {
  body: await page.screenshot(),
  contentType: 'image/png',});

//2) Click on the "Add" button to add a new row and wait for the loading message to disappear
  await page.getByRole('button', { name: 'Add' }).click();
  await page.screenshot({ path: testInfo.outputPath('02-Rowclick.png') });
  await testInfo.attach('02-Rowclick', {
  body: await page.screenshot(),
  contentType: 'image/png',});
  await page.getByText('Loading…').click();
  await page.screenshot({ path: testInfo.outputPath('03-loadingwait.png') });
  await testInfo.attach('03-loadingwait', {
  body: await page.screenshot(),
  contentType: 'image/png',});
  await expect(page.locator('#loading')).toContainText('Loading…');
  
  await expect(page.locator('#rows')).toContainText('Row 2');
  await page.screenshot({ path: testInfo.outputPath('03-row2Box.png') });
  await testInfo.attach('03-row2Box', {
  body: await page.screenshot(),
  contentType: 'image/png',});

//3) Fill in the new row with a value and click on the "Save" button, then validate that the confirmation message is displayed
  await page.getByRole('textbox').nth(1).fill('New Row');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('#confirmation')).toContainText('Row 2 was saved');
  await page.screenshot({ path: testInfo.outputPath('04-SavedRow.png') });
  await testInfo.attach('04-SavedRow', {
  body: await page.screenshot(),
  contentType: 'image/png',});

//4) Click on the "Remove" button to remove the row and validate that the confirmation message is displayed
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.locator('#confirmation')).toContainText('Row 2 was removed');
  await page.screenshot({ path: testInfo.outputPath('05-RemovedRow.png') });
  await testInfo.attach('05-RemovedRow', {
  body: await page.screenshot(),
  contentType: 'image/png',});

});