const express = require("express");
const consultaRouter = express.Router();
// const petController = require("../../controllers/pets");
const consultaController = require("../../controllers/consulta");
// const { validate_pet } = require("../../middlewares/validateData");
const md_auth = require("../../middlewares/authenticated");
const { validate_consult } = require("../../middlewares/validateData").default;

consultaRouter.post(
  "/new/",
  [md_auth.authenticated, validate_consult],
  consultaController.save
);
consultaRouter.put(
  "/update",
  [md_auth.authenticated, validate_consult],
  consultaController.update
);

consultaRouter.get(
  "/getConsultas",
  md_auth.authenticated,
  consultaController.getConsultas
);
consultaRouter.delete("/delete", md_auth.authenticated, consultaController.delete);

export {consultaRouter};
