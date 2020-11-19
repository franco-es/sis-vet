const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

// EJECUTAR EXPRESS
const app = express();

// CONFIGURAR ARCHIVOS DE RUTAS
const user_routes = require("./routes/usuarios");
const employee_routes = require("./routes/employee");
const owner_routes = require("./routes/owner");
const pet_routes = require("./routes/pets");

// MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CONFIGURAR CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// REESCRIBIMOS LAS RUTAS
app.use("/api/user", user_routes);
app.use("/api/employee", employee_routes);
app.use("/api/owner", owner_routes);
app.use("/api/pet", pet_routes);

module.exports = app;
