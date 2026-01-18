import express from "express";
import Clienterouter from "./routes/ClienteRoutes.js";
import UsuarioRouter from "./routes/UsuarioRouter.js";
import authRoutes from "./routes/authRoutes.js";
import TecnicoRoutes from "./routes/TecnicoRoutes.js";
import OrdemServicoRoutes from "./routes/ordemServicoRoutes.js";


const app = express();
app.use(express.json());

app.use(Clienterouter);
app.use(UsuarioRouter);
app.use(authRoutes);
app.use(TecnicoRoutes);
app.use(OrdemServicoRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Ordem de Serviço funcionando 🚀" });
});

export default app;
