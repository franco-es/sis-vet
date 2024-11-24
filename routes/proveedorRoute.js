const express = require("express");
const router = express.Router();
const proveedorController = require("../controllers/store/proveedorController");
//agregar middleares para validar.


router.post("/new", proveedorController.save);
router.get("/getAll", proveedorController.getAll);




module.exports = router;

