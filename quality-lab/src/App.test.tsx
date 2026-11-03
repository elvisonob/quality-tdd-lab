import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';
import { test, expect, beforeEach } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';

test('displays data from the API', () => {
  jest.mock('https://api.weatherapi.com/v1/current.json', () => {
    return () => {
      return {
        data: ['glasgow', '94'],
      };
    };
  });
});
