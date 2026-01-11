import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  login = async (req, res)=>{
    const { login, senha } = req.body;

    if (!login || !senha) {
      return res.status(400).json({ erro: "Login e senha são obrigatórios" });
    }

    try {
      const usuario = await Usuario.findOne({ where: { login } });

      if (!usuario) {
        return res.status(401).json({ erro: "Usuário ou senha inválidos" });
      }

      if (usuario.status !== "ATIVO") {
        return res.status(403).json({ erro: "Usuário inativo" });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json({ erro: "Usuário ou senha inválidos" });
      }

      const token = jwt.sign(
        {
          id: usuario.id_usuario,
          perfil: usuario.perfil
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN
        }
      );

      return res.json({
        usuario: {
          id: usuario.id_usuario,
          nome: usuario.nome,
          perfil: usuario.perfil
        },
        token
      });
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao realizar login" });
    }
  }
}

export default new AuthController();
