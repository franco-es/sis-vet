const express = require("express");
const router = express.Router();
const ownerController = require("./../controllers/owner");
const { validate_owner } = require("./../middlewares/validateData");
const md_auth = require("./../middlewares/authenticated");

router.post(
  "/new",
  [md_auth.authenticated, validate_owner],
  ownerController.save
);
router.put(
  "/update",
  [md_auth.authenticated, validate_owner],
  ownerController.save
);
router.get("/getOwner", md_auth.authenticated, ownerController.getOwner);

module.exports = router;
