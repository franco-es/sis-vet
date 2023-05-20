const express = require("express");
const cirugiaRouter = express.Router();
// const petController = require("../../controllers/pets");
const cirugiaController = require("../../controllers/cirugia");
const { validate_cirugia } = require("../../middlewares/validateData").default;
const md_auth = require("../../middlewares/authenticated");

cirugiaRouter.post(
  "/new/",
  [md_auth.authenticated, validate_cirugia],
  cirugiaController.save
);
cirugiaRouter.put("/update", md_auth.authenticated, cirugiaController.update);

cirugiaRouter.get("/getcirugia", md_auth.authenticated, cirugiaController.getcirugia);
cirugiaRouter.delete("/delete", md_auth.authenticated, cirugiaController.delete);

export {cirugiaRouter};
