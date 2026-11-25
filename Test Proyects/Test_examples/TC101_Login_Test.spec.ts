import { test, expect } from '@playwright/test';

test('test', async ({ page }, testInfo) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.getByText('student').nth(1).dblclick();
  await page.getByText('Press "Enter" to skip to content Home Practice Courses AI Workshop Blog Contact').press('ControlOrMeta+c');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('student');
  await page.screenshot({ path: testInfo.outputPath('01-LoginName.png') });
  await testInfo.attach('01-LoginName', {
  body: await page.screenshot(),
  contentType: 'image/png',});
  await page.getByText('Password123').first().dblclick();
  await page.getByText('Press "Enter" to skip to content Home Practice Courses AI Workshop Blog Contact').press('ControlOrMeta+c');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
  await page.screenshot({ path: testInfo.outputPath('02-LoginPassword.png') });
  await testInfo.attach('02-LoginPassword', {
  body: await page.screenshot(),
  contentType: 'image/png',});
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.screenshot({ path: testInfo.outputPath('03-LoginSubmit.png') });
  await testInfo.attach('03-LoginSubmit', {
  body: await page.screenshot(),
  contentType: 'image/png',});
  await page.getByRole('link', { name: 'Log out' }).click();
  await page.screenshot({ path: testInfo.outputPath('04-Logout.png') });
  await testInfo.attach('04-Logout', {
  body: await page.screenshot(),
  contentType: 'image/png',});
});