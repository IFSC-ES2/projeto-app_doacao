import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { Doacoes } from '../Doacoes.jsx';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('consulta a rota de doacoes e renderiza os dados retornados', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, produto: 'Arroz', quantidade: 5, dataEntrada: '2026-05-20', doador: 'Maria' },
      { id: 2, produto: 'Feijao', quantidade: 3, dataEntrada: '2026-05-21', doador: 'Joao' },
    ],
  });

  render(<Doacoes />);

  expect(fetch).toHaveBeenCalledWith('http://localhost:8080/doacoes');
  expect(await screen.findByText('Arroz')).toBeTruthy();
  expect(screen.getByText('Feijao')).toBeTruthy();
});

it('filtra resultados ao buscar por produto ou doador', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, produto: 'Arroz', quantidade: 5, dataEntrada: '2026-05-20', doador: 'Maria' },
      { id: 2, produto: 'Feijao', quantidade: 3, dataEntrada: '2026-05-21', doador: 'Joao' },
    ],
  });

  render(<Doacoes />);

  await screen.findByText('Arroz');

  fireEvent.change(screen.getByPlaceholderText('Buscar por produto ou doador'), {
    target: { value: 'Maria' },
  });

  expect(screen.queryByText('Feijao')).toBeNull();
  expect(screen.getByText('Arroz')).toBeTruthy();
});
