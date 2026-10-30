# Atlas — Sistema de Gerenciamento de Produtos

O **Atlas** é uma aplicação full stack para cadastro e gerenciamento de produtos. Desenvolvido com **React e TypeScript** no frontend e **PHP com Laravel** no backend, o sistema utiliza uma API REST integrada ao **MySQL** para realizar operações de cadastro, consulta, atualização e exclusão.

O projeto foi desenvolvido como trabalho acadêmico e reúne as principais etapas de uma aplicação web: interface, formulários, validação, comunicação HTTP e persistência de dados.

## Funcionalidades

- Cadastro de produtos com validação dos campos.
- Listagem de produtos cadastrados e consulta individual.
- Pesquisa por nome, código ou marca e filtro por categoria.
- Edição e exclusão de produtos com confirmação.
- Indicadores de quantidade de produtos, unidades em estoque, itens com estoque zerado e valor total estimado.
- Navegação entre catálogo, cadastro, edição e exclusão.
- Menu de ajuda e janela de perfil com nome, foto e contato.

O perfil exibido na interface é salvo **localmente no navegador** (`localStorage`); não há autenticação de usuários. Os dados dos produtos são armazenados no banco MySQL por meio da API Laravel.

## Tecnologias

| Área | Tecnologias |
| --- | --- |
| Frontend | React, TypeScript, Vite, CSS |
| Backend | PHP, Laravel 10, API REST |
| Banco de dados | MySQL |
| Comunicação HTTP | Axios |
| Formulários e validação | React Hook Form, Zod, `@hookform/resolvers` |
| Consultas e cache | TanStack Query (`@tanstack/react-query`) |
| Rotas da interface | React Router DOM |
| Versionamento | Git e GitHub |

## Estrutura do repositório

```text
projeto_api_rest/
├── backend/          # API REST em Laravel
├── frontend/         # Aplicação em React + Vite
├── .gitignore
└── README.md
```

O frontend e o backend são executados separadamente durante o desenvolvimento.

## Pré-requisitos

- **PHP 8.1 ou superior** com as extensões necessárias ao Laravel, incluindo `zip` para instalação dos pacotes via Composer.
- **Composer** para instalar as dependências do backend.
- **MySQL** em execução (por exemplo, pelo XAMPP).
- **Node.js e npm** compatíveis com a versão do Vite instalada no projeto.

## Como executar

### 1. Clonar o projeto

```bash
git clone https://github.com/JoaoTexCosta/projeto_api_rest.git
cd projeto_api_rest
```

### 2. Configurar o backend

Abra um terminal na pasta `backend`:

```bash
cd backend
composer install
```

Crie o arquivo `.env` a partir do `.env.example`. No CMD do Windows:

```cmd
copy .env.example .env
```

Configure no `.env` as informações do seu banco de dados, por exemplo:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=atlas
DB_USERNAME=root
DB_PASSWORD=
```

O banco `atlas` é apenas um exemplo: crie um banco com esse nome ou informe o nome de um banco existente. Ajuste usuário, senha e porta conforme sua instalação do MySQL.

Em seguida, execute:

```bash
php artisan key:generate
php artisan migrate
php artisan serve
```

O backend normalmente estará disponível em **http://127.0.0.1:8000**, e os endpoints começam com `/api`.

Para inserir dois produtos de exemplo, opcionalmente execute:

```bash
php artisan db:seed
```

### 3. Configurar o frontend

Em **outro terminal**, partindo da pasta raiz do repositório:

```bash
cd frontend
npm install
```

Copie o arquivo de configuração:

```cmd
copy .env.example .env
```

Confira a URL do backend no arquivo `frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Inicie o frontend:

```bash
npm run dev
```

Abra o endereço exibido no terminal, normalmente **http://localhost:5173**. Mantenha o MySQL, o servidor Laravel e o Vite em execução durante o uso.

## Endpoints da API

| Método | Endpoint | Operação |
| --- | --- | --- |
| `GET` | `/api/produto` | Listar produtos |
| `GET` | `/api/produto/{id}` | Consultar produto |
| `POST` | `/api/produto` | Cadastrar produto |
| `PUT` / `PATCH` | `/api/produto/{id}` | Atualizar produto |
| `DELETE` | `/api/produto/{id}` | Excluir produto |

O backend espera os campos `nome`, `descricao`, `marca`, `categoria`, `codigo`, `preco`, `estoque` e `data_validade`. O código do produto deve ser único.

### Exemplo de cadastro

Requisição `POST /api/produto` com corpo JSON:

```json
{
  "nome": "Caderno universitário",
  "descricao": "Caderno de 200 folhas",
  "marca": "Marca A",
  "categoria": "Papelaria",
  "codigo": "CAD001",
  "preco": 24.90,
  "estoque": 30,
  "data_validade": "2030-12-31"
}
```

Para testar a API diretamente, envie os cabeçalhos `Accept: application/json` e `Content-Type: application/json` em ferramentas como Postman ou Insomnia.

## Organização do código

No **frontend**, as telas ficam em `src/screens`, os componentes reutilizáveis em `src/components`, os hooks de consulta e atualização em `src/hooks`, as requisições HTTP em `src/services` e os schemas de dados em `src/types`.

No **backend**, o `ProdutoController` centraliza as operações e validações, o model `Produto` representa os registros e as migrations definem a estrutura da tabela `produtos`. As rotas são registradas em `routes/api.php`.

## Observações

- Os arquivos `.env` contêm configurações locais e não devem ser publicados. Utilize os `.env.example` como referência.
- As pastas `backend/vendor` e `frontend/node_modules` são geradas na instalação e não precisam ser enviadas ao GitHub.
- Caso o Composer informe que a extensão ZIP está ausente, habilite `extension=zip` no `php.ini` utilizado pelo PHP do terminal.
- O backend precisa estar conectado ao MySQL para que o catálogo carregue corretamente.

---

Projeto acadêmico de desenvolvimento web full stack.
