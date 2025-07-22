"use strict";

import log from 'npmlog';
import {sequelize} from "./sequelize.js";
import { DataTypes } from 'sequelize';

import usuarioModels from '../models/Usuario.js';
import veterinariaModels from '../models/Veterinaria.js';
import usuarioVeterinariaModels from '../models/UsuarioVeterinaria.js';
import pacienteModels from '../models/Paciente.js';
import clienteModels from '../models/Cliente.js'
import cirugiamodels from '../models/Cirugia.js';
import consultaModels from '../models/Consulta.js';
import ownerModels from '../models/Owner.js';
import petModels from '../models/Pet.js';
import vacunaModels from '../models/Vacuna.js';

const Usuario = usuarioModels(sequelize, DataTypes)
const Veterinaria = veterinariaModels(sequelize, DataTypes)
const Paciente = pacienteModels(sequelize, DataTypes);
const UsuarioVeterinaria = usuarioVeterinariaModels(sequelize, DataTypes);
const Cliente = clienteModels(sequelize, DataTypes);
const Pet = petModels(sequelize, DataTypes);
const Cirugia = cirugiamodels(sequelize, DataTypes);
const Consulta = consultaModels(sequelize, DataTypes);
const Owner = ownerModels(sequelize, DataTypes);
const Vacuna = vacunaModels(sequelize, DataTypes);

class SequelizeSynchronizer {

    constructor(){};

    async syncModels (){
        try {

            const models = {
                Usuario,
                Veterinaria,
                UsuarioVeterinaria,
                Paciente, 
                Cliente,
                Pet,
                Cirugia,
                Consulta,
                Vacuna: Vacuna,
                Owner
            }

            Object.values(models).filter(m => typeof m.associate === "function")
                .forEach(m => m.associate(models))

            // await Usuario.sync();
            // await Veterinaria.sync();
            // await UsuarioVeterinaria.sync();
            // await ownerPetsModels.Owner.sync();
            // await ownerPetsModels.Pet.sync();
            // await ownerPetsModels.Cirugia.sync();
            // await ownerPetsModels.Vacuna.sync();
            // await ownerPetsModels.Consulta.sync();

            log.info('Sync', 'Modelos sincronizados con éxito');
        } catch (error) {
            log.error('Sync', 'Error al sincronizar los modelos:', error);
        }
    }

}

export {SequelizeSynchronizer};
