import nodemailer from "nodemailer"; //Enviar correo
import crypto from "crypto"; //Generar codigo aleatorio
import jsonwebtoken from "jsonwebtoken"; // Token
import bcryptjs from "bcryptjs"; //Encriptar

import clientesModel from "../models/Clientes.js";
import { config } from "../config.js";

// Creo un array de funciones
const registrarClientesController = {};

registrarClientesController.registrar = async (req, res) => {
  // Pedir las cosas que voy a guardar
  const {
    nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    dui,
    isVerified,
  } = req.body;

  try {
    //1- Verificar si el cliente ya existe
    const existeCliente = await clientesModel.findOne({ correo });
    if (existeCliente) {
      return res.json({ message: "Cliente ya existe" });
    }

    //2- Encriptar contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    //3- Guardamos al nuevo cliente
    const nuevoCliente = new clientesModel({
      nombre,
      correo,
      contrasenia,
      telefono,
      direccion,
      dui: dui || null,
      isVerified: isVerified || false,
    });

    await nuevoCliente.save();

    // Generar un código aleatorio
    const codigoDeVerificacion = crypto.randomBytes(3).toString("hex");

    // Genero un token para guardar el codigo aleatorio
    const tokenCode = jsonwebtoken.sign(
      //1- ¿Que vamos a guardar?
      { correo, codigoDeVerificacion },
      //2- Secret key
      config.JWT.secret,
      //3- Cuando expira
      { expiresIn: "2h" }
    );

    res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

    //Enviar correo
    //1- Transporter => Quien lo envia
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.emailUser.user_email,
        pass: config.emailUser.user_pass,
      },
    });

    // 2- mailOptions => Quien lo recibe
    const mailOptions = {
      from: config.emailUser.user_email,
      to: correo,
      subject: "Verificacion de cuenta",
      text:
        "Para verificar tu cuenta, utiliza este codigo: " +
        codigoDeVerificacion +
        "expira en dos horas",
    };

    // 3- Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("error" + error);
      res.json({ message: "Correo enviado" + info });
    });
    res.json({ message: "Cliente registrado, porfavor verificar su correo" });
  } catch (error) {
    console.log("error" + error);
    res.json({ message: "Error" + error });
  }
};

///////////////Verificar codigo //////////////

registrarClientesController.verificarCodigoCorreo = async (req, res) => {
  const { verificationCodeRequest } = req.body;

  //1- Obtener el token
  const token = req.cookies.verificationToken;

  //2- Verificar y decodificar el token
  const decoded = jsonwebtoken.verify(token, config.JWT.secret);
  const { correo, codigoDeVerificacion: storedCode } = decoded;

  //3- Comparar los codigos
  if (verificationCodeRequest !== storedCode) {
    return res.json({ mesage: "Codigo no valido." });
  }

  //Si el codigo es igual, entonces, colocamos el campo
  // "isVerified" en true
  const client = await clientsModel.findOne({ correo });
  client.isVerified = true;
  await client.save();

  res.clearCookie("verificationToken");

  res.json({ message: "Correo verificado exitosamente" });
};

export default registrarClientesController;