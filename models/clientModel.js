import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
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
  fechaSolicitud: {
    type: Date,
    default: new Date(),
  },
  fechaModificacion: Date,
  fechaContacto: {
    type: Date,
  },
  menu: {
    fecha: {
      type: Date,
    },
    estado: {
      type: String,
      default: "Pendiente",
    },
  },
  datos: {
    fecha: {
      type: Date,
    },
    estado: {
      type: String,
      default: "Pendiente",
    },
  },
  img: {
    fecha: {
      type: Date,
    },
    estado: {
      type: String,
      default: "Pendiente",
    },
  },
  mapa: {
    fecha: {
      type: Date,
    },
    estado: {
      type: String,
      default: "Pendiente",
    },
  },
  despachado: {
    estado: {
      type: String,
      default: "Pendiente",
    },
    fecha: {
      type: Date,
    },
  },
  testeo: {
    type: String,
    default: "No",
  },
  integrado: {
    estado: {
      type: String,
      default: "Pendiente",
    },
    fecha: {
      type: Date,
    },
  },
  link: {
    type: String,
    default: "No",
  },
  portal: {
    type: String,
    default: "No",
  },
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
