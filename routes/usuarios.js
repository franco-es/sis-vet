const express = require("express");
const router = express.Router();
const userController = require("./../controllers/veterinaria");
const { create, login, update } = require("./../middlewares/validateData");
const md_auth = require("./../middlewares/authenticated");
const { checkEmailUpdate, checkEmail } = require("../middlewares/checkEmail");

router.post("/new", [create, checkEmail], userController.save);
router.post("/login", login, userController.login);
router.put(
  "/update",
  [md_auth.authenticated, update, checkEmailUpdate],
  userController.update
);
router.post("/uploadAvatar", md_auth.authenticated, userController.uploadImage);
// router.delete('/delete/:id', userController.deleteVet);
// router.get('/admin/all', userController.getAll);

module.exports = router;
