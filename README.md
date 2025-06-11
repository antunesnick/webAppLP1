# 📋 Sistema de Cadastro Web - Trabalho Bimestral

Este projeto consiste no desenvolvimento de uma aplicação web com funcionalidades de cadastro e autenticação, seguindo os requisitos propostos para o trabalho bimestral da disciplina.

## 🔒 Funcionalidades

- Autenticação de usuários com uso de cookies e sessão HTTP
- Validação de formulários (não permite campos vazios)
- Armazenamento e gerenciamento de dados com JSON Server
- Interface de menu para navegação e logout
- Acesso público para:
  - Página inicial (vitrine de produtos)
  - Página de login
- Acesso restrito para:
  - Cadastro de Clientes
  - Cadastro de Produtos
  - Cadastro de Fornecedores
  - Cadastro de Entregadores
  - Cadastro de Categorias
  - Cadastro de Usuários do Sistema

## 🚀 Tecnologias Utilizadas

- HTML5 / CSS3 / JavaScript / Bootstrap 
- JSON Server (backend fake REST API)
- Git e GitHub (versionamento de código)
- Cookies / Sessão HTTP (controle de acesso)

## 📁 Organização do Projeto

```bash
/
├── menus/
│   ├── login/    # Página de login     
│   └── menu/ # Menu principal do sistema         
├── cadastros/
│   ├── cliente.html
│   ├── produto.html
│   ├── fornecedor.html
│   ├── entregador.html
│   ├── categoria.html
│   └── usuario.html
├── server side/    
└── README.md
```

## 👥 Equipe de Desenvolvimento

- Nickolas Antunes - https://github.com/antunesnick
- Guilherme Aparecido - https://github.com/Aparecido777

## 🧪 Como Executar o Projeto

1. **Clone o repositório**
```bash
git clone https://github.com/antunesnick/WebApp-LP1.git
cd WebApp-LP1
```

2. **Instale o JSON Server** (caso ainda não tenha)
```bash
npm install -g json-server
```

3. **Execute o servidor JSON**
```bash
json-server --watch db.json --port 3000
```

4. **Abra o projeto no navegador**
- Acesse `index.html` para a vitrine
- Faça login para acessar as telas de cadastro

## 📌 Requisitos Atendidos

✅ Cadastro de 6 entidades  
✅ Validação de formulários  
✅ Proteção com autenticação e sessão  
✅ JSON Server como backend  
✅ Menu com navegação e logout  
✅ Acesso público e privado bem definidos  
✅ Versionamento com Git e GitHub

---

> Projeto desenvolvido como requisito avaliativo bimestral da disciplina de [Linguagens de programação 1] – [Universidade do Oeste Paulista].
