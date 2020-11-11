const express = require("express");
const router = express.Router();
const employeeController = require("./../controllers/veterinario");
const { validate_employee } = require("./../middlewares/validateData");
const md_auth = require("./../middlewares/authenticated");

router.post(
  "/new",
  [md_auth.authenticated, validate_employee],
  employeeController.save
);
// router.delete('/delete/:id', userController.deleteVet);
// router.get('/admin/all', userController.getAll);

module.exports = router;
