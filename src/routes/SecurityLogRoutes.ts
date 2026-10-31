import { SecurityLogController } from "../controller/SecurityLogController";
import { Router } from "express";
import { createSecurityLogSchema } from "../validators/SecurityLogValidator";
import { ValidateSchema } from "../middlewares/ValidateSchema";

const router = Router();
const securityLogController = new SecurityLogController();


router.post("/securitys-logs", ValidateSchema(createSecurityLogSchema), (req, res) => securityLogController.create(req, res));
router.get("/securitys-logs", (req, res) => securityLogController.list(req, res));


export default router;