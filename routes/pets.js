const express = require("express");
const router = express.Router();
const petController = require("./../controllers/pets");
const { validate_pet } = require("./../middlewares/validateData");
const md_auth = require("./../middlewares/authenticated");

router.post("/new/", [md_auth.authenticated, validate_pet], petController.save);
// router.get("/", md_auth.authenticated, ownerController.getByVeteId);
// router.get("/:id", md_auth.authenticated, ownerController.getOwner);
router.put("/update/:idPet", md_auth.authenticated, petController.update);
router.delete("/delete/:idPet", md_auth.authenticated, petController.delete);

module.exports = router;
