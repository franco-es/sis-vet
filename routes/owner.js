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
router.get("/", md_auth.authenticated, ownerController.getByVeteId);
router.get("/:id", md_auth.authenticated, ownerController.getOwner);
router.put("/update/:id", md_auth.authenticated, ownerController.getOwner);

module.exports = router;
