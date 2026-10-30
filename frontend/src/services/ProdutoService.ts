import type { Produto, ProdutoFormData } from '../types/ProdutoSchema';
import api from './api';

export const produtoService = {
  getAll: async (): Promise<Produto[]> => {
    const response = await api.get<Produto[] | { data: Produto[] }>('/produto');
    return Array.isArray(response.data) ? response.data : response.data.data;
  },

  getById: async (id: number): Promise<Produto> => {
    const response = await api.get<Produto>(`/produto/${id}`);
    return response.data;
  },

  create: async (produto: ProdutoFormData): Promise<Produto> => {
    const response = await api.post<Produto>('/produto', produto);
    return response.data;
  },

  update: async ({ id, produto }: { id: number; produto: ProdutoFormData }): Promise<Produto> => {
    const response = await api.put<Produto>(`/produto/${id}`, produto);
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/produto/${id}`);
  },
};
