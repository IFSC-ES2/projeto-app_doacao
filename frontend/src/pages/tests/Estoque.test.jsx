import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { Estoque } from '../Estoque.jsx';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('consulta a rota de estoque e exibe o saldo calculado pela API', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, produto: 'Cesta basica', unidade: 'un', quantidadeAtual: 0 },
      { id: 2, produto: 'Agua', unidade: 'L', quantidadeAtual: 12 },
    ],
  });

  render(<Estoque />);

  expect(fetch).toHaveBeenCalledWith('http://localhost:8080/estoque');
  expect(await screen.findByText('Cesta basica')).toBeTruthy();
  expect(screen.getByText('Agua')).toBeTruthy();
  expect(screen.getByText('Zerado')).toBeTruthy();
  expect(screen.getByText('Disponível')).toBeTruthy();
});
