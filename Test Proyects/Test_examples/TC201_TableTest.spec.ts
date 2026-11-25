import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-table/');
  await page.getByRole('radio', { name: 'Python' }).check();
  await expect(page.getByText('ID Course Name Language Level Enrollments Link 4824578 Selenium with Python')).toBeVisible();
  await page.locator('label').filter({ hasText: 'Java' }).click();
  await page.getByRole('radio', { name: 'Java' }).check();
  await expect(page.getByText('ID Course Name Language Level Enrollments Link 1517620 Selenium Framework Java')).toBeVisible();
  await page.locator('label').filter({ hasText: 'Any' }).click();
  await page.getByRole('radio', { name: 'Any' }).check();
  await expect(page.getByText('ID Course Name Language Level Enrollments Link 1517620 Selenium Framework Java')).toBeVisible();
  await page.getByRole('checkbox', { name: 'Advanced' }).uncheck();
  await page.locator('label').filter({ hasText: 'Java' }).click();
  await page.getByRole('radio', { name: 'Java' }).check();
  await page.locator('label').filter({ hasText: 'Intermediate' }).click();
  await page.getByRole('checkbox', { name: 'Intermediate' }).uncheck();
  await expect(page.getByText('ID Course Name Language Level Enrollments Link 1693880 Selenium with Java Java')).toBeVisible();
  await page.locator('label').filter({ hasText: 'Python' }).click();
  await page.getByRole('radio', { name: 'Python' }).check();
  await page.locator('label').filter({ hasText: 'Advanced' }).click();
  await page.getByRole('checkbox', { name: 'Advanced' }).check();
  await page.locator('label').filter({ hasText: 'Beginner' }).click();
  await page.getByRole('checkbox', { name: 'Beginner' }).uncheck();
  await expect(page.locator('#noData')).toContainText('No matching courses.');
  await page.locator('label').filter({ hasText: 'Intermediate' }).click();
  await page.getByRole('checkbox', { name: 'Intermediate' }).check();
  await page.locator('label').filter({ hasText: 'Beginner' }).click();
  await page.getByRole('checkbox', { name: 'Beginner' }).check();
  await page.locator('label').filter({ hasText: 'Any' }).click();
  await page.getByRole('radio', { name: 'Any' }).check();
  await page.locator('label').filter({ hasText: 'Python' }).click();
  await page.getByRole('radio', { name: 'Python' }).check();
  await page.locator('label').filter({ hasText: 'Advanced' }).click();
  await page.getByRole('checkbox', { name: 'Advanced' }).uncheck();
  await page.locator('label').filter({ hasText: 'Intermediate' }).click();
  await page.getByRole('checkbox', { name: 'Intermediate' }).uncheck();
  await page.locator('label').filter({ hasText: 'Beginner' }).click();
  await page.getByRole('checkbox', { name: 'Beginner' }).uncheck();
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(page.getByRole('article')).toMatchAriaSnapshot(`
    - group "Level":
      - text: ""
      - checkbox "Beginner" [checked]
      - text: Beginner
      - checkbox "Intermediate" [checked]
      - text: Intermediate
      - checkbox "Advanced" [checked]
      - text: Advanced
    `);
  await page.getByRole('group', { name: 'Level' }).click();
  await expect(page.getByRole('article')).toMatchAriaSnapshot(`
    - group "Language":
      - text: ""
      - radio "Any" [checked]
      - text: Any
      - radio "Java"
      - text: Java
      - radio "Python"
      - text: Python
    `);
});