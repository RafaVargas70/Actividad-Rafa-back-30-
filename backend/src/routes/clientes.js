import express from "express";
import clientesController from "../controllers/clientesController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(customersController.getclientes)
  .post(customersController.crearclientes);

router
  .route("/:id")
  .put(clientesController.actualizarClientes)
  .delete(clientesController.eliminarclientes);

export default router;