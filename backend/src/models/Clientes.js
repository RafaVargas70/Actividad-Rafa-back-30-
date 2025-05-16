import { Schema, model } from "mongoose";

const clientesSchema = new Schema(

    {
    name: {
      type: String,
      require: true,
    },
    
    correo: {
      type: String,
      require: true,
    },
    
    name: {
      type: String,
      require: true,
    },
    contrasenia:{
      type: String,
      require: true,
    },

    telefono: {
      type: String,
      require: true,
    },

    direccion: {
      type: String,
      require: true,
    },

    DUI: {
      type: String,
      require: true,
    },
    isVerified: {
      type: Boolean,
    },


    },
    {
    timestamps: true,
    strict: false,
  }

);


export default model("clientes", clientesSchema);
