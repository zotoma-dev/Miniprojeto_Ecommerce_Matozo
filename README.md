# Sistema de E-commerce em TypeScript

Projeto acadêmico de um sistema simples de e-commerce executado pelo terminal. O programa permite cadastrar e consultar produtos e clientes, administrar um carrinho de compras, finalizar pedidos e visualizar relatórios básicos.

O projeto foi desenvolvido com *TypeScript* e *Node.js*, utilizando funções e módulos separados para organizar as responsabilidades do sistema.

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Requisitos](#requisitos)
- [Como instalar e executar](#como-instalar-e-executar)
- [Como utilizar o sistema](#como-utilizar-o-sistema)
- [Como funciona uma compra](#como-funciona-uma-compra)
- [Observações importantes](#observações-importantes)

## Funcionalidades

### Produtos

- Listar os produtos cadastrados.
- Buscar um produto pelo ID.
- Cadastrar um produto.
- Editar nome, categoria, preço ou estoque.
- Remover um produto.

### Clientes

- Listar os clientes cadastrados.
- Buscar um cliente pelo ID.
- Cadastrar um cliente.
- Validar informações obrigatórias e impedir e-mails duplicados.

### Carrinho de compras

- Adicionar produtos ao carrinho.
- Consultar os itens do carrinho.
- Alterar a quantidade de um produto.
- Remover um produto do carrinho.
- Limpar o carrinho.
- Calcular o subtotal dos itens e o valor total.

### Pedidos

- Finalizar uma compra para um cliente cadastrado.
- Consultar os pedidos registrados.
- Buscar um pedido pelo ID.
- Consultar os pedidos de um cliente.
- Registrar itens, quantidades, valores e data do pedido.

### Relatórios

- Exibir um resumo geral do sistema.
- Consultar informações de estoque.
- Consultar vendas por produto.
- Consultar vendas por cliente.

## Tecnologias utilizadas

- *TypeScript* — linguagem usada no desenvolvimento.
- *Node.js* — ambiente que executa o JavaScript gerado pelo TypeScript.
- *npm* — ferramenta utilizada para instalar as dependências do projeto.
- *readline* — módulo nativo do Node.js usado para receber respostas digitadas no terminal.

Não é necessária uma biblioteca para criar interface gráfica. A interação acontece diretamente pelo terminal.

## Estrutura do projeto

text
Miniprojeto_Ecommerce_Matozo/
├── src/
│   ├── carrinho.ts
│   ├── clientes.ts
│   ├── main.ts
│   ├── pedidos.ts
│   ├── produtos.ts
│   ├── relatorios.ts
│   └── types.ts
├── dist/                 # Arquivos JavaScript gerados na compilação
├── node_modules/         # Dependências instaladas pelo npm
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md


### O que cada arquivo faz?

| Arquivo | Responsabilidade |
|---|---|
| src/main.ts | Contém o menu principal, os submenus e a interação com o usuário pelo terminal. Chama as funções dos demais módulos. |
| src/types.ts | Define os tipos Produto, Cliente, ItemCarrinho, ItemPedido e Pedido, mantendo os dados organizados e tipados. |
| src/produtos.ts | Gerencia os produtos: listagem, busca, cadastro, edição e remoção. Também mantém os dados de estoque utilizados pelo sistema. |
| src/clientes.ts | Gerencia os clientes, incluindo listagem, busca e cadastro, com validações de nome e e-mail. |
| src/carrinho.ts | Controla os itens do carrinho, quantidades, remoção de itens, subtotais, total e limpeza do carrinho. |
| src/pedidos.ts | Finaliza compras, registra pedidos e permite consultar pedidos. Também verifica cliente, carrinho e estoque durante a finalização. |
| src/relatorios.ts | Consolida e apresenta informações gerais, dados de estoque e resumos de vendas por produto e por cliente. |
| tsconfig.json | Configura como o TypeScript deve verificar e compilar os arquivos do projeto. |
| package.json | Registra informações do projeto e suas dependências. |
| package-lock.json | Registra as versões resolvidas das dependências i…
