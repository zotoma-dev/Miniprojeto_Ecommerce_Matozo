import * as readline from "readline";
import { stdin, stdout } from "process";

import {
    listarProdutos,
    buscarProdutoPorId,
    cadastrarProduto,
    atualizarProduto,
    removerProduto
} from "./produtos";

import {
    listarClientes,
    buscarClientePorId,
    cadastrarCliente
} from "./clientes";

import {
    adicionarAoCarrinho,
    removerDoCarrinho,
    alterarQuantidade,
    listarCarrinho,
    calcularTotal,
    limparCarrinho
} from "./carrinho";

import {
    finalizarPedido,
    listarPedidos,
    buscarPedidoPorId,
    buscarPedidosPorCliente
} from "./pedidos";

import {
    exibirResumoGeral,
    exibirRelatorioEstoque,
    exibirRelatorioVendasPorProduto,
    exibirRelatorioVendasPorCliente
} from "./relatorios";

// Permite receber informações pelo terminal.
const terminal = readline.createInterface({
    input: stdin,
    output: stdout
});

// Faz perguntas e recebe as respostas.
function perguntar(mensagem: string): Promise<string> {
    return new Promise(resolve => {
        terminal.question(mensagem, resolve);
    });
}

// Lê um número, aceitando vírgula ou ponto decimal.
async function lerNumero(mensagem: string): Promise<number> {
    while (true) {
        const resposta = await perguntar(mensagem);
        const numero = Number(resposta.trim().replace(",", "."));

        if (resposta.trim() !== "" && Number.isFinite(numero)) {
            return numero;
        }

        console.log("Digite um número válido.");
    }
}

// Lê um número inteiro.
async function lerInteiro(mensagem: string): Promise<number> {
    while (true) {
        const numero = await lerNumero(mensagem);

        if (Number.isInteger(numero)) {
            return numero;
        }

        console.log("Digite um número inteiro.");
    }
}

