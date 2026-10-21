import { test, expect, page } from '@playwright/test';

test('page lands', () => {
  page.goto('http://localhost:5173/');
  const todo = page.getByRole('header', { name: /todo app/i });
  const addATodo = page.getByRole('header', { name: /add a todo/i });
  const input = page.getByRole('textbox');
  const button = page.getByRole('button', { name: /enter/i });

  expect(todo).toBeInTheDocument();
  expect(addATodo).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
