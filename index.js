'use strict'

var mongoose = require("mongoose");
var app = require('./app');
var port = process.env.PORT || 3999;

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://root:root2020@sysvetcluster.1tmfn.mongodb.net/SisVet?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log("la coneccion a mongo se realizo");
  app.listen(port, () => {
    console.log('El servidor http://localhost:3999 está funcionando !!!');
  });
})
.catch((e) => console.log(e))