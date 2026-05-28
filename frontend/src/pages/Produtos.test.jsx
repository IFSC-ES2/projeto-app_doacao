import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, it, vi } from 'vitest';
import { Produtos } from './Produtos.jsx';

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('renderiza os campos do formulario', async () => {
  global.fetch.mockImplementation((url) => {
    if (url.includes('/entidades')) {
      return Promise.resolve({
        ok: true,
        json: async () => [{ id: 1, nome: 'Casa Solidaria' }],
      });
    }
    if (url.includes('/produtos')) {
      return Promise.resolve({
        ok: true,
        json: async () => [],
      });
    }
    return Promise.resolve({
      ok: true,
      json: async () => [],
    });
  });

  render(<Produtos />);

  expect(screen.getByPlaceholderText('Nome do produto')).toBeTruthy();
  expect(screen.getByPlaceholderText('Descrição')).toBeTruthy();
  expect(screen.getByPlaceholderText('Unidade de medida')).toBeTruthy();
  expect(await screen.findByLabelText('Entidade')).toBeTruthy();
  expect(screen.getByPlaceholderText('Quantidade inicial')).toBeTruthy();
});

it('exibe lista de produtos apos carregamento', async () => {
  global.fetch.mockImplementation((url) => {
    if (url.includes('/entidades')) {
      return Promise.resolve({
        ok: true,
        json: async () => [{ id: 1, nome: 'Casa Solidaria' }],
      });
    }
    if (url.includes('/produtos')) {
      return Promise.resolve({
        ok: true,
        json: async () => [
          {
            id: 1,
            nome: 'Arroz',
            descricao: 'Pacote 5kg',
            unidade: 'kg',
            quantidadeEstoque: 10,
          },
        ],
      });
    }
    return Promise.resolve({
      ok: true,
      json: async () => [],
    });
  });

  render(<Produtos />);

  expect(await screen.findByText('Arroz')).toBeTruthy();
  expect(screen.getByText('Pacote 5kg')).toBeTruthy();
});
