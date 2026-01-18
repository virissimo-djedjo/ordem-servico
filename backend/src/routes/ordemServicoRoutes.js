import { Router } from "express";
import OrdemServicoController from "../controller/OrdemServicoController.js";
import auth from "../middlewares/auth.js";
import permitePerfil from "../middlewares/permitePerfil.js";

const router = Router();

// ADMIN e ATENDENTE criam OS
router.post(
  "/ordens-servico",
  auth,
  permitePerfil("ADMIN", "ATENDENTE"),
  OrdemServicoController.criar
);

// ADMIN vê tudo / TECNICO vê as dele
router.get(
  "/ordens-servico",
  auth,
  OrdemServicoController.listar
);

// Atualizar status (ADMIN ou TECNICO)
router.put(
  "/ordens-servico/:id/status",
  auth,
  permitePerfil("ADMIN", "TECNICO"),
  OrdemServicoController.atualizarStatus
);

export default router;
