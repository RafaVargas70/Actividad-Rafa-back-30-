import empleadosModel from '../models/Empleados.js';

const empleadosController = {};
 
//get
empleadosController.getempleados = async (req, res) => {

  const empleados = await empleadosModel.find();

  res.json(empleados);

};
 
//post
empleadosController.crearempleados = async (req, res) => {

  const { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI } = req.body;

  const newempleado = new empleadosModel({ nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI });

  await newempleado.save();

  res.json({ message: 'Se guardo el empleado' });

};
 
//delete
empleadosController.eliminarempleados = async (req, res) => {

  const eliminado = await empleadosModel.findByIdAndDelete(req.params.id);

  if (!eliminado) return res.status(404).json({ message: 'No se encontro el empleado' });

  res.json({ message: 'Se elimino el empleado' });

};
 
//put
empleadosController.actualizarempleados = async (req, res) => {

  const { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI } = req.body;

  const updated = await empleadosModel.findByIdAndUpdate(

    req.params.id,

    { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI },

    { new: true }

  );

  if (!updated) return res.status(404).json({ message: 'No se encontro el empleado' });

  res.json({ message: 'Se actualizo el empleado' });

};
 
export default empleadosController;