// Formata valores em reais.
function moeda(valor: number): string {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// ========================================
// PRODUTOS
// ========================================

function mostrarProdutos(): void {
    const produtos = listarProdutos();

    console.log("\n--- LISTA DE PRODUTOS ---");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    for (const produto of produtos) {
        console.log("------------------------------");
        console.log(`ID: ${produto.id}`);
        console.log(`Nome: ${produto.nome}`);
        console.log(`Categoria: ${produto.categoria}`);
        console.log(`Preço: ${moeda(produto.preco)}`);
        console.log(`Estoque: ${produto.estoque}`);
    }

    console.log("------------------------------");
}

async function menuProdutos(): Promise<void> {
    let opcao = "";

    while (opcao !== "0") {
        console.log("\n--- MENU DE PRODUTOS ---");
        console.log("1 - Listar produtos");
        console.log("2 - Buscar produto por ID");
        console.log("3 - Cadastrar produto");
        console.log("4 - Editar produto");
        console.log("5 - Remover produto");
        console.log("0 - Voltar");

        opcao = (await perguntar("Escolha: ")).trim();

        switch (opcao) {
            case "1":
                mostrarProdutos();
                break;

            case "2": {
                const id = await lerInteiro("ID do produto: ");
                const produto = buscarProdutoPorId(id);

                if (produto) {
                    console.log("\nProduto encontrado!");
                    console.log(`Nome: ${produto.nome}`);
                    console.log(`Categoria: ${produto.categoria}`);
                    console.log(`Preço: ${moeda(produto.preco)}`);
                    console.log(`Estoque: ${produto.estoque}`);
                } else {
                    console.log("Produto não encontrado.");
                }

                break;
            }

            case "3": {
                console.log("\n--- CADASTRAR PRODUTO ---");

                const nome = await perguntar("Nome: ");
                const categoria = await perguntar("Categoria: ");
                const preco = await lerNumero("Preço: R$ ");
                const estoque = await lerInteiro("Estoque: ");

                if (
                    nome.trim() === "" ||
                    categoria.trim() === "" ||
                    preco < 0 ||
                    estoque < 0
                ) {
                    console.log("Dados inválidos.");
                    break;
                }

                try {
                    cadastrarProduto({
                        nome: nome.trim(),
                        categoria: categoria.trim(),
                        preco,
                        estoque
                    });

                    console.log("\nProduto cadastrado com sucesso!");
                } catch (erro) {
                    console.log(
                        erro instanceof Error
                            ? erro.message
                            : "Erro ao cadastrar produto."
                    );
                }

                break;
            }

            case "4": {
                mostrarProdutos();

                const id = await lerInteiro(
                    "ID do produto que deseja editar: "
                );

                const produto = buscarProdutoPorId(id);

                if (!produto) {
                    console.log("Produto não encontrado.");
                    break;
                }

                console.log(`\nEditando produto: ${produto.nome}`);
                console.log("1 - Alterar nome");
                console.log("2 - Alterar categoria");
                console.log("3 - Alterar preço");
                console.log("4 - Alterar estoque");
                console.log("0 - Cancelar");

                const campo = (await perguntar("Escolha: ")).trim();

                try {
                    switch (campo) {
                        case "1": {
                            const nome = await perguntar("Novo nome: ");

                            if (nome.trim() === "") {
                                console.log("O nome não pode ficar vazio.");
                                break;
                            }

                            atualizarProduto(id, {
                                nome: nome.trim()
                            });

                            console.log("Nome atualizado!");
                            break;
                        }

                        case "2": {
                            const categoria = await perguntar(
                                "Nova categoria: "
                            );

                            if (categoria.trim() === "") {
                                console.log(
                                    "A categoria não pode ficar vazia."
                                );
                                break;
                            }

                            atualizarProduto(id, {
                                categoria: categoria.trim()
                            });

                            console.log("Categoria atualizada!");
                            break;
                        }

                        case "3": {
                            const preco = await lerNumero(
                                "Novo preço: R$ "
                            );

                            if (preco < 0) {
                                console.log(
                                    "O preço não pode ser negativo."
                                );
                                break;
                            }

                            atualizarProduto(id, { preco });

                            console.log("Preço atualizado!");
                            break;
                        }

                        case "4": {
                            const estoque = await lerInteiro(
                                "Novo estoque: "
                            );

                            if (estoque < 0) {
                                console.log(
                                    "O estoque não pode ser negativo."
                                );
                                break;
                            }

                            atualizarProduto(id, { estoque });

                            console.log("Estoque atualizado!");
                            break;
                        }

                        case "0":
                            console.log("Edição cancelada.");
                            break;

                        default:
                            console.log("Opção inválida.");
                    }
                } catch (erro) {
                    console.log(
                        erro instanceof Error
                            ? erro.message
                            : "Erro ao editar produto."
                    );
                }

                break;
            }

            case "5": {
                mostrarProdutos();

                const id = await lerInteiro(
                    "ID do produto que deseja remover: "
                );

                const produto = buscarProdutoPorId(id);

                if (!produto) {
                    console.log("Produto não encontrado.");
                    break;
                }

                const resposta = await perguntar(
                    `Deseja remover "${produto.nome}"? (s/n): `
                );

                if (resposta.trim().toLowerCase() !== "s") {
                    console.log("Operação cancelada.");
                    break;
                }

                // Evita remover um produto que está no carrinho.
                const estaNoCarrinho = listarCarrinho().some(
                    item => item.produtoId === id
                );

                if (estaNoCarrinho) {
                    console.log(
                        "Remova o produto do carrinho antes de excluí-lo."
                    );
                    break;
                }

                try {
                    removerProduto(id);
                    console.log("Produto removido com sucesso!");
                } catch (erro) {
                    console.log(
                        erro instanceof Error
                            ? erro.message
                            : "Erro ao remover produto."
                    );
                }

                break;
            }

            case "0":
                break;

            default:
                console.log("Opção inválida.");
        }

        // Espaço entre a operação e a próxima exibição do menu.
        console.log("");
    }
}

// ========================================
// CLIENTES
// ========================================

function mostrarClientes(): void {
    const clientes = listarClientes();

    console.log("\n--- LISTA DE CLIENTES ---");

    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
        return;
    }

    for (const cliente of clientes) {
        console.log("------------------------------");
        console.log(`ID: ${cliente.id}`);
        console.log(`Nome: ${cliente.nome}`);
        console.log(`E-mail: ${cliente.email}`);
    }

    console.log("------------------------------");
}

async function menuClientes(): Promise<void> {
    let opcao = "";

    while (opcao !== "0") {
        console.log("\n--- MENU DE CLIENTES ---");
        console.log("1 - Listar clientes");
        console.log("2 - Buscar cliente por ID");
        console.log("3 - Cadastrar cliente");
        console.log("0 - Voltar");

        opcao = (await perguntar("Escolha: ")).trim();

        switch (opcao) {
            case "1":
                mostrarClientes();
                break;

            case "2": {
                const id = await lerInteiro("ID do cliente: ");
                const cliente = buscarClientePorId(id);

                if (cliente) {
                    console.log("\nCliente encontrado!");
                    console.log(`Nome: ${cliente.nome}`);
                    console.log(`E-mail: ${cliente.email}`);
                } else {
                    console.log("Cliente não encontrado.");
                }

                break;
            }

            case "3": {
                console.log("\n--- CADASTRAR CLIENTE ---");

                const nome = await perguntar("Nome do cliente: ");
                const email = await perguntar("E-mail do cliente: ");

                try {
                    const cliente = cadastrarCliente({
                        nome,
                        email
                    });

                    console.log("\nCliente cadastrado com sucesso!");
                    console.log(`ID: ${cliente.id}`);
                    console.log(`Nome: ${cliente.nome}`);
                    console.log(`E-mail: ${cliente.email}`);
                } catch (erro) {
                    console.log(
                        erro instanceof Error
                            ? erro.message
                            : "Erro ao cadastrar cliente."
                    );
                }

                break;
            }

            case "0":
                break;

            default:
                console.log("Opção inválida.");
        }

        console.log("");
    }
}

