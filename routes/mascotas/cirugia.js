import express from "express";
const cirugiaRouter = express.Router();
import { CirugiaController } from"../../controllers/cirugia.js";
import { validate_cirugia } from"../../middlewares/validateData.js";
import { authenticated } from"../../middlewares/authenticated.js";

cirugiaRouter.post("/new", [authenticated, validate_cirugia], new CirugiaController().save);
cirugiaRouter.put("/update", authenticated, new CirugiaController().update);

cirugiaRouter.get("/getcirugia", authenticated, new CirugiaController().getcirugia);
cirugiaRouter.delete("/delete", authenticated, new CirugiaController().delete);

export {cirugiaRouter};
