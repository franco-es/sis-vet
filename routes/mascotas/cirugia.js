const express = require("express");
const router = express.Router();
// const petController = require("../../controllers/pets");
const cirugiaController = require("../../controllers/cirugia");
const { validate_cirugia } = require("../../middlewares/validateData");
const md_auth = require("../../middlewares/authenticated");

router.post(
  "/new/",
  [md_auth.authenticated, vaclidate_cirugia],
  cirugiaController.save
);
router.put("/update", md_auth.authenticated, cirugiaController.update);

router.get("/ getcirugia", md_auth.authenticated, cirugiaController.getcirugia);
router.delete("/delete", md_auth.authenticated, cirugiaController.delete);

module.exports = router;
