'use strict'

// var mongoose = require("mongoose");
var app = require('./app');
var log = require('npmlog');
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


//mongoose.set("useFindAndModify", false);

// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://127.0.0.1:27017/SisVet", {useNewUrlParser: true, useUnifiedTopology: true})
// const db = mongoose.connection;


// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     app.listen(port, () => {
//         log.info("El servidor http://localhost:8550 está funcionando !!!");
//     });
// });

