import { useQuery } from '@tanstack/react-query';
import { produtoService } from '../services/ProdutoService';

export function useProdutos() {
  return useQuery({
    queryKey: ['produtos'],
    queryFn: produtoService.getAll,
    staleTime: 1000 * 30,
  });
}
