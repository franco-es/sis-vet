const express = require("express");
const router = express.Router();
// const petController = require("../../controllers/pets");
const cirugiaController = require("../../controllers/cirugia");
// const { validate_pet } = require("../../middlewares/validateData");
const md_auth = require("../../middlewares/authenticated");

router.post("/new/", md_auth.authenticated, cirugiaController.save);
// router.post("/new/consulta", md_auth.authenticated, consultaController.save);

// router.get("/", md_auth.authenticated, ownerController.getByVeteId);
// router.get("/:idPet", md_auth.authenticated, petController.findOne);
// router.put("/update/:idPet", md_auth.authenticated, petController.update);
// router.delete("/delete/:idPet", md_auth.authenticated, petController.delete);

module.exports = router;
