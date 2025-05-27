import express from "express";
import registrarEmpleadosController from "../controllers/registrarEmpleadosController.js";
const router = express.Router();

router.route("/").post(registrarEmpleadosController.registrar);

export default router;
