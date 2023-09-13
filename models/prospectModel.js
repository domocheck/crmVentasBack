import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const prospectSchema = new mongoose.Schema({
  actividades: {
    type: Array,
    default: [
      {
        _id: uuidv4(),
        actividad: "Pendiente de contactar",
        resultado: "",
        fechaCumplimiento: new Date(),
        fecha: new Date(),
        proximoContacto: new Date(),
        dato: "Contactar prospecto",
        estadoAct: "Pendiente",
        cumplidor: "",
        creador: "Micaela",
      },
    ],
  },
  estado: {
    type: String,
    default: "Pendiente",
  },
  nombreLocal: {
    type: String,
    required: true,
  },
  nombreCrm: {
    type: String,
    required: true,
  },
  telContacto: {
    type: Number,
    required: true,
  },
  fechaContacto: Date,
});

const Prospect = mongoose.model("checkProspect", prospectSchema);

export default Prospect;
