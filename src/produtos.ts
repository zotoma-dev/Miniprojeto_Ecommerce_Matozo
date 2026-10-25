import type { Produto } from "./types";

// Lista de produtos armazenados em memória.
const produtos: Produto[] = [
    {
        id: 1,
        nome: "Teclado Mecânico",
        categoria: "Periféricos",
        preco: 250,
        estoque: 10
    },
    {
        id: 2,
        nome: "Mouse Gamer",
        categoria: "Periféricos",
        preco: 120,
        estoque: 15
    },
    {
        id: 3,
        nome: "Monitor 24 polegadas",
        categoria: "Monitores",
        preco: 800,
        estoque: 5
    }
];

// Gera automaticamente o próximo ID disponível.
function gerarProximoId(): number {
    const maiorId = produtos.reduce(
        (maior, produto) => Math.max(maior, produto.id),
        0
    );

    return maiorId + 1;
}

// Lista todos os produtos cadastrados.
export function listarProdutos(): Produto[] {
    return produtos.map(produto => ({ ...produto }));
}

// Busca um produto pelo seu ID.
export function buscarProdutoPorId(id: number): Produto | undefined {
    const produto = produtos.find(produto => produto.id === id);

    return produto ? { ...produto } : undefined;
}

// Busca produtos pelo nome, permitindo pesquisar apenas parte dele.
export function buscarProdutosPorNome(nome: string): Produto[] {
    const termo = nome.trim().toLowerCase();

    return produtos
        .filter(produto => produto.nome.toLowerCase().includes(termo))
        .map(produto => ({ ...produto }));
}

// Filtra os produtos pela categoria informada.
export function filtrarProdutosPorCategoria(
    categoria: string
): Produto[] {
    const termo = categoria.trim().toLowerCase();

    return produtos
        .filter(produto => produto.categoria.toLowerCase() === termo)
        .map(produto => ({ ...produto }));
}

// Cadastra um produto e gera seu ID automaticamente.
export function cadastrarProduto(
    dados: Omit<Produto, "id">
): Produto {
    const nome = dados.nome.trim();
    const categoria = dados.categoria.trim();

    // Valida o nome do produto.
    if (nome === "") {
        throw new Error("O nome do produto é obrigatório.");
    }

    // Valida a categoria do produto.
    if (categoria === "") {
        throw new Error("A categoria do produto é obrigatória.");
    }

    // Valida o preço.
    if (!Number.isFinite(dados.preco) || dados.preco <= 0) {
        throw new Error("O preço deve ser maior que zero.");
    }

    // Valida a quantidade em estoque.
    if (
        !Number.isInteger(dados.estoque) ||
        dados.estoque < 0
    ) {
        throw new Error(
            "O estoque deve ser um número inteiro não negativo."
        );
    }

    // Cria o produto com o próximo ID disponível.
    const produtoCadastrado: Produto = {
        id: gerarProximoId(),
        nome,
        categoria,
        preco: dados.preco,
        estoque: dados.estoque
    };

    // Adiciona o produto à lista.
    produtos.push(produtoCadastrado);

    return { ...produtoCadastrado };
}

// Atualiza os dados de um produto existente.
export function atualizarProduto(
    id: number,
    dados: Partial<Omit<Produto, "id">>
): Produto {
    const indice = produtos.findIndex(produto => produto.id === id);

    // Verifica se o produto existe.
    if (indice === -1) {
        throw new Error(`Produto com ID ${id} não encontrado.`);
    }

    const atual = produtos[indice];

    // Combina os dados atuais com as alterações solicitadas.
    const atualizado: Produto = {
        ...atual,
        ...dados,
        id: atual.id,
        nome: dados.nome !== undefined
            ? dados.nome.trim()
            : atual.nome,
        categoria: dados.categoria !== undefined
            ? dados.categoria.trim()
            : atual.categoria
    };

    // Valida o nome.
    if (atualizado.nome === "") {
        throw new Error("O nome do produto é obrigatório.");
    }

    // Valida a categoria.
    if (atualizado.categoria === "") {
        throw new Error("A categoria do produto é obrigatória.");
    }

    // Valida o preço.
    if (
        !Number.isFinite(atualizado.preco) ||
        atualizado.preco <= 0
    ) {
        throw new Error("O preço deve ser maior que zero.");
    }

    // Valida o estoque.
    if (
        !Number.isInteger(atualizado.estoque) ||
        atualizado.estoque < 0
    ) {
        throw new Error(
            "O estoque deve ser um número inteiro não negativo."
        );
    }

    // Salva as alterações na lista.
    produtos[indice] = atualizado;

    return { ...atualizado };
}

// Remove um produto pelo ID e retorna o produto removido.
export function removerProduto(id: number): Produto {
    const indice = produtos.findIndex(produto => produto.id === id);

    // Verifica se o produto existe.
    if (indice === -1) {
        throw new Error(`Produto com ID ${id} não encontrado.`);
    }

    const removido = produtos[indice];

    // Retira o produto da lista.
    produtos.splice(indice, 1);

    return { ...removido };
}