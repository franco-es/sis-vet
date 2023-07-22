'use strict'
import { conn } from './services/sequelize.js';
import { app } from './app.js';
import pkg from 'npmlog';
const { info, error } = pkg;
var port = process.env.PORT || 8550;

//mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://127.0.0.1:27017/SisVet")
  .then(() => {
    log.info("la coneccion a mongo se realizo");
    app.listen(port, () => {
      log.info("El servidor http://localhost:8550 está funcionando !!!");
    });
  })
  .catch((e) => console.log(e));
