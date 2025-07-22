import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
config();
import pkg from 'body-parser';
const { json, urlencoded } = pkg;

// EJECUTAR EXPRESS
const app = express();

// CONFIGURAR ARCHIVOS DE RUTAS
import { userRouter } from "./routes/usuarios.js";
import { employeeRouter } from "./routes/employee.js";

// MIDDLEWARES
app.use(json());
app.use(urlencoded({ extended: false }));

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
app.use("/api/user", userRouter);
app.use("/api/employee", employeeRouter);
/*app.use("/api/owner", ownerRouter);
app.use("/api/pet", petRouter);
app.use("/api/consulta", consultaRouter);
app.use("/api/cirugia", cirugiaRouter);
app.use("/api/vacuna", vacunaRouter);*/

export {app};
