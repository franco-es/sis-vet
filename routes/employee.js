import { Router } from "express";
const employeeRouter = Router();
import { EmployeeController } from "./../controllers/veterinario.js";
import { validate_employee } from "./../middlewares/validateData.js";
import { authenticated } from "./../middlewares/authenticated.js";

employeeRouter.post(
  "/new",
  [authenticated, validate_employee],
  new EmployeeController().save
);
employeeRouter.get("/get", [authenticated],  new EmployeeController().getVets);
employeeRouter.put(
  "/update",
  [authenticated, validate_employee],
  new EmployeeController().update
);
employeeRouter.post("/remove", authenticated, new EmployeeController().delete);
// employeeRouter.delete('/delete/:id', userController.deleteVet);
// employeeRouter.get('/admin/all', userController.getAll);

export {employeeRouter};
