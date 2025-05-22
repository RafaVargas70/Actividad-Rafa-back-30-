import express from "express";
import empleadosController from "../controllers/empleadosController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(customersController.getempleados)
  .post(customersController.crearempleados);

router
  .route("/:id")
  .put(empleadosController.actualizarempleados)
  .delete(empleadosController.eliminarempleados);

export default router;