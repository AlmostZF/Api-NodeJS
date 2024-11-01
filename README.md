﻿# Ecommerce API - Frutas e Vegetais 🥭🥬

API RESTful para gerenciar um ecommerce de frutas e vegetais. Esta API permite a manipulação de produtos, gerenciamento de pedidos, autenticação de usuários e carrinhos de compras.

## Introdução
Esta API foi desenvolvida para fornecer uma solução completa para um ecommerce de frutas e vegetais. Com ela, é possível:

Listar produtos (frutas e vegetais) disponíveis
Gerenciar o carrinho de compras
Processar pedidos de compra
Autenticar usuários e fornecer um token JWT para autorização

### estruturação 

### Estrutura do Projeto

```
├── src
│   ├── database           # Configuração da conexão com o banco de dados
│   ├── interface          # Definições de tipos e interfaces dos objetos usados na API
│   ├── models             # Definições dos modelos de dados, incluindo controladores, serviços e providers
│   │   ├── DTOs           # Data Transfer Objects, especificando o formato dos dados retornados pela API
│   │   ├── Common         # Modelos de resposta padrão para as requisições
│   ├── routes             # Definição das rotas de cada recurso da API
│   ├── shared             # Lógica de negócios e manipulação de dados centralizados
│   │   ├── utils          # Funções utilitárias e helpers comuns à aplicação
│   │   ├── middleware     # Funções middleware para interceptar e validar as requisições
│   └── index.js           # Arquivo principal que inicia o servidor
│
├── tests                  # Testes unitários e de integração para serviços e rotas
├── env.ts                 # Exemplo do arquivo de variáveis de ambiente
├── package.json           # Configurações de dependências e scripts do projeto
└── README.md              # Documentação da API
````


## Pré-requisitos
Node.js (versão 14+)
Banco de dados MySQL
Gerenciador de pacotes npm ou yarn

## Instalação
git clone https://github.com/AlmostZF/Api-NodeJS.git
cd Api-NodeJS
npm install

caso queira ver o front-end o repositório
https://github.com/AlmostZF/projectStore.git

## Configuração
A API requer algumas variáveis de ambiente para se conectar ao banco de dados e configurar a autenticação. No diretório raiz, crie um arquivo .env e configure as variáveis como abaixo:

````
const databaseConfig = {
    host: 'localhost',
    user: 'usuario',
    password: 'senha',
    port: '3306', 
    database: 'nome da datebase'
}
const secretKey = 'sua_chave_secreta';
const secretKeyRefresh = 'sua_chave_secreta';
````

## Uso
Para rodar a API:

npm start



