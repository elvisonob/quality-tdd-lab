import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import App from './App';
import { test, expect, beforeAll, afterEach, afterAll } from '@jest/globals';
import type { RestRequest, ResponseComposition, RestContext } from 'msw';
import '@testing-library/jest-dom/jest-globals';

const handlers = [
  rest.get(
    '/api.weatherapi.com/v1/current.json',
    (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
      const query = req.url.searchParams.get('q');
      console.log(query);

      return res(
        ctx.json({
          current: { feelslike_f: 32.7, humidity: 95, precip_in: 0 },
          location: { name: 'Glasgow' },
        }),
      );
    },
  ),
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

test("renders data that's returned from API", async () => {
  render(<App />);

  expect(await screen.findByText('Glasgow')).toBeInTheDocument();
});
