const { test, expect } = require('@playwright/test');

test('Addition via la nouvelle interface', async ({ page }) => {
  await page.goto('http://127.0.0.1:8080/');
  
  await page.click('[data-value="2"]');
  await page.click('[data-value="+"]');
  await page.click('[data-value="3"]');
  await page.click('[data-value="="]');
  
  await expect(page.locator('#display')).toHaveText('5');
});

test('Division par zéro affiche une erreur', async ({ page }) => {
  await page.goto('http://127.0.0.1:8080/');
  
  await page.click('[data-value="6"]');
  await page.click('[data-value="/"]');
  await page.click('[data-value="0"]');
  await page.click('[data-value="="]');
  
  await expect(page.locator('#display')).toHaveText('Erreur : division par zéro');
});

test('Test de soustraction via l\'interface', async ({ page }) => {
  await page.goto('http://127.0.0.1:8080/');

  await page.click('[data-value="8"]');
  await page.click('[data-value="-"]');
  await page.click('[data-value="3"]');
  await page.click('[data-value="="]');

  await expect(page.locator('#display')).toHaveText('5');
});

test('Test de multiplication via l\'interface', async ({ page }) => {
  await page.goto('http://127.0.0.1:8080/');

  await page.click('[data-value="4"]');
  await page.click('[data-value="*"]');
  await page.click('[data-value="5"]');
  await page.click('[data-value="="]');

  await expect(page.locator('#display')).toHaveText('20');
});

test('Historique mis à jour correctement après plusieurs opérations', async ({ page }) => {
  await page.goto('http://127.0.0.1:8080/');

  const historyPanel = page.locator('#history-panel');
  await expect(historyPanel).toHaveClass(/hidden/);

  await page.click('#toggle-history');
  await expect(historyPanel).not.toHaveClass(/hidden/);

  await page.click('[data-value="8"]');
  await page.click('[data-value="-"]');
  await page.click('[data-value="3"]');
  await page.click('[data-value="="]');
  
  await page.click('[data-value="4"]');
  await page.click('[data-value="*"]');
  await page.click('[data-value="5"]');
  await page.click('[data-value="="]');

  const historyItems = page.locator('#history-list li');
  await expect(historyItems).toHaveCount(2);

  const firstHistory = await historyItems.first().textContent();
  expect(firstHistory.trim()).toBe('8 - 3 = 5');

  const secondHistory = await historyItems.nth(1).textContent();
  expect(secondHistory.trim()).toBe('4 * 5 = 20');
});