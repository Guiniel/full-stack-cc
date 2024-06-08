import { Schema, model, models } from "mongoose";

const SongSchema = new Schema(
  {
    name:{
      type: String,
      required: [true, "El nombre de la cancion es requerida "],
      unique: true,
      trim: true,
      maxlength: [40, "no puede ser mayor a 40 caracteres"],
    },
    duration: {
      type: Number,
      required: [true, "La duracion es requerida "],
      required: true,
      trim: true,
    },
    artist: {
      type: String,
      required: [true, "El nombre del artista es requerida "],
      required: true,
      trim: true,
      maxlength: [80, "El nombre del artista no puede ser mayor a 80 caracteres"],
    },
    genre: {
      type: String,
      required: [true, "El genero es requerido "],
      required: true,
      trim: true,
      maxlength: [20, "El nombre del genero no puede ser mayor a 20 caracteres"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Song || model("Song", SongSchema);
