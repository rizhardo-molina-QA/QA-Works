import { test, expect } from '@playwright/test';

test('test', async ({ page }, testInfo) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.getByText('student').nth(1).dblclick();
  await page.getByText('Press "Enter" to skip to content Home Practice Courses AI Workshop Blog Contact').press('ControlOrMeta+c');
  await page.getByRole('textbox', { name: 'Username' }).click({
    modifiers: ['ControlOrMeta']
  });
  //1) Fill the username field with an invalid username
  await page.getByRole('textbox', { name: 'Username' }).fill('student1');
  await page.screenshot({ path: testInfo.outputPath('01-LoginName.png') });
  await testInfo.attach('01-LoginName', {
  body: await page.screenshot(),
  contentType: 'image/png',});

  //2) Fill the password field with an Valid password
  await page.getByRole('textbox', { name: 'Password' }).dblclick();
  await page.getByText('Password123').first().dblclick();
  await page.getByText('Press "Enter" to skip to content Home Practice Courses AI Workshop Blog Contact').press('ControlOrMeta+c');
  await page.getByRole('textbox', { name: 'Password' }).click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
  await page.screenshot({ path: testInfo.outputPath('02-LoginPassword.png') });
  await testInfo.attach('02-LoginPassword', {
  body: await page.screenshot(),
  contentType: 'image/png',});

  //3) Click on the Submit button and validate the error message is displayed
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#error')).toContainText('Your username is invalid!');
  await page.screenshot({ path: testInfo.outputPath('03-UserInvalid.png') });
  await testInfo.attach('03-UserInvalid', {
  body: await page.screenshot(),
  contentType: 'image/png',});

  //4) Fill the username field with a valid username and the password field with an invalid password
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('student');
  await page.screenshot({ path: testInfo.outputPath('04-ValidUser.png') });
  await testInfo.attach('04-ValidUser', {
  body: await page.screenshot(),
  contentType: 'image/png',});
  await page.getByRole('textbox', { name: 'Password' }).fill('Password12311');
  await page.screenshot({ path: testInfo.outputPath('05-InvalidPassword.png') });
  await testInfo.attach('05-InvalidPassword', {
  body: await page.screenshot(),
  contentType: 'image/png',});
  
  //5) Click on the Submit button and validate the error message is displayed
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#error')).toContainText('Your password is invalid!');
  await page.screenshot({ path: testInfo.outputPath('06-InvalidPasswordError.png') });
  await testInfo.attach('06-InvalidPasswordError', {
  body: await page.screenshot(),
  contentType: 'image/png',});

});