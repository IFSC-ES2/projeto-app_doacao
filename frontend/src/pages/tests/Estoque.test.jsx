import { fireEvent, render, screen } from '@testing-library/react';
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

it('filtra produtos pelo nome digitado', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, produto: 'Cesta basica', unidade: 'un', quantidadeAtual: 0 },
      { id: 2, produto: 'Agua', unidade: 'L', quantidadeAtual: 12 },
    ],
  });

  render(<Estoque />);

  await screen.findByText('Cesta basica');

  fireEvent.change(screen.getByPlaceholderText('Buscar por nome do produto'), {
    target: { value: 'Agua' },
  });

  expect(screen.queryByText('Cesta basica')).toBeNull();
  expect(screen.getByText('Agua')).toBeTruthy();
});

it('mostra mensagem quando a busca nao encontra resultados', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, produto: 'Cesta basica', unidade: 'un', quantidadeAtual: 0 },
    ],
  });

  render(<Estoque />);

  await screen.findByText('Cesta basica');

  fireEvent.change(screen.getByPlaceholderText('Buscar por nome do produto'), {
    target: { value: 'Arroz' },
  });

  expect(screen.getByText('Nenhum produto encontrado para essa busca.')).toBeTruthy();
});

it('pagina os itens do estoque quando a lista e maior que o limite', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, produto: 'Produto 1', unidade: 'un', quantidadeAtual: 0 },
      { id: 2, produto: 'Produto 2', unidade: 'un', quantidadeAtual: 1 },
      { id: 3, produto: 'Produto 3', unidade: 'un', quantidadeAtual: 2 },
      { id: 4, produto: 'Produto 4', unidade: 'un', quantidadeAtual: 3 },
      { id: 5, produto: 'Produto 5', unidade: 'un', quantidadeAtual: 4 },
      { id: 6, produto: 'Produto 6', unidade: 'un', quantidadeAtual: 5 },
      { id: 7, produto: 'Produto 7', unidade: 'un', quantidadeAtual: 6 },
    ],
  });

  render(<Estoque />);

  expect(await screen.findByText('Produto 1')).toBeTruthy();
  expect(screen.queryByText('Produto 7')).toBeNull();

  fireEvent.click(screen.getByRole('button', { name: /próxima/i }));

  expect(screen.getByText('Produto 7')).toBeTruthy();
  expect(screen.queryByText('Produto 1')).toBeNull();
});
