const express = require("express");
const router = express.Router();
const saleController = require("../controllers/store/saleController");
//agregar middleares para validar.


router.post("/new", saleController.save);
router.get("/getAll", saleController.getAll);




module.exports = router;

