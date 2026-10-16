import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';
import { test, expect } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';

test('displays Todo App and Add a Todo heading', () => {
  render(<App />);
  const todoText = screen.getByRole('heading', { name: /todo App/i });
  const addATodo = screen.getByRole('heading', { name: /add a todo/i });
  expect(todoText).toBeInTheDocument();
  expect(addATodo).toBeInTheDocument();
});

test('User writes a Todo and submit', async () => {
  render(<App />);
  const inputForm = screen.getByRole('textbox');
  await user.type(inputForm);
  const enterButton = screen.getByRole('button', { name: /enter/i });
  await user.click(enterButton);
  const todoList = screen.getByRole('listgroup');
  expect(todoList).toHaveLength(1);
});
