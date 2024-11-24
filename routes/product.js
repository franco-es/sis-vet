const express = require("express");
const router = express.Router();
const productoController = require("../controllers/store/productoController");
//agregar middleares para validar.


router.post("/new", productoController.save);
router.get("/getAll", productoController.getAll);
router.get("/getAllByProveedor", productoController.getAllByProveedor);



module.exports = router;

