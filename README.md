# Ecommerce API - Frutas e Vegetais 🥭🥬

API RESTful para gerenciar um ecommerce de frutas e vegetais. Esta API permite a manipulação de produtos, gerenciamento de pedidos, autenticação de usuários e carrinhos de compras.

## Introdução
Esta API foi desenvolvida para fornecer uma solução completa para um ecommerce de frutas e vegetais. Com ela, é possível:

Listar produtos (frutas e vegetais) disponíveis
Gerenciar o carrinho de compras
Processar pedidos de compra
Autenticar usuários e fornecer um token JWT para autorização

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

const databaseConfig = {
    host: 'localhost',
    user: 'usuario',
    password: 'senha',
    port: '3306', 
    database: 'nome da datebase'
}
const secretKey = 'sua_chave_secreta';
const secretKeyRefresh = 'sua_chave_secreta';

## Uso
Para rodar a API:

npm start



