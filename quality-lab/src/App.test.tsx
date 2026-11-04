import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
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

const handlers = [
  rest.get('/api.weatherapi.com/v1/current.json', (req, res, ctx) => {
    const query = req.url.searchParams.get('q');
    console.log(query);

    return res(
      ctx.json({
        current: { feelslike_f: 32.7, humidity: 95, precip_in: 0 },
        location: { name: 'Glasgow' },
      }),
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
