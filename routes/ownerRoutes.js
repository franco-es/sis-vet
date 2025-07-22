import { Router } from "express";
const ownerRouter = Router();
import { OwnerController } from "../controllers/owner.js";
import { validate_owner } from "../middlewares/validateData.js";
import { authenticated } from "../middlewares/authenticated.js";

const controller = new OwnerController();

ownerRouter.post("/new", [authenticated, validate_owner], controller.save );
ownerRouter.put("/update", [authenticated, validate_owner], controller.update );
ownerRouter.get("/getOwner/:id", authenticated, controller.getOwner);

export { ownerRouter };
