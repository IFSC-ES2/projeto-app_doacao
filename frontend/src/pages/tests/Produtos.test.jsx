import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { Produtos } from '../Produtos.jsx';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

function mockProdutosApi({ produtos = [], entidades = [] } = {}) {
  fetch.mockImplementation(async (url, options = {}) => {
    if (url === 'http://localhost:8080/entidades' && (!options.method || options.method === 'GET')) {
      return {
        ok: true,
        json: async () => entidades,
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
        id: produtos.length + 1,
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

    if (url.startsWith('http://localhost:8080/produtos/') && options.method === 'DELETE') {
      const id = Number(url.split('/').pop());
      const index = produtos.findIndex((produto) => Number(produto.id) === id);
      if (index >= 0) {
        produtos.splice(index, 1);
      }
      return {
        ok: true,
        status: 204,
        json: async () => ({}),
      };
    }

    throw new Error(`Unexpected request: ${options.method || 'GET'} ${url}`);
  });
}

it('renderiza o formulario e alterna o tipo de doador', async () => {
  mockProdutosApi({
    produtos: [],
    entidades: [{ id: 1, nome: 'Casa Solidaria' }],
  });

  render(<Produtos />);

  expect(fetch).toHaveBeenCalledWith('http://localhost:8080/produtos');
  expect(fetch).toHaveBeenCalledWith('http://localhost:8080/entidades');
  expect(screen.getByPlaceholderText('Nome do produto')).toBeTruthy();
  expect(screen.getByPlaceholderText('Descrição')).toBeTruthy();
  expect(screen.getByPlaceholderText('Unidade de medida')).toBeTruthy();
  expect(screen.getByPlaceholderText('Nome do doador')).toBeTruthy();
  expect(screen.getByPlaceholderText('Quantidade inicial')).toBeTruthy();

  fireEvent.click(screen.getByRole('button', { name: /entidade/i }));

  expect(await screen.findByLabelText('Entidade')).toBeTruthy();
});

it('cadastra produto com doador avulso', async () => {
  const produtos = [];
  mockProdutosApi({
    produtos,
    entidades: [{ id: 1, nome: 'Casa Solidaria' }],
  });

  render(<Produtos />);

  fireEvent.change(screen.getByPlaceholderText('Nome do produto'), {
    target: { value: 'Arroz' },
  });
  fireEvent.change(screen.getByPlaceholderText('Descrição'), {
    target: { value: 'Pacote 5kg' },
  });
  fireEvent.change(screen.getByPlaceholderText('Unidade de medida'), {
    target: { value: 'kg' },
  });
  fireEvent.change(screen.getByPlaceholderText('Nome do doador'), {
    target: { value: 'Joao Silva' },
  });
  fireEvent.change(screen.getByPlaceholderText('Quantidade inicial'), {
    target: { value: '10' },
  });

  fireEvent.click(screen.getByRole('button', { name: /cadastrar produto/i }));

  expect(await screen.findByText('Produto cadastrado com sucesso')).toBeTruthy();
  expect(await screen.findByText('Arroz')).toBeTruthy();

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
    doador: 'Joao Silva',
    observacao: 'Entrada registrada com doador avulso Joao Silva',
  });
});

it('cadastra produto com entidade selecionada', async () => {
  const produtos = [];
  mockProdutosApi({
    produtos,
    entidades: [{ id: 1, nome: 'Casa Solidaria' }],
  });

  render(<Produtos />);

  fireEvent.click(screen.getByRole('button', { name: /entidade/i }));

  expect(await screen.findByLabelText('Entidade')).toBeTruthy();

  fireEvent.change(screen.getByPlaceholderText('Nome do produto'), {
    target: { value: 'Feijao' },
  });
  fireEvent.change(screen.getByPlaceholderText('Descrição'), {
    target: { value: 'Pacote 1kg' },
  });
  fireEvent.change(screen.getByPlaceholderText('Unidade de medida'), {
    target: { value: 'kg' },
  });
  fireEvent.change(screen.getByLabelText('Entidade'), {
    target: { value: '1' },
  });
  fireEvent.change(screen.getByPlaceholderText('Quantidade inicial'), {
    target: { value: '5' },
  });

  fireEvent.click(screen.getByRole('button', { name: /cadastrar produto/i }));

  expect(await screen.findByText('Produto cadastrado com sucesso')).toBeTruthy();

  const doacaoPost = fetch.mock.calls.find(
    ([url, options]) => url === 'http://localhost:8080/doacoes' && options?.method === 'POST'
  );

  expect(JSON.parse(doacaoPost[1].body)).toMatchObject({
    produto: 'Feijao',
    quantidade: 5,
    doador: 'Casa Solidaria',
    observacao: 'Entrada vinculada a entidade Casa Solidaria',
  });
});

it('exclui um produto apos confirmacao no dialogo', async () => {
  const produtos = [
    {
      id: 1,
      nome: 'Arroz',
      descricao: 'Pacote 5kg',
      unidade: 'kg',
      quantidadeEstoque: 10,
    },
  ];

  mockProdutosApi({
    produtos,
    entidades: [],
  });

  render(<Produtos />);

  expect(await screen.findByText('Arroz')).toBeTruthy();

  fireEvent.click(screen.getByLabelText('Excluir produto Arroz'));

  const dialog = await screen.findByRole('dialog');
  expect(within(dialog).getByText(/tem certeza que deseja excluir/i)).toBeTruthy();

  fireEvent.click(within(dialog).getByRole('button', { name: /^excluir$/i }));

  expect(await screen.findByText('Produto excluído com sucesso')).toBeTruthy();
  expect(screen.queryByText('Arroz')).toBeNull();
});
