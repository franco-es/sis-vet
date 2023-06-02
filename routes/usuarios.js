import { Router } from "express";
const userRouter = Router();
import { VeteController } from "./../controllers/veterinaria.js";
import { create, login, update } from "./../middlewares/validateData.js";
import { authenticated } from "./../middlewares/authenticated.js";
import _default from "../middlewares/checkEmail.js";
const { checkEmailUpdate, checkEmail } = _default;

userRouter.post("/new", [create, checkEmail], new VeteController().save);
userRouter.post("/login", login, new VeteController().login);
userRouter.put(
  "/update",
  [authenticated, update, checkEmailUpdate],
  new VeteController().update
);
userRouter.post("/uploadAvatar", authenticated, new VeteController().uploadImage);
// userRouter.delete('/delete/:id', userController.deleteVet);
userRouter.get('/admin/all', authenticated, new VeteController().getAllVeterinarias);

export {userRouter};