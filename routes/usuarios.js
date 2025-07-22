import { Router } from "express";
const userRouter = Router();
import { VeteController } from "./../controllers/veterinaria.js";
import { create, login, update } from "./../middlewares/validateData.js";
import { authenticated } from "./../middlewares/authenticated.js";
import { checkEmail, checkEmailUpdate } from "../middlewares/checkEmail.js";


var controller = new VeteController();



userRouter.post("/new", [create, checkEmail], controller.save);
userRouter.get("/login", login, controller.login);
userRouter.put("/update", [authenticated, update, checkEmailUpdate], controller.update);
userRouter.post("/uploadAvatar", authenticated, controller.uploadImage);
// userRouter.delete('/delete/:id', userController.deleteVet);
userRouter.get('/admin/all', authenticated ,controller.getAll);

export {userRouter};