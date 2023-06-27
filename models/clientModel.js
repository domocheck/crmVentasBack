import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const clientSchema = new mongoose.Schema({
  actividades: {
    type: Array,
    default: [
      {
        _id: uuidv4(),
        actividad: "Pendiente de contactar",
        resultado: "",
        fechaCumplimiento: new Date(),
        fecha: new Date(),
        proximoContacto: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        dato: "Contactar",
        estadoAct: "Pendiente",
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
    fechaPendiente: {
      type: Date,
    },
    fechaEntregado: {
      type: Date,
    },
    estado: {
      type: String,
      default: "Pendiente de solicitar",
    },
  },
  datos: {
    fechaSolicitado: {
      type: Date,
    },
    fechaPendiente: {
      type: Date,
    },
    fechaEntregado: {
      type: Date,
    },
    estado: {
      type: String,
      default: "Pendiente de solicitar",
    },
  },
  imgProd: {
    fechaSolicitado: {
      type: Date,
    },
    fechaPendiente: {
      type: Date,
    },
    fechaEntregado: {
      type: Date,
    },
    estado: {
      type: String,
      default: "Pendiente de solicitar",
    },
  },
  imgStore: {
    fechaSolicitado: {
      type: Date,
    },
    fechaPendiente: {
      type: Date,
    },
    fechaEntregado: {
      type: Date,
    },
    estado: {
      type: String,
      default: "Pendiente de solicitar",
    },
  },
  mapa: {
    fechaSolicitado: {
      type: Date,
    },
    fechaPendiente: {
      type: Date,
    },
    fechaEntregado: {
      type: Date,
    },
    estado: {
      type: String,
      default: "Pendiente de solicitar",
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
