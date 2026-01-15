import { Router } from "express";
import TecnicoController from "../controller/TecnicoController.js";
import auth from "../middlewares/auth.js";
import permitePerfil from "../middlewares/permitePerfil.js";

const router = Router();

router.get("/tecnicos", auth, permitePerfil("ADMIN"), TecnicoController.listar);
router.post("/tecnicos", auth, permitePerfil("ADMIN"), TecnicoController.criar);
router.put("/tecnicos/:id", auth, permitePerfil("ADMIN"), TecnicoController.atualizar);
router.delete("/tecnicos/:id", auth, permitePerfil("ADMIN"), TecnicoController.deletar);

export default router;
