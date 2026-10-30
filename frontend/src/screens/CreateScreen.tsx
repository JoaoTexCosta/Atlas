import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProdutoForm } from '../components/ProdutoForm';
import { useCreateProduto } from '../hooks/useCreateProduto';
import { getApiErrorMessage } from '../services/api';
import { produtoVazio, type ProdutoFormData } from '../types/ProdutoSchema';

export function CreateScreen() {
  const navigate = useNavigate();
  const createMutation = useCreateProduto();
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreate = async (data: ProdutoFormData) => {
    setErrorMessage('');
    try {
      await createMutation.mutateAsync(data);
      navigate('/', { state: { notice: 'Produto cadastrado com sucesso.' } });
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    }
  };

  return <ProdutoForm title="Adicionar produto" subtitle="Inclua um novo item no seu catálogo de estoque." initialValues={produtoVazio} submitLabel="Cadastrar produto" isSaving={createMutation.isPending} errorMessage={errorMessage} onSubmit={handleCreate} />;
}
