import Tecnico from "../models/Tecnico.js";
import Usuario from "../models/Usuario.js";
class TecnicoController {
    listar = async (req, res) => {
        try {
            const tecnicos = await Tecnico.findAll({
                include: {
                    model: Usuario,
                    attributes: ["id_usuario", "nome", "login", "status"]
                }
            });
            return res.status(200).json(tecnicos);

        } catch (error) {
            return res.status(500).json({ erro: "Erro ao listar técnicos." });

        }
    }
    criar = async (req, res) => {
        const { especialidade, id_usuario } = req.body;
        if (!especialidade || !id_usuario) {
            return res.status(400).json({ erro: "Campos obrigatórios não fornecidos." });
        }

        try {
            const usuario = await Usuario.findByPk(id_usuario);
            if (!usuario) {
                return res.status(404).json({ erro: "Usuário não encontrado." });
            }
            if (usuario.perfil !== 'TECNICO') {
                return res.status(400).json({ erro: "O perfil do usuário deve ser 'TECNICO'." });
            } 
            if (usuario.status !== 'ATIVO') {
                return res.status(400).json({ erro: "O usuario está iativo." });
            }

            const jaExisteTecnico = await Tecnico.findOne({ where: { id_usuario } });

            if (jaExisteTecnico) {
                return res.status(400).json({ erro: "Já existe um técnico associado a este usuário." });
            }

            const tecnico = await Tecnico.create({  
                especialidade,
                id_usuario
            });
            return res.status(201).json(tecnico);

        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }
    atualizar = async (req, res) => {
        const { id_tecnico } = req.params;
        const { especialidade } = req.body; 

        try {

            const tecnico = await Tecnico.findByPk(id_tecnico);
            if (!tecnico) {
                return res.status(404).json({ erro: "Técnico não encontrado." });
            }   

            await tecnico.update({ especialidade });
            return res.status(200).json(tecnico);

        } catch (error) {
            return res.status(500).json({ erro: "Erro ao atualizar técnico." });
        }
    }

    deletar = async (req, res) => {
        const { id_tecnico } = req.params;

        try {
            const tecnico = await Tecnico.findByPk(id_tecnico);
            if (!tecnico) {
                return res.status(404).json({ erro: "Técnico não encontrado." });
            }

            await tecnico.destroy();
            return res.status(200).json({ mensagem: "Técnico deletado com sucesso." });  

        } catch (error) {
            return res.status(500).json({ erro: "Erro ao deletar técnico." });
        }
    }

}

export default new TecnicoController();
