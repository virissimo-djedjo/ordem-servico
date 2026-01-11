import { Router } from "express";
import UsuarioController from "../controller/UsuarioController.js";
import auth from "../middlewares/auth.js";
import permitePerfil from "../middlewares/permitePerfil.js";

const router = Router();

router.get("/usuarios", auth, permitePerfil("ADMIN"), UsuarioController.listar);
router.get("/usuarios/:id", auth, permitePerfil("ADMIN"), UsuarioController.buscarPorId);
router.post("/usuarios", auth, permitePerfil("ADMIN"), UsuarioController.criar);
router.put("/usuarios/:id", auth, permitePerfil("ADMIN"), UsuarioController.atualizar);
router.delete("/usuarios/:id", auth, permitePerfil("ADMIN"), UsuarioController.excluir);

export default router;