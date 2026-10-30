import { useQuery } from '@tanstack/react-query';
import { produtoService } from '../services/ProdutoService';

export function useProduto(id: number) {
  return useQuery({
    queryKey: ['produtos', id],
    queryFn: () => produtoService.getById(id),
    enabled: Number.isInteger(id) && id > 0,
  });
}
