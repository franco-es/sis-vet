const express = require("express");
const router = express.Router();
const userController = require("./../controllers/veterinaria");
const { create, login, update } = require("./../middlewares/validateData");
const md_auth = require("./../middlewares/authenticated");

router.post("/new/veterinario", create, userController.saveVeterinario);
router.post("/new", create, userController.save);
router.post("/login", login, userController.login);
router.put('/update',[md_auth.authenticated, update], userController.update);
// router.delete('/delete/:id', userController.deleteVet);
// router.get('/admin/all', userController.getAll);

module.exports = router;
