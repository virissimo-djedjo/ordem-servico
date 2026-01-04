import { Cliente } from "../models/index.js";

class ClienteController {

    listar = async (req, res) => {
        try {
            const clientes = await Cliente.findAll();
            return res.status(200).json(clientes);
        } catch (error) {
            return res.status(500).json({ mensagem: "erro ao listar clientes", error });
        }
    }

    buscarPorId = async (req, res) => {
        const { id } = req.params;
        try {
            // Usando findOne com where explícito por causa do nome id_cliente
            const cliente = await Cliente.findOne({ where: { id_cliente: id } });

            if (!cliente) {
                return res.status(404).json({ mensagem: "cliente não encontrado!" });
            }
            return res.status(200).json(cliente);
        } catch (error) {
            return res.status(500).json({ mensagem: "erro ao buscar cliente!", error });
        }
    }

    criar = async (req, res) => {
        const { nome, telefone, email, endereco } = req.body;
        if (!nome) {
            return res.status(400).json({ mensagem: "Campo nome obrigatório!" });
        }
        try {
            const novoCliente = await Cliente.create({ nome, telefone, email, endereco });
            return res.status(201).json(novoCliente); // Status 201 para criação
        } catch (error) {
            return res.status(500).json({ mensagem: "erro ao criar cliente!", error });
        }
    }

    atualizar = async (req, res) => {
        const { id } = req.params;
        const { nome, telefone, email, endereco } = req.body;
        try {
            const cliente = await Cliente.findOne({ where: { id_cliente: id } });
            if (!cliente) {
                return res.status(404).json({ mensagem: "cliente não encontrado" });
            }
            await cliente.update({ nome, telefone, email, endereco });
            return res.status(200).json(cliente);
        } catch (error) {
            return res.status(500).json({ mensagem: "erro ao atualizar cliente", error });
        }
    }

    excluir = async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findOne({ where: { id_cliente: id } });
            if (!cliente) {
                return res.status(404).json({ mensagem: "cliente não encontrado!" });
            }
            await cliente.destroy();
            return res.json({ mensagem: "Cliente removido com sucesso" });
        } catch (error) {
            return res.status(500).json({ erro: "Erro ao deletar cliente" });
        }
    }
}

export default new ClienteController();