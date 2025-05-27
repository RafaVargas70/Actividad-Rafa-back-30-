import express from "express";
import recuperarContraseñaController from "../controllers/recuperarContraseñaController.js";

const router = express.Router();

router.route("/requestCode").post(recuperarContraseñaController.requestCode);
router.route("/verifyCode").post(recuperarContraseñaController.verifyCode);
router.route("/nuevaContraseña").post(recuperarContraseñaController.nuevaContraseña);

export default router;
