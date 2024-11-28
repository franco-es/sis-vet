'use strict'

var app = require('./app');
var log = require('npmlog');
//importamos los modelos de sequelize para ser sincronizados en caso de cambios
var usersModels = require("./models/users");
var ownerPetsModels = require("./models/owner_pet");

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
}).catch((err)=> {
    log.error(err)
    log.error("error conectandose a la db.")
})

