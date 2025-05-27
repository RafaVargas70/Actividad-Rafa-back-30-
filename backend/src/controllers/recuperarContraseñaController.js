import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import clientesModel from "../models/Clientes.js";
import empleadosModel from "../models/Empleados.js";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mail.js";
import { config } from "../config.js";
import Empleados from "../models/Empleados.js";

const recuperarContraseñaController = {};

recuperarContraseñaController.requestCode = async (req, res) => {
  const { email } = req.body;

  try {
    let userFound;
    let userType;

    userFound = await clientesModel.findOne({ email });
    if (userFound) {
      userType = "cliente";
    } else {
      userFound = await Empleados.findOne({ email });
      if (userFound) {
        userType = "empleado";
      }
    }

    if (!userFound) {
      return res.json({ message: "Usuario no encontrado" });
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    const token = jsonwebtoken.sign(

        { email, code, userType, verified: false },

      config.JWT.secret,

      { expiresIn: "20m" }
    );

    res.cookie("tokenCodigoRecuperacion", token, { maxAge: 20 * 60 * 1000 });

    await sendEmail(
      email,
      " Codigo de recuperacion de contraseña",
      `Tu codigo de verificacion es: ${code}`,
      HTMLRecoveryEmail(code)
    );

    res.json({ message: "Codigo de verificacion enviado" });
  } catch (error) {
    console.log("error" + error);
  }
};

//VERIFICAR CODIGO
recuperarContraseñaController.verifyCode = async (req, res) => {
  const { code } = req.body;

  try {

    const token = req.cookies.tokenCodigoRecuperacion;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);


    if (decoded.code !== code) {
      return res.json({ message: "Codigo no valido" });
    }

    const nuevoToken = jsonwebtoken.sign(

        {
        email: decoded.email,
        code: decoded.code,
        userType: decoded.userType,
        verified: true,
      },
      config.JWT.secret,

      { expiresIn: "20m" }
    );
    res.cookie("tokenCodigoRecuperacion", nuevoToken, { maxAge: 20 * 60 * 1000 });

    res.json({ message: "Codigo de verificacion exitoso" });
  } catch (error) {
    console.log("error" + error);
  }
};

recuperarContraseñaController.nuevaContraseña = async (req, res) => {
  const { nuevaContraseña } = req.body;

  try {
    const token = req.cookies.tokenCodigoRecuperacion;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (!decoded.verified) {
      return res.json({ message: "Codigo no verificado" });
    }

    const { email, userType } = decoded;

    const hashedPassword = await bcryptjs.hash(nuevaContraseña, 10);

    let updatedUser;

    if (userType === "cliente") {
      updatedUser = await clientes.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    } else if (userType === "empleado") {
      updatedUser = await empleadosModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    }

    res.clearCookie("tokenCodigoRecuperacion");

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.log("error" + error);
  }
};

export default recuperarContraseñaController;
