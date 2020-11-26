const express = require("express");
const router = express.Router();
// const petController = require("./../controllers/pets");
const testController = require("./../controllers/test");
// const { validate_pet } = require("./../middlewares/validateData");
// const md_auth = require("./../middlewares/authenticated");

router.post("/new/autor", testController.savePerson);
router.post("/new/story", testController.saveStory);

// router.get("/", md_auth.authenticated, ownerController.getByVeteId);
// router.get("/:idPet", md_auth.authenticated, petController.findOne);
// router.put("/update/:idPet", md_auth.authenticated, petController.update);
// router.delete("/delete/:idPet", md_auth.authenticated, petController.delete);

module.exports = router;
