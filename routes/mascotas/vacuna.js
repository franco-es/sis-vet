import { Router } from "express";
const vacunaRouter = Router();
import { VacunaController } from "../../controllers/vacuna.js";
import { validate_vacuna } from "../../middlewares/validateData.js";

import { authenticated } from "../../middlewares/authenticated.js";

vacunaRouter.post("/new/", [authenticated, validate_vacuna], new VacunaController().save);
vacunaRouter.put("/update", authenticated, new VacunaController().update);

vacunaRouter.get("/getvacunas", authenticated, new VacunaController.getvacunas);
vacunaRouter.delete("/delete", authenticated, new VacunaController().delete);
export {vacunaRouter};
