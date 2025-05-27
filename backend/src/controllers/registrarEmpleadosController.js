// Importamos el modelo de la base de datos
import empleadosModel from "../models/Empleados.js";
// Importamos librerias
import bcryptjs from "bcryptjs"; // Encriptar
import jsonwebtoken from "jsonwebtoken"; // Token
import { config } from "../config.js";

// Cremos un array de funciones
const regi = {};

registrarEmpleadosController.registrar = async (req, res) => {

  const {
    nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    puesto,
    fecha_contratacion,
    salario,
    dui,
    isVerified,
    issnumber,
  } = req.body;

  try {

    const existeEmpleado = await empleadosModel.findOne({ correo });
    if (existeEmpleado) {
      return res.json({ message: "Empleado ya existe" });
    }


    const passwordHash = await bcryptjs.hash(password, 10);


    const nuevoEmpleado = new empleadosModel({
      nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    puesto,
    fecha_contratacion,
    salario,
    dui,
      isVerified,
      issnumber,
    });

    await nuevoEmpleado.save();


    jsonwebtoken.sign(

      { id: nuevoEmpleado._id },

      config.JWT.secret,

      { expiresIn: config.JWT.expires },

      (error, token) => {
        if (error) console.log("error");

        res.cookie("authToken", token);
        res.json({ message: "Empleado registrado" });
      }
    );
    
  } catch (error) {
    console.log("error" + error);
    res.json({ message: "Error" });
  }
};

export default registrarEmpleadosController;