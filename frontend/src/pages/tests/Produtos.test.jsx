import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { Produtos } from '../Produtos.jsx';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('renderiza os campos do formulario e consulta a API esperada', async () => {
  fetch.mockImplementation(async (url, options = {}) => {
    if (url === 'http://localhost:8080/entidades') {
      return {
        ok: true,
        json: async () => [{ id: 1, nome: 'Casa Solidaria' }],
      };
    }

    if (url === 'http://localhost:8080/produtos' && !options.method) {
      return {
        ok: true,
        json: async () => [],
      };
    }

    throw new Error(`Unexpected request: ${options.method || 'GET'} ${url}`);
  });

  render(<Produtos />);

  expect(fetch).toHaveBeenCalledWith('http://localhost:8080/produtos');
  expect(fetch).toHaveBeenCalledWith('http://localhost:8080/entidades');
  expect(screen.getByPlaceholderText('Nome do produto')).toBeTruthy();
  expect(screen.getByPlaceholderText('Descrição')).toBeTruthy();
  expect(screen.getByPlaceholderText('Unidade de medida')).toBeTruthy();
  expect(await screen.findByLabelText('Entidade')).toBeTruthy();
  expect(screen.getByPlaceholderText('Quantidade inicial')).toBeTruthy();
});

it('envia os payloads corretos para produto e doacao', async () => {
  const produtos = [];

  fetch.mockImplementation(async (url, options = {}) => {
    if (url === 'http://localhost:8080/entidades') {
      return {
        ok: true,
        json: async () => [{ id: 1, nome: 'Casa Solidaria' }],
      };
    }

    if (url === 'http://localhost:8080/produtos' && (!options.method || options.method === 'GET')) {
      return {
        ok: true,
        json: async () => produtos,
      };
    }

    if (url === 'http://localhost:8080/produtos' && options.method === 'POST') {
      const body = JSON.parse(options.body);
      produtos.push({
        id: 1,
        ...body,
      });
      return {
        ok: true,
        json: async () => ({ mensagem: 'Produto cadastrado com sucesso' }),
      };
    }

    if (url === 'http://localhost:8080/doacoes' && options.method === 'POST') {
      return {
        ok: true,
        json: async () => ({ mensagem: 'Doação registrada com sucesso' }),
      };
    }

    throw new Error(`Unexpected request: ${options.method || 'GET'} ${url}`);
  });

  render(<Produtos />);

  await screen.findByLabelText('Entidade');

  fireEvent.change(screen.getByPlaceholderText('Nome do produto'), {
    target: { value: 'Arroz' },
  });
  fireEvent.change(screen.getByPlaceholderText('Descrição'), {
    target: { value: 'Pacote 5kg' },
  });
  fireEvent.change(screen.getByPlaceholderText('Unidade de medida'), {
    target: { value: 'kg' },
  });
  fireEvent.change(screen.getByLabelText('Entidade'), {
    target: { value: '1' },
  });
  fireEvent.change(screen.getByPlaceholderText('Quantidade inicial'), {
    target: { value: '10' },
  });

  fireEvent.click(screen.getByRole('button', { name: /cadastrar produto/i }));

  expect(await screen.findByText('Produto cadastrado com sucesso')).toBeTruthy();
  expect(await screen.findByText('Arroz')).toBeTruthy();
  expect(screen.getByText('Pacote 5kg')).toBeTruthy();

  const produtoPost = fetch.mock.calls.find(
    ([url, options]) => url === 'http://localhost:8080/produtos' && options?.method === 'POST'
  );
  expect(produtoPost).toBeTruthy();
  expect(JSON.parse(produtoPost[1].body)).toEqual({
    nome: 'Arroz',
    descricao: 'Pacote 5kg',
    unidade: 'kg',
    quantidadeEstoque: 10,
  });

  const doacaoPost = fetch.mock.calls.find(
    ([url, options]) => url === 'http://localhost:8080/doacoes' && options?.method === 'POST'
  );
  expect(doacaoPost).toBeTruthy();
  expect(JSON.parse(doacaoPost[1].body)).toMatchObject({
    produto: 'Arroz',
    quantidade: 10,
    doador: 'Casa Solidaria',
  });
});
