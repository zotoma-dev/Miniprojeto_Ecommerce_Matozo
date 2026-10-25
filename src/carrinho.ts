import { Produto, ItemCarrinho } from "./types";
import { buscarProdutoPorId } from "./produtos";

// Armazena os itens do carrinho em memória.
let carrinho: ItemCarrinho[] = [];

function obterItemComPrecoAtual(item: ItemCarrinho): ItemCarrinho {
    const produto = buscarProdutoPorId(item.produtoId);

    if (!produto) {
        return { ...item };
    }

    return {
        ...item,
        precoUnitario: produto.preco,
        subtotal: produto.preco * item.quantidade
    };
}

// Adiciona um produto ao carrinho.
export function adicionarAoCarrinho(
    produtoId: number,
    quantidade: number
): boolean {
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        console.log("Erro: a quantidade deve ser um número inteiro positivo.");
        return false;
    }

    const produto: Produto | undefined = buscarProdutoPorId(produtoId);

    if (!produto) {
        console.log("Erro: produto não encontrado.");
        return false;
    }

    const itemExistente = carrinho.find(
        item => item.produtoId === produtoId
    );

    const quantidadeAtual = itemExistente
        ? itemExistente.quantidade
        : 0;

    const novaQuantidade = quantidadeAtual + quantidade;

    if (novaQuantidade > produto.estoque) {
        console.log(
            `Erro: estoque insuficiente. Estoque disponível: ${produto.estoque}.`
        );
        return false;
    }

    if (itemExistente) {
        itemExistente.quantidade = novaQuantidade;
        itemExistente.subtotal =
            itemExistente.precoUnitario * itemExistente.quantidade;
    } else {
        carrinho.push({
            produtoId: produto.id,
            nomeProduto: produto.nome,
            quantidade,
            precoUnitario: produto.preco,
            subtotal: produto.preco * quantidade
        });
    }

    console.log(`Produto "${produto.nome}" adicionado ao carrinho.`);
    return true;
}

// Remove um produto do carrinho.
export function removerDoCarrinho(produtoId: number): boolean {
    const indice = carrinho.findIndex(
        item => item.produtoId === produtoId
    );

    if (indice === -1) {
        console.log("Erro: produto não encontrado no carrinho.");
        return false;
    }

    carrinho.splice(indice, 1);

    console.log("Produto removido do carrinho.");
    return true;
}

// Altera a quantidade de um produto já adicionado.
export function alterarQuantidade(
    produtoId: number,
    novaQuantidade: number
): boolean {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade <= 0) {
        console.log("Erro: a quantidade deve ser um número inteiro positivo.");
        return false;
    }

    const item = carrinho.find(
        item => item.produtoId === produtoId
    );

    if (!item) {
        console.log("Erro: produto não encontrado no carrinho.");
        return false;
    }

    const produto = buscarProdutoPorId(produtoId);

    if (!produto) {
        console.log("Erro: produto não encontrado no catálogo.");
        return false;
    }

    if (novaQuantidade > produto.estoque) {
        console.log(
            `Erro: estoque insuficiente. Estoque disponível: ${produto.estoque}.`
        );
        return false;
    }

    item.quantidade = novaQuantidade;
    item.subtotal = item.precoUnitario * novaQuantidade;

    console.log("Quantidade atualizada com sucesso.");
    return true;
}

// Retorna os itens do carrinho sem permitir alterações diretas na lista interna.
export function listarCarrinho(): ItemCarrinho[] {
    return carrinho.map(obterItemComPrecoAtual);
}

// Calcula o subtotal de um produto específico no carrinho.
export function calcularSubtotal(produtoId: number): number {
    const item = carrinho.find(
        item => item.produtoId === produtoId
    );

    if (!item) {
        return 0;
    }

    return obterItemComPrecoAtual(item).subtotal;
}

// Calcula o valor total do carrinho.
export function calcularTotal(): number {
    return carrinho.reduce(
        (total, item) => total + obterItemComPrecoAtual(item).subtotal,
        0
    );
}

// Esvazia o carrinho.
export function limparCarrinho(): void {
    carrinho = [];
    console.log("Carrinho esvaziado.");
};