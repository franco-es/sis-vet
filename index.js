'use strict'
var db = require('./services/sequelize');
var app = require('./app');
var log = require('npmlog');
var port = process.env.PORT || 8550;

try{
  db.authenticate();
  log.info("la coneccion a db se realizo");
  // db.sync({ alter: true });
  // log.info("sincronizados todos los modelos.")
  app.listen(port, () => {
    log.info("El servidor http://localhost:8550 está funcionando !!!");
  });
}catch(e){
  log.error(e)
}