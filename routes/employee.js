import { Router } from "express";
const employeeRouter = Router();
import { EmployeeController } from "./../controllers/veterinario.js";
import { validate_employee } from "./../middlewares/validateData.js";
import { authenticated } from "./../middlewares/authenticated.js";

var controller = new EmployeeController();

employeeRouter.post("/new", authenticated, controller.save);
employeeRouter.get("/get", [authenticated],  controller.getVets);
employeeRouter.put("/update", [authenticated, validate_employee], controller.update);
employeeRouter.delete("/remove", authenticated, controller.delete);
// employeeRouter.delete('/delete/:id', userController.deleteVet);
// employeeRouter.get('/admin/all', userController.getAll);

export {employeeRouter};
