import * as express from "express";
import {ConsultaController} from "../../controllers/consulta.js";
import {authenticated} from "../../middlewares/authenticated.js";
import {validate_consult} from "../../middlewares/validateData.js";
const consultaRouter = express.Router();
// const petController = require("../../controllers/pets");
//const consultaController = require("../../controllers/consulta");
// const { validate_pet } = require("../../middlewares/validateData");
//const md_auth = require("../../middlewares/authenticated");
//const { validate_consult } = require("../../middlewares/validateData").default;

consultaRouter.post("/new", [authenticated, validate_consult], new ConsultaController().save);
consultaRouter.put("/update",[authenticated, validate_consult],new ConsultaController().update);
consultaRouter.get("/getConsultas",authenticated, new ConsultaController().getConsultas);
consultaRouter.delete("/delete", authenticated, new ConsultaController().delete);

export {consultaRouter};
