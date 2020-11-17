# lesoft

Sistema de administração de empresa.

## 🚢 Deploy

- Faça import do arquivo dump_inicial.sql;
- Na pasta raiz (backend), rode `composer install`, `npm install`, `cp .env.example .env`, `php artisan key:generate`;
- Verifique em todos os projetos variáveis como url do ambiente, usuário, senha e nome do db, etc;
- Para rodar backend: `php artisan serve --host 0.0.0.0 --port 8000` (substitua host pelo seu ip);
- Para rodar client: `comando `;

## 🔀 Dependências e versões

- MySQL 5.7;
- PHP 7.1;
- Laravel 5.5.4;

## ⚠️ Observações

Frontend em ReactJS(./client)
Backend em Laravel(./)

## A Fazer 
------------ 
 - [x] Login            
 - [x] Produtos         
 - [x] Pedidos          
 - [x] Colaboradores    
 - [x] Contas Bancarias 
 - [x] A Pagar          
 - [x] A Receber          
