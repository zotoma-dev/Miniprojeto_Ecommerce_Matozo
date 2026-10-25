# Sistema de E-Commerce em TypeScript

Projeto acadêmico de um sistema simples de e-commerce executado via terminal. O programa permite cadastrar e consultar produtos e clientes, administrar um carrinho de compras, finalizar pedidos e visualizar relatórios básicos.

O projeto foi desenvolvido com **TypeScript** e **Node.js**, utilizando funções e módulos separados para organizar as responsabilidades do sistema.

---

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Requisitos](#requisitos)
- [Como Instalar e Executar](#como-instalar-e-executar)
- [Como Utilizar o Sistema](#como-utilizar-o-sistema)
- [Como Funciona uma Compra](#como-funciona-uma-compra)
- [Observações Importantes](#observações-importantes)

---

## Funcionalidades

### Produtos
- Listar os produtos cadastrados.
- Buscar um produto pelo ID.
- Cadastrar novos produtos.
- Editar nome, categoria, preço ou estoque.
- Remover produtos do sistema.

### Clientes
- Listar os clientes cadastrados.
- Buscar um cliente pelo ID.
- Cadastrar um cliente.
- Validar informações obrigatórias e impedir e-mails duplicados.

### Carrinho de Compras
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
- Consultar os pedidos associados a um cliente.
- Registrar itens, quantidades, valores e data do pedido.

### Relatórios
- Exibir um resumo geral do sistema.
- Consultar informações e status de estoque.
- Consultar vendas por produto.
- Consultar vendas por cliente.

---

## Tecnologias Utilizadas

- **TypeScript** — Linguagem principal para desenvolvimento com tipagem estática.
- **Node.js** — Ambiente de execução do JavaScript.
- **npm** — Gerenciador de pacotes e dependências.
- **readline** — Módulo nativo do Node.js para captura de entradas do usuário no terminal.

> **Nota:** Não é necessária interface gráfica. A interação ocorre 100% via terminal CLI.

---

## Estrutura do Projeto

```text
Miniprojeto_Ecommerce_Matozo/
├── src/
│   ├── carrinho.ts
│   ├── clientes.ts
│   ├── main.ts
│   ├── pedidos.ts
│   ├── produtos.ts
│   ├── relatorios.ts
│   └── types.ts
├── dist/                # Arquivos JavaScript gerados na compilação
├── node_modules/        # Dependências instaladas pelo npm
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
O que cada arquivo faz?ArquivoResponsabilidadesrc/main.tsMenu principal, submenus e interface via terminal com o usuário.src/types.tsInterfaces e tipos (Produto, Cliente, ItemCarrinho, ItemPedido, Pedido).src/produtos.tsCRUD de produtos e controle de estoque.src/clientes.tsGerenciamento e validações de clientes (nome, e-mail único).src/carrinho.tsControle do carrinho, cálculo de subtotais e limpeza.src/pedidos.tsProcessamento e histórico de vendas/pedidos.src/relatorios.tsConsolidação de dados de estoque e resumos de vendas.tsconfig.jsonConfigurações do compilador TypeScript.package.jsonMetadados do projeto e scripts de execução.package-lock.jsonMapeamento exato das dependências instaladas.RequisitosNode.js (versão 16 ou superior)npm (geralmente instalado junto com o Node.js)Como Instalar e ExecutarClone o repositório:Bashgit clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
cd Miniprojeto_Ecommerce_Matozo
Instale as dependências:Bashnpm install
Compile o código TypeScript:Bashnpm run build
Execute a aplicação:Bashnpm start
Dica: Se possuir o ts-node instalado globalmente ou configurado nos scripts, você também pode rodar diretamente com npx ts-node src/main.ts.Como Utilizar o SistemaAo executar o sistema, um menu interativo será exibido no terminal. Digite o número correspondente à opção desejada para navegar entre as seções:Plaintext=== SISTEMA DE E-COMMERCE ===
1. Gerenciar Produtos
2. Gerenciar Clientes
3. Gerenciar Carrinho
4. Processar Pedidos
5. Visualizar Relatórios
0. Sair
