import { render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { Dashboard } from '../Dashboard.jsx';
import { emitAppDataSync } from '../../utils/dataSync.js';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('usa o saldo do estoque no total e no top produtos quando os dados mudam', async () => {
  let estoqueAtual = [
    { id: 1, nome: 'Arroz', unidade: 'kg', quantidadeEstoque: 99, saldoCalculado: 12 },
    { id: 2, nome: 'Feijao', unidade: 'kg', quantidadeEstoque: 8, saldoCalculado: 5 },
  ];

  fetch.mockImplementation(async (url) => {
    if (url === 'http://localhost:8080/entidades') {
      return {
        ok: true,
        json: async () => [],
      };
    }

    if (url === 'http://localhost:8080/doacoes') {
      return {
        ok: true,
        json: async () => [
          { id: 1, produto: 'Arroz', quantidade: 99, doador: 'Doador', dataEntrada: '2026-06-18' },
        ],
      };
    }

    if (url === 'http://localhost:8080/estoque') {
      return {
        ok: true,
        json: async () => estoqueAtual.map((item) => ({ ...item })),
      };
    }

    throw new Error(`Unexpected request: ${url}`);
  });

  render(<Dashboard />);

  await waitFor(() => {
    expect(screen.getByText('17')).toBeTruthy();
  });

  const topProdutosSection = screen.getByRole('heading', { name: /top produtos/i }).closest('div');
  expect(within(topProdutosSection).getByText('Arroz')).toBeTruthy();
  expect(within(topProdutosSection).getByText('12')).toBeTruthy();
  expect(within(topProdutosSection).queryByText('99')).toBeNull();

  estoqueAtual = [
    { id: 1, nome: 'Arroz', unidade: 'kg', quantidadeEstoque: 99, saldoCalculado: 4 },
    { id: 2, nome: 'Feijao', unidade: 'kg', quantidadeEstoque: 8, saldoCalculado: 5 },
  ];
  emitAppDataSync({ resource: 'produtos', action: 'delete' });

  await waitFor(() => {
    expect(screen.getByText('9')).toBeTruthy();
  });

  expect(within(topProdutosSection).getByText('4')).toBeTruthy();
});
