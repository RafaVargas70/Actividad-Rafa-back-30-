import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import clientesModel from "../models/Clientes.js";
import empleadosModel from "../models/Empleados.js";
import { config } from "../config.js";


const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

      try {
    let userFound;
    let userType;


    if (email === config.admin.email && password === config.admin.password) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {

        userFound = await empleadosModel.findOne({ email });
      userType = "empleado";

      if (!userFound) {
        userFound = await clientesModel.findOne({ email });
        userType = "cliente";
      }
    }

    if (!userFound) {
      return res.json({ message: "Usuario no encontrado" });
    }

    if (userType !== "admin") {
      const isMatch = bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        res.json({ message: "Contraseña no es valida" });
      }
    }

    jsonwebtoken.sign(

        { id: userFound._id, userType },

        config.JWT.secret,

        { expiresIn: config.JWT.expires },

        (error, token) => {
        if (error) console.log("error" + error);
        res.cookie("authToken", token);
        res.json({ message: "¡Exitoso inicio de sesion!" });
      }
    );
  } catch (error) {
    console.log("error" + error);
  }


};
export default loginController;