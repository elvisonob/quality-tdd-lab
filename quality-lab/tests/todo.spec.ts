import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

async function addTodo(page: Page, text: string) {
  const todoInput = page.getByRole('textbox');
  await todoInput.fill(text);
  await page.getByRole('button', { name: /enter/i }).click();
  await expect(page.getByText(text)).toBeVisible();
}

async function editingTodo(page: Page, text: string) {
  const todoInput = page.getByRole('textbox');
  await todoInput.fill(text);
  await page.getByRole('button', { name: /enter/i }).click();
  await expect(page.getByText(text)).toBeVisible();
  const editTodo = page.getByRole('button', { name: /edit/i });
  await editTodo.click();
}

test('displays the Todo app on page loads', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /todo app/i })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: /add a todo/i }),
  ).toBeVisible();
  await expect(page.getByRole('textbox')).toBeVisible();
  await expect(page.getByRole('button', { name: /enter/i })).toBeVisible();
});

test('adds a todo when the user clicks Enter', async ({ page }) => {
  await addTodo(page, 'Learn Playwright');
});

test('delete a todo when a user clicks Remove', async ({ page }) => {
  addTodo(page, 'Learn Playwright');
  const removeTodo = page.getByRole('button', { name: /remove/i });
  await removeTodo.click();
  await expect(page.getByText('Learn Playwright')).toHaveCount(0);
});

test('update an existing todo when the user clicks Edit', async ({ page }) => {
  await editingTodo(page, 'Learn Playwright');
  await page.getByLabel('editText').fill('Learn about Money');
  await expect(page.getByText('Learn Playwright')).toHaveCount(0);
  await page.getByRole('button', { name: /save/i }).click();
  await expect(page.getByText('Learn about Money')).toBeVisible();
});

test('preserve the original todo when the user cancels editing', async ({
  page,
}) => {
  await editingTodo(page, 'Learn Playwright');
  await page.getByLabel('editText').fill('Learn about Money');
  await page.getByRole('button', { name: /cancel/i }).click();
  await expect(page.getByText('Learn about Money')).toHaveCount(0);
  await expect(page.getByText('Learn Playwright')).toHaveCount(1);
});