// ========================================
// CARRINHO
// ========================================

function mostrarCarrinho(): void {
    const itens = listarCarrinho();

    console.log("\n--- CARRINHO DE COMPRAS ---");

    if (itens.length === 0) {
        console.log("Carrinho vazio.");
        return;
    }

    for (const item of itens) {
        console.log("------------------------------");
        console.log(`Produto: ${item.nomeProduto}`);
        console.log(`Quantidade: ${item.quantidade}`);
        console.log(`Preço unitário: ${moeda(item.precoUnitario)}`);
        console.log(`Subtotal: ${moeda(item.subtotal)}`);
    }

    console.log("------------------------------");
    console.log(`TOTAL: ${moeda(calcularTotal())}`);
}

async function menuCarrinho(): Promise<void> {
    let opcao = "";

    while (opcao !== "0") {
        console.log("\n--- MENU DO CARRINHO ---");
        console.log("1 - Ver carrinho");
        console.log("2 - Adicionar produto");
        console.log("3 - Alterar quantidade");
        console.log("4 - Remover produto");
        console.log("5 - Limpar carrinho");
        console.log("0 - Voltar");

        opcao = (await perguntar("Escolha: ")).trim();

        switch (opcao) {
            case "1":
                mostrarCarrinho();
                break;

            case "2": {
                mostrarProdutos();

                const id = await lerInteiro("ID do produto: ");
                const quantidade = await lerInteiro("Quantidade: ");

                adicionarAoCarrinho(id, quantidade);
                break;
            }

            case "3": {
                mostrarCarrinho();

                if (listarCarrinho().length === 0) {
                    break;
                }

                const id = await lerInteiro("ID do produto: ");
                const quantidade = await lerInteiro(
                    "Nova quantidade: "
                );

                const alterado = alterarQuantidade(id, quantidade);

                if (alterado) {
                    console.log("Quantidade atualizada!");
                } else {
                    console.log(
                        "Não foi possível alterar a quantidade."
                    );
                }

                break;
            }

            case "4": {
                mostrarCarrinho();

                if (listarCarrinho().length === 0) {
                    break;
                }

                const id = await lerInteiro(
                    "ID do produto que deseja remover: "
                );

                const removido = removerDoCarrinho(id);

                if (removido) {
                    console.log("Produto removido do carrinho!");
                } else {
                    console.log(
                        "Produto não encontrado no carrinho."
                    );
                }

                break;
            }

            case "5": {
                if (listarCarrinho().length === 0) {
                    console.log("O carrinho já está vazio.");
                    break;
                }

                const resposta = await perguntar(
                    "Deseja limpar o carrinho? (s/n): "
                );

                if (resposta.trim().toLowerCase() === "s") {
                    limparCarrinho();
                } else {
                    console.log("Operação cancelada.");
                }

                break;
            }

            case "0":
                break;

            default:
                console.log("Opção inválida.");
        }

        console.log("");
    }
}

// ========================================
// PEDIDOS
// ========================================

