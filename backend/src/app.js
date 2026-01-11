import express from "express";
import Clienterouter from "./routes/ClienteRoutes.js";
import UsuarioRouter from "./routes/UsuarioRouter.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

app.use(Clienterouter);
app.use(UsuarioRouter);
app.use(authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Ordem de Serviço funcionando 🚀" });
});

export default app;
