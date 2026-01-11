export default function permitePerfil(...perfisPermitidos) {
  return (req, res, next) => {
    if (!perfisPermitidos.includes(req.usuarioPerfil)) {
      return res.status(403).json({ erro: "Acesso negado" });
    }
    return next();
  };
}

/*
O includes() é um método do JavaScript (para Arrays e Strings) 
que funciona como um detector. Ele serve para responder 
a uma pergunta simples: "Isso que eu estou procurando está aqui dentro?

const perfisPermitidos = ["ADM", "TECNICO"];
const perfilDoUsuario = "TECNICO";

const resultado = perfisPermitidos.includes(perfilDoUsuario); 
// resultado será true, porque "TECNICO" está na lista.

*/