import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { ProdutoSchema, type ProdutoFormData } from '../types/ProdutoSchema';
import { Icon } from './Icons';

interface ProdutoFormProps {
  title: string;
  subtitle: string;
  initialValues: ProdutoFormData;
  submitLabel: string;
  isSaving: boolean;
  errorMessage?: string;
  onSubmit: (data: ProdutoFormData) => Promise<void>;
}

export function ProdutoForm({ title, subtitle, initialValues, submitLabel, isSaving, errorMessage, onSubmit }: ProdutoFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ProdutoFormData>({
    resolver: zodResolver(ProdutoSchema),
    defaultValues: initialValues,
  });

  return (
    <div className="form-page">
      <div className="page-heading form-heading">
        <div>
          <div className="eyebrow">CATÁLOGO / PRODUTOS</div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <Link to="/" className="btn btn-ghost"><span>←</span> Voltar para produtos</Link>
      </div>

      <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-main-card">
          <div className="section-heading">
            <div className="section-icon"><Icon name="box" /></div>
            <div><h2>Informações do produto</h2><p>Preencha os dados que identificam o item no catálogo.</p></div>
          </div>

          {errorMessage && <div className="form-alert"><Icon name="alert" size={17} />{errorMessage}</div>}

          <div className="form-grid">
            <div className="field field-span-2">
              <label htmlFor="nome">Nome do produto <em>*</em></label>
              <input id="nome" placeholder="Ex.: Café especial em grãos" {...register('nome')} />
              {errors.nome && <small className="field-error">{errors.nome.message}</small>}
            </div>
            <div className="field field-span-2">
              <label htmlFor="descricao">Descrição <em>*</em></label>
              <textarea id="descricao" rows={3} placeholder="Descreva as principais características do produto..." {...register('descricao')} />
              {errors.descricao && <small className="field-error">{errors.descricao.message}</small>}
            </div>
            <div className="field">
              <label htmlFor="marca">Marca <em>*</em></label>
              <input id="marca" placeholder="Ex.: Serra do Vale" {...register('marca')} />
              {errors.marca && <small className="field-error">{errors.marca.message}</small>}
            </div>
            <div className="field">
              <label htmlFor="categoria">Categoria <em>*</em></label>
              <input id="categoria" placeholder="Ex.: Alimentos" {...register('categoria')} />
              {errors.categoria && <small className="field-error">{errors.categoria.message}</small>}
            </div>
            <div className="field field-span-2">
              <label htmlFor="codigo">Código do produto <em>*</em></label>
              <input id="codigo" placeholder="Ex.: CAF-001" maxLength={20} {...register('codigo')} />
              {errors.codigo && <small className="field-error">{errors.codigo.message}</small>}
            </div>
          </div>

          <div className="section-heading section-heading-spaced">
            <div className="section-icon"><Icon name="warehouse" /></div>
            <div><h2>Estoque e validade</h2><p>Defina o preço, a quantidade disponível e a validade.</p></div>
          </div>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="preco">Preço unitário <em>*</em></label>
              <div className="input-prefix"><span>R$</span><input id="preco" type="number" step="0.01" min="0" placeholder="0,00" {...register('preco', { valueAsNumber: true })} /></div>
              {errors.preco && <small className="field-error">{errors.preco.message}</small>}
            </div>
            <div className="field">
              <label htmlFor="estoque">Quantidade em estoque <em>*</em></label>
              <input id="estoque" type="number" min="0" step="1" placeholder="0" {...register('estoque', { valueAsNumber: true })} />
              {errors.estoque && <small className="field-error">{errors.estoque.message}</small>}
            </div>
            <div className="field field-span-2">
              <label htmlFor="data_validade">Data de validade <em>*</em></label>
              <input id="data_validade" type="date" {...register('data_validade')} />
              {errors.data_validade && <small className="field-error">{errors.data_validade.message}</small>}
            </div>
          </div>

          <div className="form-actions">
            <Link to="/" className="btn btn-ghost">Cancelar</Link>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? <><span className="spinner" /> Salvando...</> : <><Icon name="check" size={17} /> {submitLabel}</>}
            </button>
          </div>
        </div>
        <aside className="form-aside">
          <div className="tip-card">
            <div className="tip-symbol"><Icon name="check" size={19} /></div>
            <h3>Cadastro organizado</h3>
            <p>Os campos marcados com asterisco são obrigatórios e serão validados antes do envio para a API.</p>
          </div>
          <div className="tip-card muted-tip">
            <span className="tip-kicker">DICA</span>
            <h3>Identificação única</h3>
            <p>Utilize um código exclusivo para cada produto. A API não permite cadastrar dois itens com o mesmo código.</p>
          </div>
        </aside>
      </form>
    </div>
  );
}
