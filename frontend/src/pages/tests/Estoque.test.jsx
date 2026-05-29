import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, it, vi } from 'vitest';
import { Estoque } from '../Estoque.jsx';

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('renderiza os produtos retornados pelo estoque', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, produto: 'Cesta basica', unidade: 'un', quantidadeAtual: 0 },
      { id: 2, produto: 'Agua', unidade: 'L', quantidadeAtual: 12 },
    ],
  });

  render(<Estoque />);

  expect(await screen.findByText('Cesta basica')).toBeTruthy();
  expect(screen.getByText('Agua')).toBeTruthy();
});
