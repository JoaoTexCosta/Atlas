import { z } from 'zod';

export const ProdutoSchema = z.object({
  nome: z.string().trim().min(1, 'Informe o nome do produto.').max(100, 'Use até 100 caracteres.'),
  descricao: z.string().trim().min(1, 'Informe uma descrição.'),
  marca: z.string().trim().min(1, 'Informe a marca.').max(100, 'Use até 100 caracteres.'),
  categoria: z.string().trim().min(1, 'Informe a categoria.').max(100, 'Use até 100 caracteres.'),
  codigo: z.string().trim().min(1, 'Informe o código.').max(20, 'Use até 20 caracteres.'),
  preco: z.number({ error: 'Informe um preço válido.' }).finite().min(0, 'O preço não pode ser negativo.'),
  estoque: z.number({ error: 'Informe uma quantidade válida.' }).int('O estoque deve ser um número inteiro.').min(0, 'O estoque não pode ser negativo.'),
  data_validade: z.string().min(1, 'Informe a data de validade.'),
});

export type ProdutoFormData = z.infer<typeof ProdutoSchema>;

export interface Produto extends ProdutoFormData {
  id: number;
  created_at?: string;
  updated_at?: string;
}

export const produtoVazio: ProdutoFormData = {
  nome: '',
  descricao: '',
  marca: '',
  categoria: '',
  codigo: '',
  preco: 0,
  estoque: 0,
  data_validade: '',
};
