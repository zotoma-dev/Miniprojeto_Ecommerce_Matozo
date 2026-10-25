import { Pedido, ItemPedido } from "./types";
import { buscarClientePorId } from "./clientes";
import { buscarProdutoPorId, atualizarProduto } from "./produtos";
import {
    listarCarrinho,
    calcularTotal,
    limparCarrinho
} from "./carrinho";

// Armazena os pedidos registrados durante a execução.
const pedidos: Pedido[] = [];

// Gera um identificador para o próximo pedido.
function gerarIdPedido(): number {
    if (pedidos.length === 0) {
        return 1;
    }

    return Math.max(...pedidos.map(pedido => pedido.id)) + 1;
}

// Finaliza a compra de um cliente.
export function finalizarPedido(clienteId: number): Pedido | undefined {
    // Verifica se o cliente está cadastrado.
    const cliente = buscarClientePorId(clienteId);

    if (!cliente) {
        console.log("Erro: cliente não encontrado.");
        return undefined;
    }

    // Verifica se o carrinho possui itens.
    const itensCarrinho = listarCarrinho();

    if (itensCarrinho.length === 0) {
        console.log("Erro: não é possível finalizar um carrinho vazio.");
        return undefined;
    }

    // Prepara os itens e valida o estoque sem alterá-lo.
    const itensPedido: ItemPedido[] = [];

    for (const item of itensCarrinho) {
        const produto = buscarProdutoPorId(item.produtoId);

        if (!produto) {
            console.log(
                `Erro: o produto ${item.produtoId} não foi encontrado.`
            );
            return undefined;
        }

        if (item.quantidade > produto.estoque) {
            console.log(
                `Erro: estoque insuficiente para "${produto.nome}".`
            );
            return undefined;
        }

        // Registra o preço atual do catálogo no momento da compra.
        itensPedido.push({
            produtoId: produto.id,
            nomeProduto: produto.nome,
            quantidade: item.quantidade,
            precoUnitario: produto.preco,
            subtotal: produto.preco * item.quantidade
        });
    }

    // Calcula o total com os preços registrados para o pedido.
    const total = itensPedido.reduce(
        (soma, item) => soma + item.subtotal,
        0
    );

    // Cria o pedido após validar todos os produtos.
    const novoPedido: Pedido = {
        id: gerarIdPedido(),
        clienteId: cliente.id,
        itens: itensPedido,
        total,
        data: new Date()
    };

    // Desconta o estoque depois de todas as validações.
    for (const item of itensPedido) {
        const produto = buscarProdutoPorId(item.produtoId);

        if (produto) {
            atualizarProduto(produto.id, {
                estoque: produto.estoque - item.quantidade
            });
        }
    }

    // Registra o pedido e limpa o carrinho.
    pedidos.push(novoPedido);
    limparCarrinho();

    console.log(`Pedido ${novoPedido.id} finalizado com sucesso.`);
    console.log(`Cliente: ${cliente.nome}`);
    console.log(`Total: R$ ${novoPedido.total.toFixed(2)}`);

    return {
        ...novoPedido,
        itens: novoPedido.itens.map(item => ({ ...item }))
    };
}

// Retorna todos os pedidos registrados.
export function listarPedidos(): Pedido[] {
    return pedidos.map(pedido => ({
        ...pedido,
        data: new Date(pedido.data),
        itens: pedido.itens.map(item => ({ ...item }))
    }));
}

// Retorna os pedidos de um cliente específico.
export function buscarPedidosPorCliente(
    clienteId: number
): Pedido[] {
    return listarPedidos().filter(
        pedido => pedido.clienteId === clienteId
    );
}

// Procura um pedido pelo identificador.
export function buscarPedidoPorId(
    id: number
): Pedido | undefined {
    const pedido = pedidos.find(pedido => pedido.id === id);

    if (!pedido) {
        return undefined;
    }

    return {
        ...pedido,
        data: new Date(pedido.data),
        itens: pedido.itens.map(item => ({ ...item }))
    };
}