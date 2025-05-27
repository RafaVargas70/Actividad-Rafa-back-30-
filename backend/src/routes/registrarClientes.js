import express from "express";
import registrarClientesController from "../controllers/registrarClientesController.js";
const router = express.Router();

router.route("/").post(registrarClientesController.register);
router.route("/verificarCodigoCorreo").post(registrarClientesController.verificarCodigoCorreo);

export default router;