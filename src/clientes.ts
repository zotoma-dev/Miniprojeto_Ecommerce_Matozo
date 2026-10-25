import { Cliente } from "./types";

// Banco de dados em memória com três clientes iniciais.
const clientes: Cliente[] = [
    { id: 1, nome: "Ana Souza", email: "ana.souza@email.com" },
    { id: 2, nome: "Bruno Lima", email: "bruno.lima@email.com" },
    { id: 3, nome: "Carla Mendes", email: "carla.mendes@email.com" },
];

// Retorna todos os clientes cadastrados.
export function listarClientes(): Cliente[] {
    return clientes.map(cliente => ({ ...cliente }));
}

// Busca um cliente pelo ID.
export function buscarClientePorId(id: number): Cliente | undefined {
    const cliente = clientes.find(cliente => cliente.id === id);

    return cliente ? { ...cliente } : undefined;
}

// Cadastra um cliente e gera seu ID automaticamente.
export function cadastrarCliente(
    novo: Omit<Cliente, "id">
): Cliente {
    const nome = novo.nome.trim();
    const email = novo.email.trim().toLowerCase();

    // Valida o nome.
    if (nome === "") {
        throw new Error("O nome do cliente é obrigatório.");
    }

    // Valida o e-mail.
    if (email === "") {
        throw new Error("O e-mail do cliente é obrigatório.");
    }

    // Impede o cadastro de e-mails duplicados.
    const emailExiste = clientes.some(
        cliente => cliente.email.toLowerCase() === email
    );

    if (emailExiste) {
        throw new Error(
            `Já existe um cliente com o e-mail ${email}.`
        );
    }

    // Gera o próximo ID disponível.
    const id = clientes.length === 0
        ? 1
        : Math.max(...clientes.map(cliente => cliente.id)) + 1;

    // Cria e armazena o novo cliente.
    const clienteCadastrado: Cliente = {
        id,
        nome,
        email
    };

    clientes.push(clienteCadastrado);

    return { ...clienteCadastrado };
}