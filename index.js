import { app } from './app.js';
import log from 'npmlog';
import * as usersModels from './models/users.js';
import * as ownerPetsModels from './models/owner_pet.js';

// Sincronización de modelos con Sequelize
const syncModels = async () => {
    try {
        
        await usersModels.User.sync();
        await usersModels.Vete.sync();
        await ownerPetsModels.Owner.sync();
        await ownerPetsModels.Cirugia.sync();
        await ownerPetsModels.Vacuna.sync();
        await ownerPetsModels.Consulta.sync();
        await ownerPetsModels.Pet.sync();

        log.info('Sync', 'Modelos sincronizados con éxito');
    } catch (error) {
        log.error('Sync', 'Error al sincronizar los modelos:', error);
    }
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
