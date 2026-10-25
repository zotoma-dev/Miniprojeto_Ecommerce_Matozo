# Sistema de E-Commerce em TypeScript

Projeto acadêmico de um sistema simples de e-commerce executado pelo terminal (CLI). O programa permite cadastrar e consultar produtos e clientes, administrar um carrinho de compras, finalizar pedidos e visualizar relatórios básicos.

O projeto foi desenvolvido com **TypeScript** e **Node.js**, utilizando funções e módulos separados para organizar as responsabilidades do sistema e facilitar a manutenção do código.

## 📌 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Requisitos](#-requisitos)
- [Como instalar e executar](#-como-instalar-e-executar)
- [Como utilizar o sistema](#-como-utilizar-o-sistema)
- [Como funciona uma compra](#-como-funciona-uma-compra)
- [Observações importantes](#-observações-importantes)
- [Objetivo do projeto](#-objetivo-do-projeto)

## ⚙️ Funcionalidades

### 📦 Produtos

- Listar os produtos cadastrados.
- Buscar um produto pelo ID.
- Cadastrar novos produtos.
- Editar nome, categoria, preço e estoque.
- Remover produtos.

### 👤 Clientes

- Listar os clientes cadastrados.
- Buscar um cliente pelo ID.
- Cadastrar novos clientes.
- Validar informações obrigatórias.
- Impedir o cadastro de e-mails duplicados.

### 🛒 Carrinho de compras

- Adicionar produtos ao carrinho.
- Consultar os itens adicionados.
- Alterar a quantidade de um produto.
- Remover produtos do carrinho.
- Limpar o carrinho.
- Calcular o subtotal dos itens e o valor total da compra.

### 📑 Pedidos

- Finalizar uma compra associando-a a um cliente cadastrado.
- Consultar os pedidos registrados.
- Buscar um pedido pelo ID.
- Consultar os pedidos de um cliente.
- Registrar itens, quantidades, valores e data do pedido.
- Verificar as condições necessárias para finalizar a compra, incluindo cliente, carrinho e estoque.

### 📊 Relatórios

- Exibir um resumo geral do sistema.
- Consultar informações de estoque.
- Consultar vendas por produto.
- Consultar vendas por cliente.

## 🛠️ Tecnologias utilizadas

- **[TypeScript](https://www.typescriptlang.org/)** — linguagem utilizada no desenvolvimento, com tipagem estática.
- **[Node.js](https://nodejs.org/)** — ambiente de execução do JavaScript.
- **[npm](https://www.npmjs.com/)** — ferramenta utilizada para instalar e gerenciar as dependências do projeto.
- **Readline** — módulo nativo do Node.js utilizado para receber as informações digitadas pelo usuário no terminal.
- **[Git](https://git-scm.com/)** — sistema de controle de versão.
- **[GitHub](https://github.com/)** — plataforma utilizada para hospedar o código-fonte do projeto.

A aplicação utiliza uma interface de linha de comando (CLI), sem necessidade de interface gráfica ou banco de dados.

## 📁 Estrutura do projeto

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
├── dist/                 # Arquivos JavaScript gerados na compilação
├── node_modules/         # Dependências instaladas pelo npm
├── .gitignore            # Arquivos e pastas ignorados pelo Git
├── package.json          # Configurações, dependências e scripts
├── package-lock.json     # Registro das versões resolvidas das dependências
├── tsconfig.json         # Configurações do compilador TypeScript
└── README.md             # Documentação do projeto
```

### 📄 Responsabilidade de cada arquivo

| Arquivo | Responsabilidade |
|---|---|
| `src/main.ts` | Contém o menu principal, os submenus e a interação com o usuário pelo terminal. Chama as funções dos demais módulos. |
| `src/types.ts` | Define os tipos `Produto`, `Cliente`, `ItemCarrinho`, `ItemPedido` e `Pedido`, organizando e tipando os dados utilizados pelo sistema. |
| `src/produtos.ts` | Gerencia os produtos, incluindo listagem, busca, cadastro, edição, remoção e controle do estoque. |
| `src/clientes.ts` | Gerencia os clientes, incluindo listagem, busca, cadastro e validações de nome e e-mail. |
| `src/carrinho.ts` | Controla os itens do carrinho, as quantidades, a remoção de itens, os subtotais, o total e a limpeza do carrinho. |
| `src/pedidos.ts` | Processa as compras, registra pedidos e permite consultar o histórico. Também verifica as condições necessárias para finalizar uma compra. |
| `src/relatorios.ts` | Consolida e apresenta informações gerais, dados de estoque e resumos de vendas por produto e por cliente. |
| `tsconfig.json` | Define as configurações utilizadas pelo compilador TypeScript. |
| `package.json` | Registra informações do projeto, dependências e scripts disponíveis. |
| `package-lock.json` | Registra as versões resolvidas das dependências instaladas pelo npm. |
| `.gitignore` | Define os arquivos e diretórios que devem ser ignorados pelo Git. |
| `dist/` | Armazena os arquivos JavaScript gerados a partir dos arquivos TypeScript. |
| `node_modules/` | Armazena os pacotes instalados pelo npm. Seu conteúdo não precisa ser editado manualmente. |

## 💻 Requisitos

Antes de executar o projeto, é necessário ter os seguintes programas instalados:

1. **Node.js:** recomenda-se uma versão LTS compatível com as dependências do projeto. Disponível em [nodejs.org](https://nodejs.org/pt-br/download/).
2. **npm:** normalmente instalado junto com o Node.js.
3. **Visual Studio Code:** editor recomendado para visualizar e editar os arquivos do projeto. Disponível em [code.visualstudio.com](https://code.visualstudio.com/).
4. **Git:** necessário para clonar o repositório. Disponível em [git-scm.com](https://git-scm.com/).

### Verificando a instalação

Abra o terminal e execute os comandos:

```bash
node -v
npm -v
git --version
```

Cada comando deve apresentar a versão instalada do respectivo programa.

Caso algum comando não seja reconhecido, verifique a instalação e abra um novo terminal.

## 🚀 Como instalar e executar

### 1. Obter o projeto

Clone o repositório do GitHub:

```bash
git clone https://github.com/zotoma-dev/Miniprojeto_Ecommerce_Matozo.git
```

Entre na pasta do projeto:

```bash
cd Miniprojeto_Ecommerce_Matozo
```

Também é possível baixar o projeto pelo GitHub e abrir a pasta no Visual Studio Code.

**Importante:** execute os comandos seguintes na pasta principal do projeto, onde estão localizados os arquivos `package.json` e `tsconfig.json`, e não dentro da pasta `src`.

### 2. Instalar as dependências

Execute:

```bash
npm install
```

Esse comando instala as dependências declaradas no `package.json`, incluindo as ferramentas necessárias para compilar e executar o projeto, conforme sua configuração.

### 3. Compilar o projeto

Execute:

```bash
npx tsc
```

O compilador TypeScript verifica os arquivos `.ts` e gera os arquivos JavaScript na pasta `dist/`, conforme as configurações definidas em `tsconfig.json`.

Se forem apresentados erros durante a compilação, corrija-os antes de executar a aplicação.

### 4. Iniciar o sistema

Após uma compilação bem-sucedida, execute:

```bash
node dist/main.js
```

O menu principal será exibido no terminal, permitindo acessar as funcionalidades do sistema.

### 5. Executar novamente após modificar o código

Sempre que modificar os arquivos TypeScript localizados na pasta `src/`, compile novamente o projeto antes de executá-lo:

```bash
npx tsc
node dist/main.js
```

**Observação:** os comandos acima utilizam diretamente o compilador TypeScript e o arquivo JavaScript gerado. Se o `package.json` possuir scripts específicos para compilação e inicialização, eles também poderão ser utilizados.

## 🖥️ Como utilizar o sistema

Ao iniciar o programa, será exibido um menu interativo no terminal. Para acessar uma funcionalidade, digite o número correspondente e pressione **Enter**.

Exemplo do menu principal:

```text
===== SISTEMA DE E-COMMERCE =====
1 - Produtos
2 - Clientes
3 - Carrinho
4 - Pedidos
5 - Relatórios
0 - Sair
```

### Navegação pelo sistema

- **Produtos:** permite listar, buscar, cadastrar, editar e remover produtos.
- **Clientes:** permite consultar e cadastrar clientes.
- **Carrinho:** permite adicionar produtos, alterar quantidades, remover itens e consultar valores.
- **Pedidos:** permite finalizar compras e consultar os pedidos registrados.
- **Relatórios:** permite consultar informações gerais, estoque e vendas.
- **Sair:** encerra a execução do programa.

Para retornar de um submenu ao menu principal, selecione a opção `0` no submenu correspondente. A opção `0` do menu principal encerra o programa.

As opções específicas podem variar conforme a implementação de cada módulo.

## 🛍️ Como funciona uma compra

O fluxo básico de uma compra é realizado pelas seguintes etapas:

1. Acesse **Produtos** para consultar os produtos disponíveis.
2. Acesse **Carrinho** e adicione os produtos desejados, informando o ID e a quantidade.
3. Consulte o carrinho para verificar os itens, as quantidades e o valor total.
4. Acesse **Pedidos** e selecione a opção de finalizar a compra.
5. Informe o ID do cliente cadastrado que está realizando a compra.
6. Após a finalização, consulte o pedido ou os relatórios para verificar os resultados.

O sistema foi desenvolvido para funcionar como uma ferramenta operada por um atendente. Por isso, o carrinho é montado durante o atendimento e o cliente é associado ao pedido no momento da finalização da compra.

## ⚠️ Observações importantes

- **Armazenamento em memória:** os produtos, clientes, itens do carrinho e pedidos são armazenados em estruturas de dados durante a execução. Os novos registros e pedidos não são persistidos em um banco de dados ou arquivo. Portanto, os dados criados durante a execução podem ser perdidos quando o programa for encerrado.
- **Carrinho compartilhado:** o carrinho é utilizado durante a execução do sistema e não representa um carrinho individual permanentemente associado a cada cliente. O cliente é vinculado ao pedido no momento da finalização.
- **Pasta `src/`:** contém os arquivos TypeScript que devem ser editados durante o desenvolvimento.
- **Pasta `dist/`:** contém o código JavaScript gerado pelo compilador. Para atualizar esses arquivos, execute `npx tsc`.
- **Pasta `node_modules/`:** contém as dependências instaladas pelo npm e não precisa ser editada manualmente.
- **Banco de dados:** o projeto não exige banco de dados, pois utiliza armazenamento em memória.
- **Testes:** a validação das funcionalidades pode ser realizada executando o sistema e percorrendo as opções disponíveis no menu. A existência de testes automatizados depende dos arquivos de teste presentes no projeto.

## 🎯 Objetivo do projeto

Este projeto tem como objetivo aplicar conceitos fundamentais de programação com TypeScript e Node.js, incluindo:

- Tipagem estática e definição de tipos.
- Declaração e utilização de funções.
- Organização do código em módulos.
- Manipulação de arrays e objetos.
- Estruturas condicionais e de repetição.
- Validação de dados de entrada.
- Controle de estoque e cálculo de valores.
- Processamento de pedidos e geração de relatórios.
- Interação com o usuário por meio do terminal.
- Gerenciamento de dependências com npm.
- Controle de versão utilizando Git e GitHub.

A separação das funcionalidades em arquivos específicos contribui para uma melhor organização do código, facilita a manutenção e permite compreender como diferentes módulos podem trabalhar em conjunto em uma aplicação.

---

**Projeto acadêmico desenvolvido para praticar TypeScript, Node.js e os fundamentos da construção de um sistema de e-commerce via terminal.**
