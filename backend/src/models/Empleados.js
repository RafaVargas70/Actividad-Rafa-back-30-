import { Schema } from "mongoose";

const empleadosSchema = new Schema(

    {
    name: {
      type: String,
      require: true,
    },
    
    correo: {
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

    puesto: {
        type: String,
        require: true,
      },

      fecha_contratacion: {
        type: Date,
        require: true,
      },

      salario: {
        type: Number,
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


export default model("empleados", empleadosSchema);
