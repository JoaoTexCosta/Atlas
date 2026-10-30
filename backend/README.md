# API de Produtos

Backend em Laravel 10 para cadastro e gerenciamento de produtos. A API é utilizada pelo frontend React/Vite do trabalho.

## Requisitos

- PHP 8.1 ou superior
- Composer
- MySQL ou MariaDB

## Instalação

```bash
composer install
```

Copie `.env.example` para `.env`, configure `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, `DB_HOST` e `DB_PORT` para seu banco local. Depois execute:

```bash
php artisan key:generate
php artisan migrate
php artisan serve
```

O servidor normalmente inicia em `http://127.0.0.1:8000`. Para cadastrar dois produtos de exemplo, use `php artisan db:seed`. O comando evita inserir os mesmos códigos mais de uma vez.

## Endpoints

| Método | Rota | Ação |
| --- | --- | --- |
| GET | `/api/produto` | Lista produtos |
| GET | `/api/produto/{id}` | Consulta um produto |
| POST | `/api/produto` | Cadastra produto |
| PUT/PATCH | `/api/produto/{id}` | Atualiza produto |
| DELETE | `/api/produto/{id}` | Exclui produto |

Os campos obrigatórios para cadastro e atualização são `nome`, `descricao`, `marca`, `categoria`, `codigo`, `preco`, `estoque` e `data_validade`.

Exemplo de cadastro:

```json
{
  "nome": "Caderno",
  "descricao": "Caderno universitário",
  "marca": "Marca A",
  "categoria": "Papelaria",
  "codigo": "CAD002",
  "preco": 24.9,
  "estoque": 30,
  "data_validade": "2030-12-31"
}
```

Envie os dados em JSON, com `Content-Type: application/json` e `Accept: application/json`. A URL do frontend deve apontar para `http://127.0.0.1:8000/api`, ou para o endereço em que o Laravel estiver rodando.

## Observações

O banco precisa estar iniciado para a API funcionar. O arquivo `.env` contém configurações locais e não deve ser publicado. A pasta `vendor` é recriada pelo Composer e não faz parte da entrega.
