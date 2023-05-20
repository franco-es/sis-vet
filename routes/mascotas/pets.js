import express from "express";
const petRouter = express.Router();
import {PetController} from "../../controllers/pets.js";
import {ConsultaController}  from "../../controllers/consulta.js";
// MIDDLEWARES
import { validate_pet } from"../../middlewares/validateData.js";
import {authenticated as md_auth} from "../../middlewares/authenticated.js";
import { uploadSingle }  from "../../middlewares/multer_single.js";

petRouter.post("/new/", [md_auth.authenticated, validate_pet], new PetController().save());
petRouter.post("/new/consulta", md_auth.authenticated, new ConsultaController().save());
petRouter.get("/single", md_auth.authenticated, new PetController().findOne());
petRouter.get("/all", md_auth.authenticated, new PetController().findAll());
petRouter.put("/update", md_auth.authenticated, new PetController().update());
petRouter.delete("/delete", md_auth.authenticated, new PetController().delete());
petRouter.post("/uploadRay", [md_auth.authenticated, uploadSingle], new PetController().uploadRayX());
petRouter.get("/getRay", md_auth.authenticated, new PetController().getRay());

export {petRouter};
