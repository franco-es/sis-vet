const express = require("express");
const router = express.Router();
const ownerController = require("./../controllers/owner").default;
const {
  create,
  login,
  update,
  validate_owner,
} = require("./../middlewares/validateData");
const md_auth = require("./../middlewares/authenticated");

router.post(
  "/new/owner",
  [md_auth.authenticated, validate_owner],
  ownerController.saveVeterinario
);

module.exports = router;
