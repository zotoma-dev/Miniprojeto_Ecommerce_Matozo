export type Cliente = {
    id: number;
    nome: string;
    email: string;
};

export type Produto = {
    id: number;
    nome: string;
    categoria: string;
    preco: number;
    estoque: number;
};

// Representa um produto incluído no carrinho.
export type ItemCarrinho = {
produtoId: number;
nomeProduto: string;
quantidade: number;
precoUnitario: number;
subtotal: number;
};

// Representa um produto incluído em um pedido.
export type ItemPedido = {
produtoId: number;
nomeProduto: string;
quantidade: number;
precoUnitario: number;
subtotal: number;
};

// Representa um pedido finalizado.
export type Pedido = {
id: number;
clienteId: number;
itens: ItemPedido[];
total: number;
data: Date;
};