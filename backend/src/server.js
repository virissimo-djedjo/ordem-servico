import app from "./app.js";
import sequelize from "./config/database.js";

const PORT = process.env.PORT || 3333;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Banco conectado com sucesso");

    // Sincroniza os modelos (opcional, mas recomendado para criar as tabelas)
    // await sequelize.sync(); 

    app.listen(PORT, () => {
      console.log(`🚀 API rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erro ao conectar no banco. Tentando novamente em 5 segundos...", error.message);
    setTimeout(startServer, 5000); // Tenta novamente após 5 segundos
  }
}

startServer();