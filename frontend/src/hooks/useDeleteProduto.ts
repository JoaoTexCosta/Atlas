import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produtoService } from '../services/ProdutoService';

export function useDeleteProduto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: produtoService.remove,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['produtos'] });
    },
  });
}
