import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';
import { test, expect, beforeEach } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';

beforeEach(() => {
  render(<App />);
});

async function addTodo(text: string) {
  const inputForm = screen.getByRole('textbox');
  await user.type(inputForm, text);
  const enterButton = screen.getByRole('button', { name: /enter/i });
  await user.click(enterButton);
}

async function editTodo(text: string) {
  const editButton = screen.getByRole('button', { name: /edit/i });
  await user.click(editButton);
  const editForm = screen.getByRole('textbox', { name: /editText/i });
  await user.clear(editForm);
  await user.type(editForm, text);
}

test('displays Todo App and Add a Todo heading', () => {
  const todoText = screen.getByRole('heading', { name: /todo App/i });
  const addATodo = screen.getByRole('heading', { name: /add a todo/i });
  expect(todoText).toBeInTheDocument();
  expect(addATodo).toBeInTheDocument();
});

test('adds a todo when the user submits it', async () => {
  await addTodo('Learn Jest');
  expect(screen.getByText('Learn Jest')).toBeInTheDocument();
});

test('Remove a todo when the user clicks remove', async () => {
  await addTodo('Learn Jest');
  const removeButton = screen.getByRole('button', { name: /remove/i });
  await user.click(removeButton);
  expect(screen.queryByText('Learn Jest')).not.toBeInTheDocument();
});

test('updates an exisiting todo by the user', async () => {
  await addTodo('Learn Jest');
  await editTodo('Holla');
  const saveButton = screen.getByRole('button', { name: /save/i });
  const cancelButton = screen.getByRole('button', { name: /cancel/i });
  expect(saveButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
  await user.click(saveButton);
  expect(screen.queryByText('Learn Jest')).not.toBeInTheDocument();
  expect(screen.getByText('Holla')).toBeInTheDocument();
});

test('preserves an exisiting todo by the user when Cancel is clicked', async () => {
  await addTodo('Learn Jest');
  await editTodo('Holla');
  const cancelButton = screen.getByRole('button', { name: /cancel/i });
  expect(cancelButton).toBeInTheDocument();
  await user.click(cancelButton);
  expect(screen.queryByText('Holla')).not.toBeInTheDocument();
  expect(screen.getByText('Learn Jest')).toBeInTheDocument();
});
