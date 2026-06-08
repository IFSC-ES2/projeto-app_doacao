import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, it, vi } from 'vitest';
import { Doacoes } from '../Doacoes.jsx';

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('renderiza a lista de doacoes', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, produto: 'Arroz', quantidade: 5, dataEntrada: '2026-05-20', doador: 'Maria' },
      { id: 2, produto: 'Feijao', quantidade: 3, dataEntrada: '2026-05-21', doador: 'Joao' },
    ],
  });

  render(<Doacoes />);

  expect(await screen.findByText('Arroz')).toBeTruthy();
  expect(screen.getByText('Feijao')).toBeTruthy();
});

it('filtra resultados ao buscar por produto ou doador', async () => {
  global.fetch.mockResolvedValueOnce({
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

it('pagina a lista quando ha mais registros do que o limite', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, produto: 'Arroz 1', quantidade: 5, dataEntrada: '2026-05-20', doador: 'Maria' },
      { id: 2, produto: 'Arroz 2', quantidade: 5, dataEntrada: '2026-05-21', doador: 'Maria' },
      { id: 3, produto: 'Arroz 3', quantidade: 5, dataEntrada: '2026-05-22', doador: 'Maria' },
      { id: 4, produto: 'Arroz 4', quantidade: 5, dataEntrada: '2026-05-23', doador: 'Maria' },
      { id: 5, produto: 'Arroz 5', quantidade: 5, dataEntrada: '2026-05-24', doador: 'Maria' },
      { id: 6, produto: 'Arroz 6', quantidade: 5, dataEntrada: '2026-05-25', doador: 'Maria' },
      { id: 7, produto: 'Arroz 7', quantidade: 5, dataEntrada: '2026-05-26', doador: 'Maria' },
    ],
  });

  render(<Doacoes />);

  expect(await screen.findByText('Arroz 1')).toBeTruthy();
  expect(screen.queryByText('Arroz 7')).toBeNull();

  fireEvent.click(screen.getByRole('button', { name: /próxima/i }));

  expect(screen.getByText('Arroz 7')).toBeTruthy();
  expect(screen.queryByText('Arroz 1')).toBeNull();
});
