import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {

    /* aqui a variave decoded recebe o objeto desse, transformado do token criado 
    { id: 1, perfil: 'ADM', iat: 12345, exp: 67890 } */

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//Elas garantem que a identidade do usuário acompanhe a requisição por todo o trajeto dentro do servidor
    req.usuarioId = decoded.id;
    req.usuarioPerfil = decoded.perfil;

    return next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido" });
  }
}
