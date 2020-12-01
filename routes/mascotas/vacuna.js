const express = require("express");
const router = express.Router();
const vacunaController = require("../../controllers/vacuna");
const md_auth = require("../../middlewares/authenticated");

router.post("/new/", md_auth.authenticated, vacunaController.save);

module.exports = router;
