import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { Entidades } from '../Entidades.jsx';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('pagina a lista de entidades quando ha mais registros que o limite', async () => {
  globalThis.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, nome: 'Entidade 1', cnpj: '1', email: 'e1@email.com', telefone: '111' },
      { id: 2, nome: 'Entidade 2', cnpj: '2', email: 'e2@email.com', telefone: '222' },
      { id: 3, nome: 'Entidade 3', cnpj: '3', email: 'e3@email.com', telefone: '333' },
      { id: 4, nome: 'Entidade 4', cnpj: '4', email: 'e4@email.com', telefone: '444' },
      { id: 5, nome: 'Entidade 5', cnpj: '5', email: 'e5@email.com', telefone: '555' },
      { id: 6, nome: 'Entidade 6', cnpj: '6', email: 'e6@email.com', telefone: '666' },
      { id: 7, nome: 'Entidade 7', cnpj: '7', email: 'e7@email.com', telefone: '777' },
    ],
  });

  render(<Entidades />);

  expect(await screen.findByText('Entidade 1')).toBeTruthy();
  expect(screen.queryByText('Entidade 7')).toBeNull();

  fireEvent.click(screen.getByRole('button', { name: /próxima/i }));

  expect(screen.getByText('Entidade 7')).toBeTruthy();
  expect(screen.queryByText('Entidade 1')).toBeNull();
});
