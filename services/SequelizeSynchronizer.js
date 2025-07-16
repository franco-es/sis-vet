"use strict";

import log from 'npmlog';
import usuarioModels from '../models/Usuario.js';
import * as ownerPetsModels from '../models/owner_pet.js';
import veterinariaModels from '../models/Veterinaria.js';
import {sequelize} from "./sequelize.js";

const Usuario = usuarioModels(sequelize)
const Veterinaria = veterinariaModels(sequelize)


class SequelizeSynchronizer {

    constructor(){};

    async syncModels (){
        try {

            await Usuario.sync();
            await Veterinaria.sync();
            await ownerPetsModels.Owner.sync();
            await ownerPetsModels.Pet.sync();
            await ownerPetsModels.Cirugia.sync();
            await ownerPetsModels.Vacuna.sync();
            await ownerPetsModels.Consulta.sync();

            log.info('Sync', 'Modelos sincronizados con éxito');
        } catch (error) {
            log.error('Sync', 'Error al sincronizar los modelos:', error);
        }
    }

}

export {SequelizeSynchronizer};
