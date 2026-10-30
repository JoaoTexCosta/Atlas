import { useEffect, useState, type ChangeEvent, type ReactNode } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Icon } from './Icons';

type Perfil = { nome: string; contato: string; foto: string };
const perfilInicial: Perfil = { nome: 'Administrador', contato: '', foto: '' };

function carregarPerfil(): Perfil {
  try {
    const salvo = localStorage.getItem('atlas-perfil');
    return salvo ? { ...perfilInicial, ...JSON.parse(salvo) } : perfilInicial;
  } catch {
    return perfilInicial;
  }
}

function Avatar({ perfil, className = '' }: { perfil: Perfil; className?: string }) {
  const iniciais = perfil.nome.trim().split(/\s+/).slice(0, 2).map((parte) => parte[0]).join('').toUpperCase() || 'AD';
  return <span className={`avatar ${className}`}>{perfil.foto ? <img src={perfil.foto} alt="Foto do perfil" /> : iniciais}</span>;
}

function Janela({ titulo, fechar, children }: { titulo: string; fechar: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') fechar(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fechar]);
  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) fechar(); }}>
      <section className="modal-card" role="dialog" aria-modal="true" aria-label={titulo}>
        <div className="modal-heading"><h2>{titulo}</h2><button type="button" className="modal-close" onClick={fechar} aria-label="Fechar janela"><Icon name="close" size={19} /></button></div>
        {children}
      </section>
    </div>
  );
}

