import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../components/Icons';
import { ProdutoForm } from '../components/ProdutoForm';
import { useProduto } from '../hooks/useProduto';
import { useUpdateProduto } from '../hooks/useUpdateProduto';
import { getApiErrorMessage } from '../services/api';
import type { ProdutoFormData } from '../types/ProdutoSchema';

export function EditScreen() {
  const { id: rawId } = useParams();
  const id = Number(rawId);
  const navigate = useNavigate();
  const { data: produto, isLoading, isError, error, refetch } = useProduto(id);
  const updateMutation = useUpdateProduto();
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdate = async (data: ProdutoFormData) => {
    setErrorMessage('');
    try {
      await updateMutation.mutateAsync({ id, produto: data });
      navigate('/', { state: { notice: 'Produto atualizado com sucesso.' } });
    } catch (requestError) {
      setErrorMessage(getApiErrorMessage(requestError));
    }
  };

  if (!Number.isInteger(id) || id < 1) return <div className="error-panel"><h2>Identificador inválido</h2><p>O produto solicitado não possui um ID válido.</p><Link to="/" className="btn btn-primary">Voltar para produtos</Link></div>;
  if (isLoading) return <div className="loading-state"><span className="spinner spinner-dark" /><strong>Carregando produto...</strong></div>;
  if (isError || !produto) return <div className="error-panel"><div className="error-icon"><Icon name="alert" /></div><h2>Não foi possível localizar o produto</h2><p>{getApiErrorMessage(error)}</p><button className="btn btn-primary" onClick={() => refetch()}>Tentar novamente</button><Link to="/" className="btn btn-ghost">Voltar</Link></div>;

  const initialValues: ProdutoFormData = {
    nome: produto.nome,
    descricao: produto.descricao,
    marca: produto.marca,
    categoria: produto.categoria,
    codigo: produto.codigo,
    preco: Number(produto.preco),
    estoque: Number(produto.estoque),
    data_validade: produto.data_validade.slice(0, 10),
  };

  return <ProdutoForm title="Editar produto" subtitle={`Atualize as informações de ${produto.nome}.`} initialValues={initialValues} submitLabel="Salvar alterações" isSaving={updateMutation.isPending} errorMessage={errorMessage} onSubmit={handleUpdate} />;
}
