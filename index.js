'use strict'
import { conn as sequelize } from './services/sequelize.js';
import { app } from './app.js';
import pkg from 'npmlog';
const { info, error } = pkg;
var port = process.env.PORT || 8550;

try{
  sequelize.authenticate();
  info("la coneccion a db se realizo");
  db.sync({ alter: true });
  // log.info("sincronizados todos los modelos.")
  app(port, () => {
    info("El servidor http://localhost:8550 está funcionando !!!");
  });
}catch(e){
  error(e)
}