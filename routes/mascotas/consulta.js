import * as express from "express";
import {ConsultaController} from "../../controllers/consulta.js";
import {md_auth} from "../../middlewares/authenticated.js";
import {validate_consult} from "../../middlewares/validateData.js";
const consultaRouter = express.Router();
// const petController = require("../../controllers/pets");
//const consultaController = require("../../controllers/consulta");
// const { validate_pet } = require("../../middlewares/validateData");
//const md_auth = require("../../middlewares/authenticated");
//const { validate_consult } = require("../../middlewares/validateData").default;

consultaRouter.post(
  "/new/",
  [md_auth.authenticated, validate_consult],
  ConsultaController.save
);
consultaRouter.put(
  "/update",
  [md_auth.authenticated, validate_consult],
  ConsultaController.update
);

consultaRouter.get(
  "/getConsultas",
  md_auth.authenticated,
  ConsultaController.getConsultas
);
consultaRouter.delete("/delete", md_auth.authenticated, ConsultaController.delete);

export {consultaRouter};
