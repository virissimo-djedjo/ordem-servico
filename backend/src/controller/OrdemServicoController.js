import OrdemServico from "../models/OrdemServico.js";
import Cliente from "../models/Cliente.js";
import Tecnico from "../models/Tecnico.js";
import Historico from "../models/Historico.js";



class OrdemServicoController {
  // LISTAR (ADMIN vê tudo / TECNICO só dele)
  async listar(req, res) {
  try {
    let filtro = {};

    if (req.usuarioPerfil === "TECNICO") {
      const tecnico = await Tecnico.findOne({
        where: { id_usuario: req.usuarioId }
      });

      if (!tecnico) {
        return res.status(403).json({ erro: "Técnico não vinculado" });
      }

      filtro.id_tecnico = tecnico.id_tecnico; // ✅ CERTO
    }

    const ordens = await OrdemServico.findAll({ where: filtro });
    return res.json(ordens);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao listar ordens" });
  }
}

  // CRIAR
  async criar(req, res) {
    const { id_cliente, id_tecnico, descricao_problema } = req.body;

    if (!id_cliente || !id_tecnico || !descricao_problema) {
      return res.status(400).json({ erro: "Dados obrigatórios não informados" });
    }

    try {
      const cliente = await Cliente.findByPk(id_cliente);
      const tecnico = await Tecnico.findByPk(id_tecnico);

      if (!cliente) return res.status(404).json({ erro: "Cliente não encontrado" });
      if (!tecnico) return res.status(404).json({ erro: "Técnico não encontrado" });

      const os = await OrdemServico.create({
        id_cliente,
        id_tecnico,
        descricao_problema,
        status: "ABERTA",
        data_abertura: new Date(),
        valor_total: 0
      });

      await Historico.create({
        id_os: os.id_os,
        id_usuario: req.usuarioId,
        acao: "Ordem de serviço criada"
      });

      return res.status(201).json(os);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao criar OS" });
    }
  }

  // ATUALIZAR STATUS
  async atualizarStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const os = await OrdemServico.findByPk(id);
      if (!os) return res.status(404).json({ erro: "OS não encontrada" });

      if (["FINALIZADA", "CANCELADA"].includes(os.status)) {
        return res.status(400).json({ erro: "OS não pode ser alterada" });
      }

      const fluxoValido = {
        ABERTA: ["EM_ANDAMENTO", "CANCELADA"],
        EM_ANDAMENTO: ["FINALIZADA"]
      };

      if (!fluxoValido[os.status]?.includes(status)) {
        return res.status(400).json({ erro: "Fluxo de status inválido" });
      }

      await os.update({
        status,
        data_fechamento: status === "FINALIZADA" ? new Date() : null
      });

      await Historico.create({
        id_os: os.id_os,
        id_usuario: req.usuarioId,
        acao: `Status alterado para ${status}`
      });

      return res.json({ mensagem: "Status atualizado com sucesso" });
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao atualizar status" });
    }
  }
}

export default new OrdemServicoController();
