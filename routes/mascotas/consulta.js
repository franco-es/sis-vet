const express = require("express");
const router = express.Router();
// const petController = require("../../controllers/pets");
const consultaController = require("../../controllers/consulta");
// const { validate_pet } = require("../../middlewares/validateData");
const md_auth = require("../../middlewares/authenticated");
const { validate_consult } = require("../../middlewares/validateData");

router.post(
  "/new/",
  [md_auth.authenticated, validate_consult],
  consultaController.save
);
router.put(
  "/update",
  [md_auth.authenticated, validate_consult],
  consultaController.update
);

router.get(
  "/getConsultas",
  md_auth.authenticated,
  consultaController.getConsultas
);
router.delete("/delete", md_auth.authenticated, consultaController.delete);

module.exports = router;
