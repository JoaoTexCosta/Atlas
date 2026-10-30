# Atlas — Frontend de Cadastro de Produtos

Frontend em React + TypeScript + Vite para consumir a API Laravel do projeto. A aplicação implementa o CRUD completo de produtos:

- **Consulta:** lista, pesquisa e filtra os produtos retornados pela API.
- **Inserção:** formulário de cadastro com validação.
- **Atualização:** carrega um produto pelo ID e envia as alterações.
- **Exclusão:** tela de confirmação e remoção do produto.

## Bibliotecas utilizadas

- `react-router-dom`: navegação entre as telas.
- `react-hook-form`: gerenciamento dos formulários.
- `zod`: validação dos dados digitados.
- `@hookform/resolvers`: integração entre Zod e React Hook Form.
- `axios`: requisições HTTP para a API Laravel.
- `@tanstack/react-query`: consultas, cache e atualização dos dados após as operações.

## Integração com o backend

O frontend foi ajustado para as rotas existentes no Laravel:

| Operação | Método | URL |
| --- | --- | --- |
| Listar produtos | GET | `/api/produto` |
| Consultar um produto | GET | `/api/produto/{id}` |
| Cadastrar produto | POST | `/api/produto` |
| Atualizar produto | PUT | `/api/produto/{id}` |
| Excluir produto | DELETE | `/api/produto/{id}` |

Os campos enviados são `nome`, `descricao`, `marca`, `categoria`, `codigo`, `preco`, `estoque` e `data_validade`, conforme as regras do `ProdutoController` Laravel.

## Como executar

### 1. Inicie o backend Laravel

Em um terminal, entre na pasta do projeto Laravel, configure seu `.env`, certifique-se de que o banco de dados está ativo e inicie o servidor:

```bash
php artisan serve
```

Por padrão, a API ficará disponível em `http://127.0.0.1:8000`.

### 2. Configure o frontend

Abra outro terminal, entre na pasta deste frontend e instale as dependências:

```bash
npm install
```

Copie `.env.example` para `.env` (no Windows, pode usar `copy .env.example .env`) e confira a URL:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Se o Laravel estiver em outra porta ou endereço, altere essa variável.

### 3. Execute o Vite

```bash
npm run dev
```

Abra o endereço informado pelo Vite, normalmente `http://localhost:5173`.

## Observações

- Backend e frontend são aplicações separadas e devem ficar em execução ao mesmo tempo.
- O `config/cors.php` do backend analisado já permite requisições de origens diferentes para `api/*` (`allowed_origins` está como `*`).
- As validações também são executadas pelo Laravel. Quando a API retorna erros de validação HTTP 422, o frontend apresenta a primeira mensagem recebida.
- Não é necessário instalar dependências PHP dentro desta pasta; `composer install` deve ser executado apenas na pasta do Laravel.

## Interface

- A página de produtos aproveita a altura da janela, com rolagem independente da lista quando necessário. Em telas menores, a página se adapta para permitir a navegação.
- O menu lateral oferece acesso direto ao catálogo e ao cadastro. A busca também pode ser acessada com `Ctrl + K`.
- Os breadcrumbs permitem voltar para a listagem a partir das telas de cadastro, edição e exclusão.
- Os ícones de usuário abrem o perfil. Nome, contato e foto podem ser alterados, com os dados salvos apenas no navegador por meio de `localStorage`. Não há sistema de autenticação.
- A opção **Precisa de ajuda?** apresenta um guia de uso.

A interface utiliza como cor principal `#FF4655`. O código-fonte pode ser entregue sem a pasta `node_modules`, já que as dependências são instaladas com `npm install`.
