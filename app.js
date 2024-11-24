const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

// EJECUTAR EXPRESS
const app = express();

// CONFIGURAR ARCHIVOS DE RUTAS
const user_routes = require("./routes/usuarios");
const proveedor_routes = require("./routes/proveedorRoute");
const producto_routes = require("./routes/product");
const employee_routes = require("./routes/employee");
const owner_routes = require("./routes/owner");
const pet_routes = require("./routes/mascotas/pets");
const consulta_routes = require("./routes/mascotas/consulta");
const cirugia_routes = require("./routes/mascotas/cirugia");
const vacuna_routes = require("./routes/mascotas/vacuna");

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
app.use("/api/proveedor", proveedor_routes);
app.use("/api/producto", producto_routes);
app.use("/api/employee", employee_routes);
app.use("/api/owner", owner_routes);
app.use("/api/pet", pet_routes);
app.use("/api/consulta", consulta_routes);
app.use("/api/cirugia", cirugia_routes);
app.use("/api/vacuna", vacuna_routes);

module.exports = app;
