import { Router } from "express";
const ownerRouter = Router();
import { OwnerController } from "./../controllers/owner.js";
import { validate_owner } from "./../middlewares/validateData.js";
import { authenticated } from "./../middlewares/authenticated.js";

ownerRouter.post(
  "/new",
  [authenticated, validate_owner],
  new OwnerController.save()
);
ownerRouter.put(
  "/update",
  [authenticated, validate_owner],
  new OwnerController.save()
);
ownerRouter.get("/getOwner", authenticated, new OwnerController.getOwner());

export { ownerRouter };
