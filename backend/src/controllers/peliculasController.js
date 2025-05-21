import peliculasModel from '../models/peliculas.js';

const peliculasController = {};
 
//get
peliculasController.getpeliculas = async (req, res) => {

  const peliculas = await peliculasModel.find();

  res.json(peliculas);

};
 
//post
peliculasController.crearpeliculas = async (req, res) => {

  const { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI } = req.body;

  const newpelicula = new peliculasModel({ nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI });

  await newpelicula.save();

  res.json({ message: 'Se guardo la pelicula' });

};
 
//delete
peliculasController.eliminarpeliculas = async (req, res) => {
    const { id } = req.params;
    const pelicula = await peliculasModel.findByIdAndDelete(id);
    if (!pelicula) return res.status(404).json({ message: 'No se encontro la pelicula' });
    // Borrar de Cloudinary si tiene public_id guardado (opcional)
    if (pelicula.imagen) {
      const segments = pelicula.imagen.split('/');
      const filename = segments[segments.length - 1].split('.')[0];
      await cloudinary.uploader.destroy(`peliculas/${filename}`);
    }
    res.json({ message: 'Se elimino de la pelicula correctamente' });
  };
 
//put
peliculasController.actualizarpeliculas = async (req, res) => {

  const { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI } = req.body;

  const updated = await peliculasModel.findByIdAndUpdate(

    req.params.id,

    { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI },

    { new: true }

  );

  if (!updated) return res.status(404).json({ message: 'No se encontro la pelicula' });

  res.json({ message: 'Se actualizo la pelicula' });

};
 
export default peliculasController;