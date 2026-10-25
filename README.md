# 🛒 Sistema de E-Commerce em TypeScript

Projeto acadêmico de um sistema de e-commerce executado via terminal (CLI). O programa permite cadastrar e consultar produtos e clientes, administrar um carrinho de compras, finalizar pedidos e visualizar relatórios do sistema.

O projeto foi desenvolvido utilizando **TypeScript** e **Node.js**, com uma arquitetura modularizada para separar as responsabilidades e facilitar a manutenção do código.

## 📌 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Requisitos](#-requisitos)
- [Como Instalar e Executar](#-como-instalar-e-executar)
- [Como Utilizar o Sistema](#️-como-utilizar-o-sistema)
- [Fluxo de Compra](#-fluxo-de-compra)
- [Observações Importantes](#️-observações-importantes)

## ⚙️ Funcionalidades

### 📦 Produtos

- Listar todos os produtos cadastrados.
- Buscar produtos por ID.
- Cadastrar novos produtos.
- Editar nome, categoria, preço e estoque.
- Remover produtos do sistema.

### 👤 Clientes

- Listar clientes cadastrados.
- Buscar clientes por ID.
- Cadastrar novos clientes.
- Validar campos obrigatórios.
- Evitar o cadastro de e-mails duplicados.

### 🛒 Carrinho de Compras

- Adicionar produtos ao carrinho.
- Consultar itens adicionados.
- Alterar a quantidade de um item.
- Remover itens do carrinho.
- Limpar o carrinho.
- Calcular o subtotal e o valor total da compra.

### 📑 Pedidos

- Finalizar compras associando os pedidos a um cliente.
- Consultar o histórico de pedidos.
- Buscar pedidos por ID.
- Filtrar pedidos por cliente.
- Registrar itens, quantidades, valores e data da transação.

### 📊 Relatórios

- Exibir um resumo geral das operações do sistema.
- Consultar o status e o controle de estoque.
- Gerar relatórios de vendas por produto.
- Gerar relatórios de vendas por cliente.

## 🛠️ Tecnologias Utilizadas

- **[TypeScript](https://www.typescriptlang.org/):** linguagem utilizada no desenvolvimento, com tipagem estática.
- **[Node.js](https://nodejs.org/):** ambiente de execução do JavaScript.
- **[npm](https://www.npmjs.com/):** gerenciador de pacotes e dependências.
- **Readline:** módulo nativo do Node.js utilizado para capturar entradas do usuário pelo terminal.
- **Git e GitHub:** ferramentas utilizadas para versionamento e hospedagem do código-fonte.

## 📁 Estrutura do Projeto

```text
Miniprojeto_Ecommerce_Matozo/
├── src/
│   ├── carrinho.ts      # Gerenciamento do carrinho de compras
│   ├── clientes.ts      # Cadastro e validação de clientes
│   ├── main.ts          # Menu principal e interação com o usuário
│   ├── pedidos.ts       # Processamento e histórico de pedidos
│   ├── produtos.ts      # Gerenciamento de produtos e estoque
│   ├── relatorios.ts    # Geração de relatórios do sistema
│   └── types.ts         # Interfaces e tipos de dados
├── dist/                # Código JavaScript compilado
├── node_modules/        # Dependências instaladas
├── .gitignore           # Arquivos ignorados pelo Git
├── package.json         # Configurações, dependências e scripts
├── package-lock.json    # Registro das versões das dependências
├── tsconfig.json        # Configurações do compilador TypeScript
└── README.md            # Documentação do projeto
```

## 💻 Requisitos

Antes de executar o projeto, certifique-se de que os seguintes programas estejam instalados:

- **Node.js:** versão 16 ou superior.
- **npm:** gerenciador de pacotes instalado junto com o Node.js.
- **Git:** necessário para clonar o repositório.

Para verificar as versões instaladas, execute no terminal:

```bash
node -v
npm -v
git --version
```

## 🚀 Como Instalar e Executar

### 1. Clonar o repositório

```bash
git clone https://github.com/zotoma-dev/Miniprojeto_Ecommerce_Matozo.git
```

### 2. Acessar a pasta do projeto

```bash
cd Miniprojeto_Ecommerce_Matozo
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Compilar o código TypeScript

```bash
npm run build
```

### 5. Executar a aplicação

```bash
npm start
```

**Observação:** os comandos `npm run build` e `npm start` dependem dos scripts definidos no arquivo `package.json`.

## 🖥️ Como Utilizar o Sistema

Após iniciar a aplicação, será exibido um menu interativo no terminal. Utilize os números correspondentes às opções para navegar pelas funcionalidades.

Exemplo do menu principal:

```text
====================================
       SISTEMA DE E-COMMERCE
====================================
1 - Gerenciar Produtos
2 - Gerenciar Clientes
3 - Gerenciar Carrinho
4 - Processar Pedidos
5 - Visualizar Relatórios
0 - Sair do Sistema
====================================
Opção:
```

Selecione a opção desejada e siga as instruções apresentadas pelo sistema.

## 🛍️ Fluxo de Compra

O fluxo básico de compra do sistema segue estas etapas:

1. Cadastrar ou selecionar um cliente.
2. Consultar os produtos disponíveis.
3. Adicionar produtos ao carrinho.
4. Definir as quantidades desejadas.
5. Consultar os valores da compra.
6. Finalizar o pedido.
7. Consultar o histórico de pedidos e os relatórios.

## ⚠️ Observações Importantes

- O projeto possui finalidade acadêmica e demonstra conceitos fundamentais de programação com TypeScript e Node.js.
- A aplicação funciona por meio de uma interface de linha de comando (CLI), sem interface gráfica.
- O código TypeScript localizado na pasta `src/` é compilado para JavaScript na pasta `dist/`.
- A pasta `node_modules/` contém as dependências instaladas e normalmente não precisa ser enviada ao GitHub.
- A pasta `dist/` é gerada durante a compilação, conforme as configurações do projeto.
- A execução correta depende das configurações e dos scripts existentes no arquivo `package.json`.

## 🎯 Objetivo Acadêmico

Este projeto tem como objetivo aplicar conceitos de lógica de programação, TypeScript, modularização, tipagem estática, manipulação de dados e desenvolvimento de aplicações executadas no terminal.

A implementação também permite praticar a organização de projetos, o gerenciamento de dependências com npm e o controle de versão utilizando Git e GitHub.

---

**Desenvolvido como projeto acadêmico de estudo de TypeScript e Node.js.**
