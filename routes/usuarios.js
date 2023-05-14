const express = require("express");
const router = express.Router();
const {VeteController} = require("./../controllers/veterinaria");
const { create, login, update } = require("./../middlewares/validateData");
const md_auth = require("./../middlewares/authenticated");
const { checkEmailUpdate, checkEmail } = require("../middlewares/checkEmail");

router.post("/new", [create, checkEmail], new VeteController().save);
router.post("/login", login, new VeteController().login);
router.put(
  "/update",
  [md_auth.authenticated, update, checkEmailUpdate],
  new VeteController().update
);
router.post("/uploadAvatar", md_auth.authenticated, new VeteController().uploadImage);
// router.delete('/delete/:id', userController.deleteVet);
// router.get('/admin/all', userController.getAll);

module.exports = router;
