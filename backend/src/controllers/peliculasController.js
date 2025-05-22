import peliculasModel from '../models/peliculas.js';
import { v2 as cloudinary } from "cloudinary";

import {config} from "../config.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

const peliculasController = {};
 
//get
peliculasController.getpeliculas = async (req, res) => {

  const peliculas = await peliculasModel.find();

  res.json(peliculas);

};
 
//post
peliculasController.crearpeliculas = async (req, res) => {

  const { titulo, descripcion, director, genero, anio, duracion } = req.body;

    let imageURL = "";

if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "public",
      allowed_formats: ["jpg", "png", "jpeg"],
    });
    imageURL = result.secure_url;
  }


  const newpelicula = new peliculasModel({ titulo, descripcion, director, genero, anio, duracion, image: imageURL });

  await newpelicula.save();

  res.json({ message: 'Se guardo la pelicula' });

};
 
//delete
peliculasController.eliminarpeliculas = async (req, res) => {
    const { id } = req.params;
    const eliminaPelicula = await peliculasModel.findByIdAndDelete(id);
    if (!eliminaPelicula) return res.status(404).json({ message: 'No se encontro la pelicula' });
    res.json({ message: 'Se elimino de la pelicula correctamente' });
  };
 
//put
peliculasController.actualizarpeliculas = async (req, res) => {

  const { titulo, descripcion, director, genero, anio, duracion  } = req.body;
  let imageURL = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageURL = result.secure_url;
    }

    const actualizaPelicula = await peliculasModel.findByIdAndUpdate(req.params.id, { titulo, descripcion, director, genero, anio, duracion, image: imageURL }, { new: true });

  if (!actualizaPelicula) return res.status(404).json({ message: 'No se encontro la pelicula' });

  res.json({ message: 'Se actualizo la pelicula' });

};
 
export default peliculasController;