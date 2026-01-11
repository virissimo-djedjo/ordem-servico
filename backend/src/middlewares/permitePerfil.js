export default function permitePerfil(...perfisPermitidos) {
  return (req, res, next) => {
    if (!perfisPermitidos.includes(req.usuarioPerfil)) {
      return res.status(403).json({ erro: "Acesso negado" });
    }
    return next();
  };
}
