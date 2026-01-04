import Usuario from "../models/Usuario.js"
import brypt from "bcryptjs"

class UsuarioController{
    listar = async(req, res)=>{
        try {
            const usuarios = await Usuario.findAll({
                attributes: {exclude: ["senha"]}
            })
            return res.status(200).json(usuarios)

        } catch (error) {
            return res.status(500).json({ erro: "Erro ao listar usuários", error});
        }
    }

    buscarPorId = async(req, res)=>{

        const { id } = req.params;
        try {
            const usuario = await Usuario.findOne({
                where: {id_usuario: id},
                attributes: {exclude: ["senha"]}
            })

            if(!usuario){
                return res.status(404).json({mensagem: "Usuario não encontrado!"})
            }

            return res.status(200).json(usuario)

        } catch (error) {
            return res.status(500).json({mensagem: "erro ao buscar usuario!"})
        }
    }

    criar = async(req, res)=>{

        const { nome, login, senha, perfil, status } = req.body;

        if(!nome || !login || !senha || !perfil || !status){
            return res.status(400).json({mensagem: "dados obrigatórios não preenchidos!"});
        }

        try {
            const existeLogin = await Usuario.findOne({where: {login}});
            if(existeLogin){
                return res.status(400).json({ erro: "Login já existe" });
            }
            
            const senhaHash = await brypt.hash(senha, 10);
            const novoUsuario = await Usuario.create({
                nome,
                login,
                senha: senhaHash,
                perfil,
                status: status || "ATIVO"
            });

            return res.status(201).json({
                id_usuario: novoUsuario.id_usuario,
                nome: novoUsuario.nome,
                login: novoUsuario.login,
                perfil: novoUsuario.perfil,
                status: novoUsuario.status
            });

        } catch (error) {
            return res.status(500).json({ erro: "Erro ao criar usuário" });
        }
    }

    atualizar = async(req, res)=>{

        const { id } = req.params;
        const { nome, login, senha, perfil, status } = req.body;

        try {
            const usuario = await Usuario.findOne({where: {id_usuario: id}});
            if(!usuario){
                return res.status(404).json({ erro: "Usuário não encontrado" });
            }
            const senhaAtualizada = usuario.senha; //capturar senha do banco de dados
            if(senha){
                senhaAtualizada = await brypt.hash(senha, 10)
            }
             await usuario.update({
                nome,
                login,
                senha: senhaAtualizada,
                perfil,
                status
            });

            return res.json({ mensagem: "Usuário atualizado com sucesso" });

        } catch (error) {
            return res.status(500).json({ erro: "Erro ao atualizar usuário" });
        }
    }

    excluir = async(req, res)=>{
        const { id } = req.params;

        try {
            const usuario = await Usuario.findOne({where: {id_usuario: id}})
            if(!usuario){
                return res.status(404).json({ erro: "Usuário não encontrado" });
            }

            await usuario.update({status: "INATIVO"})
            return res.json({ mensagem: "Usuário inativado com sucesso" });

        } catch (error) {
            return res.status(500).json({ erro: "Erro ao deletar usuário" });
        }
    }

}


export default new UsuarioController();