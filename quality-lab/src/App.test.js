import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';

test('displays todo App heading', () => {
  render(<App />);
  const todoText = screen.getByText(/todo App/i);
  expect(todoText).toBeInTheDocument();
});
