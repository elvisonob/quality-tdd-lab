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
  await user.type(inputForm, 'Learn Jest');
  const enterButton = screen.getByRole('button', { name: /enter/i });
  await user.click(enterButton);
  expect(screen.getByText('Learn Jest')).toBeInTheDocument();
});

test('Removing a Todo', async () => {
  render(<App />);
  const inputForm = screen.getByRole('textbox');
  await user.type(inputForm, 'Learn Jest');
  const enterButton = screen.getByRole('button', { name: /enter/i });
  await user.click(enterButton);
  expect(screen.getByText('Learn Jest')).toBeInTheDocument();
  const removeButton = screen.getByRole('button', { name: /remove/i });
  await user.click(removeButton);
  expect(screen.queryByText('Learn Jest')).not.toBeInTheDocument();
});

test('Edit a todo', async () => {
  render(<App />);
  const inputForm = screen.getByRole('textbox');
  await user.type(inputForm, 'Learn Jest');
  const enterButton = screen.getByRole('button', { name: /enter/i });
  await user.click(enterButton);
  expect(screen.getByText('Learn Jest')).toBeInTheDocument();
  const editButton = screen.getByRole('button', { name: /edit/i });
  await user.click(editButton);
  const saveButton = screen.getByRole('button', { name: /save/i });
  const cancelButton = screen.getByRole('button', { name: /cancel/i });
  expect(saveButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
  const editForm = screen.getByRole('textbox', { name: /editText/i });
  await user.clear(editForm);
  await user.type(editForm, 'Holla');
  await user.click(saveButton);
  expect(screen.queryByText('Learn Jest')).not.toBeInTheDocument();
  expect(screen.getByText('Holla')).toBeInTheDocument();
});
