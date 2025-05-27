import nodemailer from "nodemailer";
import { config } from "../config.js";

// Configurar el transporter => ¿quien lo envia?
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.emailUser.user_email,
    pass: config.emailUser.user_pass,
  },
});

// ¿A quien le voy a mandar el correo?
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"soporte EPA" <ricardo.mayorga.ck@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (error) {
    console.log("error" + error);
  }
};