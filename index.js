import { app } from './app.js';
import log from 'npmlog';
import { SequelizeSynchronizer } from './services/SequelizeSynchronizer.js';



// Sincronización de modelos con Sequelize
const syncModels = async () => {
    const synchronizer = new SequelizeSynchronizer();
    await synchronizer.syncModels();
};

// Iniciar el servidor
const startServer = async () => {
    await syncModels();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {

        log.info('Server', `Servidor corriendo en http://localhost:${PORT}`);
    });
};

startServer();
