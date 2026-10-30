import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../components/Icons';
import { useProduto } from '../hooks/useProduto';
import { useDeleteProduto } from '../hooks/useDeleteProduto';
import { getApiErrorMessage } from '../services/api';

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function DeleteScreen() {
  const { id: rawId } = useParams();
  const id = Number(rawId);
  const navigate = useNavigate();
  const { data: produto, isLoading, isError, error, refetch } = useProduto(id);
  const deleteMutation = useDeleteProduto();
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async () => {
    setErrorMessage('');
    try {
      await deleteMutation.mutateAsync(id);
      navigate('/', { state: { notice: 'Produto excluído com sucesso.' } });
    } catch (requestError) {
      setErrorMessage(getApiErrorMessage(requestError));
    }
  };

  if (!Number.isInteger(id) || id < 1) return <div className="error-panel"><h2>Identificador inválido</h2><Link to="/" className="btn btn-primary">Voltar para produtos</Link></div>;
  if (isLoading) return <div className="loading-state"><span className="spinner spinner-dark" /><strong>Buscando produto...</strong></div>;
  if (isError || !produto) return <div className="error-panel"><div className="error-icon"><Icon name="alert" /></div><h2>Produto não encontrado</h2><p>{getApiErrorMessage(error)}</p><button className="btn btn-primary" onClick={() => refetch()}>Tentar novamente</button><Link to="/" className="btn btn-ghost">Voltar</Link></div>;

  return (
    <div className="delete-page">
      <div className="eyebrow">CATÁLOGO / PRODUTOS / EXCLUIR</div>
      <section className="delete-card">
        <div className="delete-icon"><Icon name="trash" size={25} /></div>
        <span className="delete-kicker">AÇÃO PERMANENTE</span>
        <h1>Excluir produto?</h1>
        <p>Você está prestes a remover este item do catálogo. Essa ação não poderá ser desfeita.</p>
        <div className="delete-product-preview">
          <div className="product-symbol large-symbol">{produto.nome.trim().charAt(0).toUpperCase()}</div>
          <div className="product-meta"><strong>{produto.nome}</strong><span>{produto.marca} · {produto.codigo}</span></div>
          <strong className="preview-price">{money.format(Number(produto.preco))}</strong>
        </div>
        {errorMessage && <div className="form-alert"><Icon name="alert" size={17} />{errorMessage}</div>}
        <div className="delete-actions">
          <Link to="/" className="btn btn-ghost">Cancelar</Link>
          <button className="btn btn-danger" onClick={handleDelete} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? <><span className="spinner" /> Excluindo...</> : <><Icon name="trash" size={17} /> Sim, excluir produto</>}
          </button>
        </div>
      </section>
    </div>
  );
}
