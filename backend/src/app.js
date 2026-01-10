import express from "express";
import Clienterouter from "./routes/ClienteRoutes.js";
import UsuarioRouter from "./routes/UsuarioRouter.js";

const app = express();
app.use(express.json());

app.use(Clienterouter);
app.use(UsuarioRouter);

app.get("/", (req, res) => {
  res.json({ message: "API Ordem de Serviço funcionando 🚀" });
});

export default app;
