import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { Produtos } from '../Produtos.jsx';

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

function mockProdutosApi(produtos = [], entidades = []) {
  global.fetch.mockImplementation((url, options = {}) => {
    if (url.includes('/produtos') && (!options.method || options.method === 'GET')) {
      return Promise.resolve({
        ok: true,
        json: async () => produtos,
      });
    }

    if (url.includes('/entidades') && (!options.method || options.method === 'GET')) {
      return Promise.resolve({
        ok: true,
        json: async () => entidades,
      });
    }

    if (url.includes('/produtos') && options.method === 'POST') {
      return Promise.resolve({
        ok: true,
        json: async () => ({ mensagem: 'Produto cadastrado com sucesso' }),
      });
    }

    if (url.includes('/doacoes') && options.method === 'POST') {
      return Promise.resolve({
        ok: true,
        json: async () => ({ mensagem: 'Doação registrada com sucesso' }),
      });
    }

    if (url.includes('/produtos/') && options.method === 'DELETE') {
      return Promise.resolve({
        ok: true,
        status: 204,
        json: async () => ({}),
      });
    }

    return Promise.resolve({
      ok: true,
      json: async () => [],
    });
  });
}

it('renderiza o formulario com os dois caminhos de doador', async () => {
  mockProdutosApi();

  render(<Produtos />);

  expect(screen.getByPlaceholderText('Nome do produto')).toBeTruthy();
  expect(screen.getByPlaceholderText('Descrição')).toBeTruthy();
  expect(screen.getByPlaceholderText('Unidade de medida')).toBeTruthy();
  expect(screen.getByPlaceholderText('Nome do doador')).toBeTruthy();
  expect(screen.getByPlaceholderText('Quantidade inicial')).toBeTruthy();

  fireEvent.click(screen.getByRole('button', { name: /entidade/i }));

  expect(await screen.findByLabelText('Entidade')).toBeTruthy();
});

it('cadastra produto com doador avulso', async () => {
  mockProdutosApi([], [{ id: 1, nome: 'Casa Solidaria' }]);

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

  const doacaoPost = fetch.mock.calls.find(
    ([url, options]) => url === 'http://localhost:8080/doacoes' && options?.method === 'POST'
  );

  expect(JSON.parse(doacaoPost[1].body)).toMatchObject({
    produto: 'Arroz',
    quantidade: 10,
    doador: 'Joao Silva',
    observacao: 'Entrada registrada com doador avulso Joao Silva',
  });
});

it('cadastra produto com entidade selecionada', async () => {
  mockProdutosApi([], [{ id: 1, nome: 'Casa Solidaria' }]);

  render(<Produtos />);

  fireEvent.click(screen.getByRole('button', { name: /entidade/i }));

  expect(await screen.findByText('Casa Solidaria')).toBeTruthy();

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

  global.fetch.mockImplementation((url, options = {}) => {
    if (url === 'http://localhost:8080/produtos' && (!options.method || options.method === 'GET')) {
      return Promise.resolve({
        ok: true,
        json: async () => produtos,
      });
    }

    if (url === 'http://localhost:8080/entidades' && (!options.method || options.method === 'GET')) {
      return Promise.resolve({
        ok: true,
        json: async () => [],
      });
    }

    if (url === 'http://localhost:8080/produtos/1' && options.method === 'DELETE') {
      produtos.splice(0, produtos.length);
      return Promise.resolve({
        ok: true,
        status: 204,
        json: async () => ({}),
      });
    }

    return Promise.resolve({
      ok: true,
      json: async () => ({ mensagem: 'Produto cadastrado com sucesso' }),
    });
  });

  render(<Produtos />);

  expect(await screen.findByText('Arroz')).toBeTruthy();

  fireEvent.click(screen.getByRole('button', { name: /excluir produto arroz/i }));

  expect(await screen.findByRole('dialog')).toBeTruthy();
  expect(screen.getByText(/tem certeza que deseja excluir/i)).toBeTruthy();

  const dialog = screen.getByRole('dialog');
  fireEvent.click(within(dialog).getByRole('button', { name: /^excluir$/i }));

  expect(await screen.findByText('Produto excluído com sucesso')).toBeTruthy();
  expect(screen.queryByText('Arroz')).toBeNull();
});
