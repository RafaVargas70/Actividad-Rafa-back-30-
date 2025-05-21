import clientesModel from '../models/Clientes.js';

const clientesController = {};
 
//get
clientesController.getclientes = async (req, res) => {

  const clientes = await clientesModel.find();

  res.json(clientes);

};
 
//post
clientesController.crearclientes = async (req, res) => {

  const { nombre, correo, contrasenia, telefono, direccion, DUI } = req.body;

  const newcliente = new clientesModel({ nombre, correo, contrasenia, telefono, direccion, DUI });

  await newcliente.save();

  res.json({ message: 'Cliente Guardado' });

};
 
//delete
clientesController.eliminarclientes = async (req, res) => {

  const eliminado = await clientesModel.findByIdAndDelete(req.params.id);

  if (!eliminado) return res.status(404).json({ message: 'No se encontro el cliente' });

  res.json({ message: 'Se elimino el cliente' });

};
 
//put
clientesController.actualizarclientes = async (req, res) => {

  const { nombre, correo, contrasenia, telefono, direccion, DUI } = req.body;

  const updated = await clientesModel.findByIdAndUpdate(

    req.params.id,

    { nombre, correo, contrasenia, telefono, direccion, DUI },

    { new: true }

  );

  if (!updated) return res.status(404).json({ message: 'No se encontro el cliente' });

  res.json({ message: 'Se actualizo el cliente' });

};
 
export default clientesController;
 