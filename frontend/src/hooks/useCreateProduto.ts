import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produtoService } from '../services/ProdutoService';

export function useCreateProduto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: produtoService.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['produtos'] });
    },
  });
}
