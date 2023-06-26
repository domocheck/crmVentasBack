import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const clientSchema = new mongoose.Schema({
  actividades: {
    type: Array,
    default: [
      {
        _id: uuidv4(),
        actividad: "Pendiente de contactar",
        fecha: new Date(),
        proximoContacto: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        dato: "Contactar",
        estado: "Pendiente",
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
  vendedor: {
    type: String,
    required: true,
  },
  antiguedad: String,
  fechaSolicitud: {
    type: Date,
    default: new Date(),
  },
  fechaModificacion: Date,
  fechaContacto: Date,
  fechaDespachado: Date,
  fechaIntegrado: Date,

  menu: {
    fechaSolicitado: {
      type: Date,
    },
    fechaEntregado: {
      type: Date,
    },
    estado: {
      type: String,
      default: "Pendiente",
    },
  },
  datos: {
    fechaSolicitado: {
      type: Date,
    },
    fechaEntregado: {
      type: Date,
    },
    estado: {
      type: String,
      default: "Pendiente",
    },
  },
  imgProd: {
    fechaSolicitado: {
      type: Date,
    },
    fechaEntregado: {
      type: Date,
    },
    estado: {
      type: String,
      default: "Pendiente",
    },
  },
  imgStore: {
    fechaSolicitado: {
      type: Date,
    },
    fechaEntregado: {
      type: Date,
    },
    estado: {
      type: String,
      default: "Pendiente",
    },
  },
  mapa: {
    fechaSolicitado: {
      type: Date,
    },
    fechaEntregado: {
      type: Date,
    },
    estado: {
      type: String,
      default: "Pendiente",
    },
  },
  testeo: {
    type: String,
    default: "No",
  },
  link: {
    type: String,
    default: "No",
  },
  portal: {
    type: String,
    default: "No",
  },
  observaciones: Array,
});

const Client = mongoose.model("checkDelivery", clientSchema);

export default Client;
