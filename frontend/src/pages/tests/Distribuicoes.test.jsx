import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, it, vi } from 'vitest';
import { Distribuicoes } from '../Distribuicoes.jsx';

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('renderiza o formulario com selects', async () => {
  global.fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, nome: 'Arroz' }],
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 10, nome: 'Casa Solidaria' }],
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

  render(<Distribuicoes />);

  expect(await screen.findByLabelText('Produto')).toBeTruthy();
  expect(screen.getByLabelText('Entidade')).toBeTruthy();
});

it('mostra mensagem de sucesso apos submit', async () => {
  global.fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, nome: 'Arroz' }],
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 10, nome: 'Casa Solidaria' }],
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ mensagem: 'Distribuição registrada' }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [],
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
});