export function AppLayout() {
  const location = useLocation();
  const [janela, setJanela] = useState<'perfil' | 'ajuda' | null>(null);
  const [perfil, setPerfil] = useState<Perfil>(carregarPerfil);
  const [rascunho, setRascunho] = useState(perfil);
  const [erroFoto, setErroFoto] = useState('');
  const titulo = location.pathname === '/create' ? 'Cadastro de produtos' : location.pathname.startsWith('/edit/') ? 'Edição de produtos' : location.pathname.startsWith('/delete/') ? 'Exclusão de produtos' : '';
  const abrirPerfil = () => { setRascunho(perfil); setErroFoto(''); setJanela('perfil'); };

  const trocarFoto = (event: ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;
    if (!arquivo.type.startsWith('image/') || arquivo.size > 1_000_000) {
      setErroFoto('Escolha uma imagem de até 1 MB.');
      return;
    }
    setErroFoto('');
    const leitor = new FileReader();
    leitor.onload = () => setRascunho((atual) => ({ ...atual, foto: String(leitor.result) }));
    leitor.readAsDataURL(arquivo);
  };

  const salvarPerfil = () => {
    const atualizado = { ...rascunho, nome: rascunho.nome.trim() || 'Administrador', contato: rascunho.contato.trim() };
    try {
      localStorage.setItem('atlas-perfil', JSON.stringify(atualizado));
      setPerfil(atualizado);
      setJanela(null);
    } catch {
      setErroFoto('Não foi possível salvar. Experimente usar uma foto menor.');
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/" className="brand-lockup" aria-label="Voltar ao catálogo">
          <div className="brand-mark"><Icon name="layers" size={22} /></div>
          <div><strong>Atlas<span>.</span></strong><small>GESTÃO DE ESTOQUE</small></div>
        </Link>
        <div className="side-label">MENU PRINCIPAL</div>
        <nav className="side-nav" aria-label="Menu principal">
          <NavLink to="/" className="nav-item active"><Icon name="box" /><span>Produtos</span><span className="nav-dot" /></NavLink>
          <div className="sub-nav">
            <NavLink to="/" end className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}>Visualizar catálogo</NavLink>
            <NavLink to="/create" className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}><Icon name="plus" size={14} /> Cadastrar novo produto</NavLink>
          </div>
        </nav>
        <div className="sidebar-bottom">
          <button type="button" className="help-card" onClick={() => setJanela('ajuda')}>
            <span className="help-icon"><Icon name="alert" size={17} /></span>
            <strong>Precisa de ajuda? <Icon name="chevron" size={13} /></strong>
            <span>Veja como cadastrar, pesquisar e gerenciar seus produtos.</span>
          </button>
          <button type="button" className="profile-mini" onClick={abrirPerfil} aria-label="Abrir perfil">
            <Avatar perfil={perfil} />
            <span className="profile-copy"><strong>{perfil.nome}</strong><span>Perfil do sistema</span></span>
            <span className="profile-menu">•••</span>
          </button>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <nav className="breadcrumb" aria-label="Você está aqui">
            <span>Workspace</span><Icon name="chevron" size={14} />
            {titulo ? <><Link to="/">Produtos</Link><Icon name="chevron" size={14} /><strong>{titulo}</strong></> : <strong>Produtos</strong>}
          </nav>
          <div className="topbar-right">
            <span className="system-status"><i /> API conectada por demanda</span>
            <button type="button" className="avatar-button" onClick={abrirPerfil} title="Meu perfil" aria-label="Abrir perfil"><Avatar perfil={perfil} className="top-avatar" /></button>
          </div>
        </header>
        <div className="page-content"><Outlet /></div>
        <footer className="footer"><span>ATLAS INVENTORY</span><span>Gestão simples, controle inteligente.</span></footer>
      </main>
      {janela === 'perfil' && (
        <Janela titulo="Meu perfil" fechar={() => setJanela(null)}>
          <div className="profile-photo-area">
            <Avatar perfil={rascunho} className="avatar-large" />
            <label className="photo-upload">Alterar foto<input type="file" accept="image/*" onChange={trocarFoto} /></label>
            {rascunho.foto && <button type="button" className="remove-photo" onClick={() => setRascunho({ ...rascunho, foto: '' })}>Remover foto</button>}
          </div>
          <div className="profile-fields">
            <label htmlFor="perfil-nome">Nome</label>
            <input id="perfil-nome" maxLength={70} value={rascunho.nome} onChange={(event) => setRascunho({ ...rascunho, nome: event.target.value })} />
            <label htmlFor="perfil-contato">Contato</label>
            <input id="perfil-contato" maxLength={120} placeholder="E-mail ou telefone" value={rascunho.contato} onChange={(event) => setRascunho({ ...rascunho, contato: event.target.value })} />
            {erroFoto && <p className="profile-error">{erroFoto}</p>}
          </div>
          <p className="profile-note">Essas informações são salvas apenas neste navegador.</p>
          <div className="modal-actions"><button type="button" className="btn btn-ghost" onClick={() => setJanela(null)}>Cancelar</button><button type="button" className="btn btn-primary" onClick={salvarPerfil}>Salvar perfil</button></div>
        </Janela>
      )}
      {janela === 'ajuda' && (
        <Janela titulo="Guia rápido" fechar={() => setJanela(null)}>
          <p className="guide-intro">Veja como utilizar o catálogo de produtos.</p>
          <ol className="guide-steps">
            <li><strong>Cadastrar</strong><span>Abra "Cadastrar novo produto", preencha os campos e clique em "Cadastrar produto".</span></li>
            <li><strong>Consultar</strong><span>Na tela "Produtos", pesquise por nome, código ou marca e filtre pela categoria.</span></li>
            <li><strong>Editar</strong><span>Na lista, clique no ícone de lápis do produto e salve as alterações.</span></li>
            <li><strong>Excluir</strong><span>Clique no ícone de lixeira e confirme. A exclusão é definitiva.</span></li>
          </ol>
          <p className="guide-footnote">O Laravel e o banco de dados precisam estar em execução para consultar ou alterar os produtos.</p>
          <div className="modal-actions"><button type="button" className="btn btn-primary" onClick={() => setJanela(null)}>Entendi</button></div>
        </Janela>
      )}
    </div>
  );
}
