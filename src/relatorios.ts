import { listarProdutos } from "./produtos";
import { listarClientes } from "./clientes";
import { listarPedidos } from "./pedidos";

// Formata valores como moeda brasileira.
function formatarMoeda(valor: number): string {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Gera um resumo geral da loja.
export function gerarResumoGeral() {
    const produtos = listarProdutos();
    const clientes = listarClientes();
    const pedidos = listarPedidos();

    const totalVendas = pedidos.reduce(
        (total, pedido) => total + pedido.total,
        0
    );

    const unidadesVendidas = pedidos.reduce(
        (total, pedido) =>
            total +
            pedido.itens.reduce(
                (soma, item) => soma + item.quantidade,
                0
            ),
        0
    );

    return {
        totalProdutos: produtos.length,
        totalClientes: clientes.length,
        totalPedidos: pedidos.length,
        unidadesVendidas,
        totalVendas
    };
}

// Gera um relatório com os produtos e seus estoques.
export function gerarRelatorioEstoque() {
    return listarProdutos().map(produto => ({
        id: produto.id,
        nome: produto.nome,
        categoria: produto.categoria,
        preco: produto.preco,
        estoque: produto.estoque,
        valorEmEstoque: produto.preco * produto.estoque
    }));
}

// Consolida as vendas de cada produto.
export function gerarRelatorioVendasPorProduto() {
    const produtos = listarProdutos();
    const pedidos = listarPedidos();

    return produtos.map(produto => {
        let quantidadeVendida = 0;
        let faturamento = 0;

        for (const pedido of pedidos) {
            for (const item of pedido.itens) {
                if (item.produtoId === produto.id) {
                    quantidadeVendida += item.quantidade;
                    faturamento += item.subtotal;
                }
            }
        }

        return {
            produtoId: produto.id,
            nomeProduto: produto.nome,
            quantidadeVendida,
            faturamento
        };
    });
}

// Consolida a quantidade de pedidos e o total gasto por cliente.
export function gerarRelatorioVendasPorCliente() {
    const clientes = listarClientes();
    const pedidos = listarPedidos();

    return clientes.map(cliente => {
        const pedidosCliente = pedidos.filter(
            pedido => pedido.clienteId === cliente.id
        );

        const totalGasto = pedidosCliente.reduce(
            (total, pedido) => total + pedido.total,
            0
        );

        return {
            clienteId: cliente.id,
            nomeCliente: cliente.nome,
            quantidadePedidos: pedidosCliente.length,
            totalGasto
        };
    });
}

// Exibe o resumo geral no terminal.
export function exibirResumoGeral(): void {
    const resumo = gerarResumoGeral();

    console.log("\n========== RESUMO GERAL ==========");
    console.log(`Produtos cadastrados: ${resumo.totalProdutos}`);
    console.log(`Clientes cadastrados: ${resumo.totalClientes}`);
    console.log(`Pedidos realizados: ${resumo.totalPedidos}`);
    console.log(`Unidades vendidas: ${resumo.unidadesVendidas}`);
    console.log(`Faturamento total: ${formatarMoeda(resumo.totalVendas)}`);
    console.log("==================================\n");
}

// Exibe o relatório de estoque.
export function exibirRelatorioEstoque(): void {
    const produtos = gerarRelatorioEstoque();

    console.log("\n========== RELATÓRIO DE ESTOQUE ==========");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
    }

    for (const produto of produtos) {
        console.log(`ID: ${produto.id}`);
        console.log(`Produto: ${produto.nome}`);
        console.log(`Categoria: ${produto.categoria}`);
        console.log(`Preço unitário: ${formatarMoeda(produto.preco)}`);
        console.log(`Estoque disponível: ${produto.estoque}`);
        console.log(
            `Valor total em estoque: ${formatarMoeda(produto.valorEmEstoque)}`
        );
        console.log("------------------------------------------");
    }

    console.log("==========================================\n");
}

// Exibe o relatório de vendas por produto.
export function exibirRelatorioVendasPorProduto(): void {
    const vendas = gerarRelatorioVendasPorProduto();

    console.log("\n========== VENDAS POR PRODUTO ==========");

    if (vendas.length === 0) {
        console.log("Nenhum produto cadastrado.");
    }

    for (const venda of vendas) {
        console.log(`Produto: ${venda.nomeProduto}`);
        console.log(`Unidades vendidas: ${venda.quantidadeVendida}`);
        console.log(`Faturamento: ${formatarMoeda(venda.faturamento)}`);
        console.log("---------------------------------------");
    }

    console.log("=======================================\n");
}

// Exibe o relatório de vendas por cliente.
export function exibirRelatorioVendasPorCliente(): void {
    const vendas = gerarRelatorioVendasPorCliente();

    console.log("\n========== VENDAS POR CLIENTE ==========");

    if (vendas.length === 0) {
        console.log("Nenhum cliente cadastrado.");
    }

    for (const venda of vendas) {
        console.log(`Cliente: ${venda.nomeCliente}`);
        console.log(`Pedidos realizados: ${venda.quantidadePedidos}`);
        console.log(`Total gasto: ${formatarMoeda(venda.totalGasto)}`);
        console.log("----------------------------------------");
    }

    console.log("========================================\n");
}