'use strict'
import { conn } from './services/sequelize.js';
import { app } from './app.js';
import pkg from 'npmlog';
const { info, error } = pkg;
var port = process.env.PORT || 8550;

try{
  conn.sequelize.authenticate();
  info("la coneccion a db se realizo");
  conn.sequelize.sync({ force: true });
  // log.info("sincronizados todos los modelos.")
  app.listen(port, () => {
    info("El servidor http://localhost:8550 está funcionando !!!");
  });
}catch(e){
  error(e)
}