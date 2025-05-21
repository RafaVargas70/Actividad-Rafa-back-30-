import { Schema } from "mongoose";

const peliculasSchema = new Schema(

    {
    titulo: {
      type: String,
      require: true,
    },
    
    descripcion: {
      type: String,
      require: true,
    },
    
    director:{
      type: String,
      require: true,
    },

    genero: {
      type: String,
      require: true,
    },

    anio: {
      type: Number,
      require: true,
    },

    duracion: {
        type: Number,
        require: true,
      },

      imagen: {
        type: string,
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


export default model("peliculas", peliculasSchema);
