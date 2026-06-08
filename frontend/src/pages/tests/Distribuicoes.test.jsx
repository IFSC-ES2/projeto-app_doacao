import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { Distribuicoes } from '../Distribuicoes.jsx';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('renderiza o formulario com selects carregados da API', async () => {
  fetch.mockImplementation(async (url) => {
    if (url === 'http://localhost:8080/produtos') {
      return {
        ok: true,
        json: async () => [{ id: 1, nome: 'Arroz' }],
      };
    }

    if (url === 'http://localhost:8080/entidades') {
      return {
        ok: true,
        json: async () => [{ id: 10, nome: 'Casa Solidaria' }],
      };
    }

    if (url === 'http://localhost:8080/distribuicoes') {
      return {
        ok: true,
        json: async () => [],
      };
    }

    throw new Error(`Unexpected request: ${url}`);
  });

  render(<Distribuicoes />);

  expect(fetch).toHaveBeenCalledWith('http://localhost:8080/produtos');
  expect(fetch).toHaveBeenCalledWith('http://localhost:8080/entidades');
  expect(fetch).toHaveBeenCalledWith('http://localhost:8080/distribuicoes');
  expect(await screen.findByLabelText('Produto')).toBeTruthy();
  expect(screen.getByLabelText('Entidade')).toBeTruthy();
});

it('faz POST em distribuicoes com o payload esperado', async () => {
  const distribuicoes = [];

  fetch.mockImplementation(async (url, options = {}) => {
    if (url === 'http://localhost:8080/produtos') {
      return {
        ok: true,
        json: async () => [{ id: 1, nome: 'Arroz' }],
      };
    }

    if (url === 'http://localhost:8080/entidades') {
      return {
        ok: true,
        json: async () => [{ id: 10, nome: 'Casa Solidaria' }],
      };
    }

    if (url === 'http://localhost:8080/distribuicoes' && (!options.method || options.method === 'GET')) {
      return {
        ok: true,
        json: async () => distribuicoes,
      };
    }

    if (url === 'http://localhost:8080/distribuicoes' && options.method === 'POST') {
      const body = JSON.parse(options.body);
      distribuicoes.push({
        id: 1,
        quantidade: body.quantidade,
        dataDistribuicao: body.dataDistribuicao,
        produto: { id: body.produto.id, nome: 'Arroz' },
        entidade: { id: body.entidade.id, nome: 'Casa Solidaria' },
      });
      return {
        ok: true,
        json: async () => ({ mensagem: 'Distribuição registrada' }),
      };
    }

    throw new Error(`Unexpected request: ${options.method || 'GET'} ${url}`);
  });

  render(<Distribuicoes />);

  await screen.findByText('Arroz');

  fireEvent.change(screen.getByLabelText('Produto'), { target: { value: '1' } });
  fireEvent.change(screen.getByLabelText('Entidade'), { target: { value: '10' } });
  fireEvent.change(screen.getByLabelText('Quantidade'), { target: { value: '4' } });
  fireEvent.change(screen.getByLabelText('Data da distribuição'), {
    target: { value: '2026-05-28' },
  });
  fireEvent.change(screen.getByLabelText('Observação'), {
    target: { value: 'Entrega urgente' },
  });

  fireEvent.click(screen.getByRole('button', { name: /registrar distribuicao/i }));

  expect(await screen.findByText('Distribuição registrada')).toBeTruthy();
  expect(distribuicoes).toHaveLength(1);
  expect(distribuicoes[0]).toMatchObject({
    quantidade: 4,
    dataDistribuicao: '2026-05-28',
    produto: { id: 1, nome: 'Arroz' },
    entidade: { id: 10, nome: 'Casa Solidaria' },
  });

  const postCall = fetch.mock.calls.find(
    ([url, options]) => url === 'http://localhost:8080/distribuicoes' && options?.method === 'POST'
  );
  expect(postCall).toBeTruthy();
  expect(JSON.parse(postCall[1].body)).toEqual({
    produto: { id: 1 },
    entidade: { id: 10 },
    quantidade: 4,
    dataDistribuicao: '2026-05-28',
    observacao: 'Entrega urgente',
  });
});
