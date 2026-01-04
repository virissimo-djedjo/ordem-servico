import { Router } from "express";
import ClienteController from "../controller/ClienteController.js";

const router = Router()

router.get("/clientes", ClienteController.listar)
router.get("/clientes/:id", ClienteController.buscarPorId)
router.post("/clientes", ClienteController.criar)
router.put("/clientes/:id", ClienteController.atualizar)
router.delete("/clientes/:id", ClienteController.excluir)

export default router;