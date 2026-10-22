import { test, expect } from '@playwright/test';

test('displays the Todo app on page loads', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const todo = page.getByRole('heading', { name: /todo app/i });
  const addATodo = page.getByRole('heading', { name: /add a todo/i });
  const input = page.getByRole('textbox');
  const button = page.getByRole('button', { name: /enter/i });

  await expect(todo).toBeVisible();
  await expect(addATodo).toBeVisible();
  await expect(input).toBeVisible();
  await expect(button).toBeVisible();
});

test('adds a todo when the user clicks Enter', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const todoInput = page.getByRole('textbox');
  await todoInput.fill('Learn Playwright');
  await page.getByRole('button', { name: /enter/i }).click();
  await expect(page.getByText('Learn Playwright')).toBeVisible();
});

test('delete a todo when a user clicks Remove', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const todoInput = page.getByRole('textbox');
  await todoInput.fill('Learn Playwright');
  await page.getByRole('button', { name: /enter/i }).click();
  await expect(page.getByText('Learn Playwright')).toBeVisible();
  const removeTodo = page.getByRole('button', { name: /remove/i });
  await removeTodo.click();
  await expect(page.getByText('Learn Playwright')).toHaveCount(0);
});

test('updates an existing todo when the user clicks Edit', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const todoInput = page.getByRole('textbox');
  await todoInput.fill('Learn Playwright');
  await page.getByRole('button', { name: /enter/i }).click();
  await expect(page.getByText('Learn Playwright')).toBeVisible();
  const editTodo = page.getByRole('button', { name: /edit/i });
  await editTodo.click();
  const saveTodo = page.getByRole('button', { name: /save/i });
  const cancelTodo = page.getByRole('button', { name: /cancel/i });
  await expect(saveTodo).toBeVisible();
  await expect(cancelTodo).toBeVisible();
  await page.getByLabel('editText').fill('Learn about Money');
  await saveTodo.click();
  await expect(page.queryByText('Learn Playwright')).not.toBeVisible();
  await expect(page.getByText('Learn about Money')).toBeVisible();
});
