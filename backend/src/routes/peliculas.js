import express from "express";
import peliculasController from "../controllers/peliculasController.js";
import multer from "multer";

const router = express.Router();

//configurar una carpeta en local que guarde el registro de las imágenes subidas
const upload = multer({dest: "public/"})

router.route("/")
    .get(peliculasController.getpeliculas)
    .post(upload.single("image"), peliculasController.crearpeliculas);


    router.route("/:id")
    .put(upload.single("image"), peliculasController.actualizarpeliculas)
    .delete(peliculasController.eliminarpeliculas);

export default router;