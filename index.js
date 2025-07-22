import { app } from "./app.js";
import log from "npmlog";
import { SequelizeSynchronizer } from "./services/SequelizeSynchronizer.js";
import { sequelize } from "./services/sequelize.js";

// Sincronización de modelos con Sequelize
const syncModels = async () => {
  const synchronizer = new SequelizeSynchronizer();
  (async () => {
    try {
      await synchronizer.syncModels();
      await sequelize.sync({ alter: true });
      console.log("Tablas sincronizadas con alter:true");
    } catch (err) {
      console.error("Error al sincronizar tablas:", err);
    }
  })();
};

// Iniciar el servidor
const startServer = async () => {
  await syncModels();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    log.info("Server", `Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
