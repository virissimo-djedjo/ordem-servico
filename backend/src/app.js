import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Ordem de Serviço funcionando 🚀" });
});

export default app;
