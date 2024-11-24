'use strict'
import { conn } from './services/sequelize.js';
import { app } from './app.js';
import pkg from 'npmlog';
const { info, error } = pkg;
var port = process.env.PORT || 8550;

const sequelize = require('./services/sequelize');

sequelize.authenticate().then(() => {

    const { Usuario, Veterinario} = usersModels(sequelize);
    const { Consulta, Vacuna, Cirugia, Owner, Pet } = ownerPetsModels(sequelize);

    sequelize.sync().then(() => {
        console.log('Modelos sincronizados');
      });

    app.listen(port, () => {
        log.info("El servidor http://localhost:8550 está funcionando !!!");
    });
  })
  .catch((e) => console.log(e));
