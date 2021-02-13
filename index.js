'use strict'

var mongoose = require("mongoose");
var app = require('./app');
var port = process.env.PORT || 8550;

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("la coneccion a mongo se realizo");
    app.listen(port, () => {
      console.log("El servidor http://localhost:8550 está funcionando !!!");
    });
  })
  .catch((e) => console.log(e));