async function menuPedidos(): Promise<void> {
    let opcao = "";

    while (opcao !== "0") {
        console.log("\n--- MENU DE PEDIDOS ---");
        console.log("1 - Finalizar compra");
        console.log("2 - Listar pedidos");
        console.log("3 - Buscar pedido por ID");
        console.log("4 - Ver pedidos de um cliente");
        console.log("0 - Voltar");

        opcao = (await perguntar("Escolha: ")).trim();

        switch (opcao) {
            case "1": {
                if (listarCarrinho().length === 0) {
                    console.log(
                        "Adicione produtos antes de finalizar a compra."
                    );
                    break;
                }

                mostrarCarrinho();
                mostrarClientes();

                const clienteId = await lerInteiro(
                    "ID do cliente da compra: "
                );

                try {
                    const pedido = finalizarPedido(clienteId);

                    if (pedido) {
                        console.log("\nCompra finalizada com sucesso!");
                        console.log(`Pedido: ${pedido.id}`);
                        console.log(`Total: ${moeda(pedido.total)}`);
                    } else {
                        console.log(
                            "Não foi possível finalizar a compra."
                        );
                    }
                } catch (erro) {
                    console.log(
                        erro instanceof Error
                            ? erro.message
                            : "Erro ao finalizar a compra."
                    );
                }

                break;
            }

            case "2": {
                const pedidos = listarPedidos();

                console.log("\n--- PEDIDOS REGISTRADOS ---");

                if (pedidos.length === 0) {
                    console.log("Nenhum pedido registrado.");
                    break;
                }

                for (const pedido of pedidos) {
                    console.log("------------------------------");
                    console.log(`Pedido: ${pedido.id}`);
                    console.log(`Cliente: ${pedido.clienteId}`);
                    console.log(
                        `Data: ${pedido.data.toLocaleString("pt-BR")}`
                    );
                    console.log(`Total: ${moeda(pedido.total)}`);
                }

                console.log("------------------------------");
                break;
            }

            case "3": {
                const id = await lerInteiro("ID do pedido: ");
                const pedido = buscarPedidoPorId(id);

                if (!pedido) {
                    console.log("Pedido não encontrado.");
                    break;
                }

                console.log("\n--- DETALHES DO PEDIDO ---");
                console.log(`Pedido: ${pedido.id}`);
                console.log(`Cliente: ${pedido.clienteId}`);
                console.log(
                    `Data: ${pedido.data.toLocaleString("pt-BR")}`
                );

                for (const item of pedido.itens) {
                    console.log(
                        `${item.nomeProduto} - ` +
                        `Quantidade: ${item.quantidade} - ` +
                        `Subtotal: ${moeda(item.subtotal)}`
                    );
                }

                console.log(`TOTAL: ${moeda(pedido.total)}`);
                break;
            }

            case "4": {
                const clienteId = await lerInteiro("ID do cliente: ");
                const cliente = buscarClientePorId(clienteId);

                if (!cliente) {
                    console.log("Cliente não encontrado.");
                    break;
                }

                const pedidos = buscarPedidosPorCliente(clienteId);

                console.log(
                    `\n--- PEDIDOS DE ${cliente.nome.toUpperCase()} ---`
                );

                if (pedidos.length === 0) {
                    console.log("Esse cliente não possui pedidos.");
                    break;
                }

                for (const pedido of pedidos) {
                    console.log(
                        `Pedido ${pedido.id} - Total: ${moeda(pedido.total)}`
                    );
                }

                break;
            }

            case "0":
                break;

            default:
                console.log("Opção inválida.");
        }

        console.log("");
    }
}

// ========================================
// RELATÓRIOS
// ========================================

async function menuRelatorios(): Promise<void> {
    let opcao = "";

    while (opcao !== "0") {
        console.log("\n--- MENU DE RELATÓRIOS ---");
        console.log("1 - Resumo geral");
        console.log("2 - Estoque");
        console.log("3 - Vendas por produto");
        console.log("4 - Vendas por cliente");
        console.log("0 - Voltar");

        opcao = (await perguntar("Escolha: ")).trim();

        switch (opcao) {
            case "1":
                exibirResumoGeral();
                break;

            case "2":
                exibirRelatorioEstoque();
                break;

            case "3":
                exibirRelatorioVendasPorProduto();
                break;

            case "4":
                exibirRelatorioVendasPorCliente();
                break;

            case "0":
                break;

            default:
                console.log("Opção inválida.");
        }

        console.log("");
    }
}

// ========================================
// MENU PRINCIPAL
// ========================================

async function menuPrincipal(): Promise<void> {
    let opcao = "";

    while (opcao !== "0") {
        console.log("\n===== SISTEMA DE E-COMMERCE =====");
        console.log("1 - Produtos");
        console.log("2 - Clientes");
        console.log("3 - Carrinho");
        console.log("4 - Pedidos");
        console.log("5 - Relatórios");
        console.log("0 - Sair");

        opcao = (await perguntar("Escolha uma opção: ")).trim();

        switch (opcao) {
            case "1":
                await menuProdutos();
                break;

            case "2":
                await menuClientes();
                break;

            case "3":
                await menuCarrinho();
                break;

            case "4":
                await menuPedidos();
                break;

            case "5":
                await menuRelatorios();
                break;

            case "0":
                console.log("\nSistema encerrado.");
                break;

            default:
                console.log("Opção inválida.");
        }

        console.log("");
    }
}

// Inicia o programa e fecha o terminal ao sair.
async function iniciarSistema(): Promise<void> {
    try {
        await menuPrincipal();
    } catch (erro) {
        console.log("Ocorreu um erro inesperado.");

        if (erro instanceof Error) {
            console.log(erro.message);
        }
    } finally {
        terminal.close();
    }
}

iniciarSistema();