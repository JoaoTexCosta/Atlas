import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProdutos } from '../hooks/useProdutos';
import { getApiErrorMessage } from '../services/api';
import type { Produto } from '../types/ProdutoSchema';
import { Icon } from '../components/Icons';

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const date = new Intl.DateTimeFormat('pt-BR');

function formatDate(value: string) {
  if (!value) return '—';
  const parsed = new Date(`${value.slice(0, 10)}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? value : date.format(parsed);
}

function getStockStatus(quantity: number) {
  if (quantity === 0) return { label: 'Sem estoque', className: 'stock-empty' };
  if (quantity <= 5) return { label: 'Estoque baixo', className: 'stock-low' };
  return { label: 'Disponível', className: 'stock-ok' };
}

export function ListScreen() {
  const location = useLocation();
  const notice = (location.state as { notice?: string } | null)?.notice;
  const { data: produtos = [], isLoading, isError, error, refetch, isFetching } = useProdutos();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const buscar = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', buscar);
    return () => window.removeEventListener('keydown', buscar);
  }, []);

  const categories = useMemo(() => ['Todas', ...Array.from(new Set(produtos.map((p) => p.categoria))).sort()], [produtos]);
  const filteredProducts = useMemo(() => {
    const normalized = search.trim().toLocaleLowerCase('pt-BR');
    return produtos.filter((produto) => {
      const matchesSearch = !normalized || [produto.nome, produto.codigo, produto.marca, produto.categoria]
        .some((value) => value.toLocaleLowerCase('pt-BR').includes(normalized));
      const matchesCategory = category === 'Todas' || produto.categoria === category;
      return matchesSearch && matchesCategory;
    });
  }, [produtos, search, category]);

  const totalValue = produtos.reduce((sum, produto) => sum + Number(produto.preco) * produto.estoque, 0);
  const lowStock = produtos.filter((produto) => produto.estoque > 0 && produto.estoque <= 5).length;
  const noStock = produtos.filter((produto) => produto.estoque === 0).length;

  if (isLoading) {
    return <div className="loading-state"><span className="spinner spinner-dark" /><strong>Carregando catálogo...</strong><p>Estamos consultando seus produtos na API.</p></div>;
  }

  if (isError) {
    return (
      <div className="error-panel">
        <div className="error-icon"><Icon name="alert" size={24} /></div>
        <h2>Não foi possível carregar os produtos</h2>
        <p>{getApiErrorMessage(error)}</p>
        <button className="btn btn-primary" onClick={() => refetch()}><Icon name="refresh" size={16} /> Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">SEU NEGÓCIO EM UM SÓ LUGAR</div>
          <h1>Produtos</h1>
          <p>Acompanhe seu catálogo, preços e disponibilidade em estoque.</p>
        </div>
        <Link to="/create" className="btn btn-primary"><Icon name="plus" size={18} /> Novo produto</Link>
      </div>

      {notice && <div className="success-banner"><Icon name="check" size={17} />{notice}</div>}

      <section className="stats-grid" aria-label="Resumo do estoque">
        <article className="stat-card">
          <div className="stat-top"><span className="stat-icon stat-blue"><Icon name="box" /></span><span className="stat-caption">CATÁLOGO</span></div>
          <strong className="stat-value">{produtos.length.toLocaleString('pt-BR')}</strong>
          <span className="stat-label">Produtos cadastrados</span>
          <span className="stat-foot"><i className="tiny-dot dot-blue" /> Itens registrados na API</span>
        </article>
        <article className="stat-card">
          <div className="stat-top"><span className="stat-icon stat-green"><Icon name="layers" /></span><span className="stat-caption">INVENTÁRIO</span></div>
          <strong className="stat-value">{produtos.reduce((sum, produto) => sum + produto.estoque, 0).toLocaleString('pt-BR')}</strong>
          <span className="stat-label">Unidades em estoque</span>
          <span className="stat-foot"><i className="tiny-dot dot-green" /> Quantidade total disponível</span>
        </article>
        <article className="stat-card">
          <div className="stat-top"><span className="stat-icon stat-amber"><Icon name="alert" /></span><span className="stat-caption">ATENÇÃO</span></div>
          <strong className="stat-value">{(lowStock + noStock).toLocaleString('pt-BR')}</strong>
          <span className="stat-label">Itens que precisam de atenção</span>
          <span className="stat-foot"><i className="tiny-dot dot-amber" /> {lowStock} baixo · {noStock} zerado</span>
        </article>
        <article className="stat-card">
          <div className="stat-top"><span className="stat-icon stat-purple"><Icon name="warehouse" /></span><span className="stat-caption">VALOR EM ESTOQUE</span></div>
          <strong className="stat-value stat-money">{money.format(totalValue)}</strong>
          <span className="stat-label">Valor estimado dos produtos</span>
          <span className="stat-foot"><i className="tiny-dot dot-purple" /> Preço unitário × quantidade</span>
        </article>
      </section>

      <section className="table-card">
        <div className="table-card-heading">
          <div><h2>Catálogo de produtos</h2><p>Consulte e gerencie todos os itens cadastrados.</p></div>
          <button className="icon-button" title="Atualizar lista" onClick={() => refetch()} disabled={isFetching}><Icon name="refresh" size={18} /></button>
        </div>
        <div className="table-toolbar">
          <label className="search-box"><Icon name="search" size={18} /><input ref={searchRef} aria-label="Buscar produto" aria-keyshortcuts="Control+K Meta+K" placeholder="Buscar por nome, código ou marca..." value={search} onChange={(event) => setSearch(event.target.value)} /><kbd>Ctrl K</kbd></label>
          <label className="filter-select"><span>Categoria</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>

        <div className="table-wrap">
          <table className="product-table">
            <thead><tr><th>PRODUTO</th><th>CÓDIGO</th><th>CATEGORIA</th><th>PREÇO</th><th>ESTOQUE</th><th>VALIDADE</th><th className="action-heading">AÇÕES</th></tr></thead>
            <tbody>
              {filteredProducts.map((produto: Produto) => {
                const status = getStockStatus(produto.estoque);
                return (
                  <tr key={produto.id}>
                    <td><div className="product-cell"><div className="product-symbol">{produto.nome.trim().charAt(0).toUpperCase()}</div><div className="product-meta"><strong>{produto.nome}</strong><span>{produto.marca}</span></div></div></td>
                    <td><span className="code-pill">{produto.codigo}</span></td>
                    <td><span className="category-text">{produto.categoria}</span></td>
                    <td className="price-cell">{money.format(Number(produto.preco))}</td>
                    <td><div className="stock-cell"><strong>{produto.estoque}</strong><span className={`stock-badge ${status.className}`}>{status.label}</span></div></td>
                    <td className="date-cell">{formatDate(produto.data_validade)}</td>
                    <td><div className="row-actions"><Link to={`/edit/${produto.id}`} className="row-action edit-action" title="Editar produto" aria-label={`Editar ${produto.nome}`}><Icon name="edit" size={16} /></Link><Link to={`/delete/${produto.id}`} className="row-action delete-action" title="Excluir produto" aria-label={`Excluir ${produto.nome}`}><Icon name="trash" size={16} /></Link></div></td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr><td colSpan={7}><div className="empty-state"><div className="empty-icon"><Icon name="package" size={25} /></div><strong>{produtos.length === 0 ? 'Seu catálogo está vazio' : 'Nenhum produto encontrado'}</strong><p>{produtos.length === 0 ? 'Cadastre seu primeiro produto para começar a organizar o estoque.' : 'Tente alterar a busca ou selecionar outra categoria.'}</p>{produtos.length === 0 && <Link to="/create" className="btn btn-primary"><Icon name="plus" size={17} /> Cadastrar primeiro produto</Link>}</div></td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="table-footer"><span>Exibindo <strong>{filteredProducts.length}</strong> de <strong>{produtos.length}</strong> produtos</span><span>Dados sincronizados com a API Laravel</span></div>
      </section>
    </div>
  );
}
