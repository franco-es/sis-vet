const express = require("express");
const router = express.Router();
const petController = require("../../controllers/pets");
const consultaController = require("../../controllers/consulta");
const { validate_pet } = require("../../middlewares/validateData");
const md_auth = require("../../middlewares/authenticated");

router.post("/new/", [md_auth.authenticated, validate_pet], petController.save);
router.post("/new/consulta", md_auth.authenticated, consultaController.save);

// router.get("/", md_auth.authenticated, ownerController.getByVeteId);
router.get("/single", md_auth.authenticated, petController.findOne);
router.get("/all", md_auth.authenticated, petController.findAll);
router.put("/update", md_auth.authenticated, petController.update);
router.delete("/delete", md_auth.authenticated, petController.delete);

module.exports = router;
