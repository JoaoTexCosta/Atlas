import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produtoService } from '../services/ProdutoService';

export function useUpdateProduto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: produtoService.update,
    onSuccess: async (_produto, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['produtos'] }),
        queryClient.invalidateQueries({ queryKey: ['produtos', variables.id] }),
      ]);
    },
  });
}
