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
  fechaContacto: Date,
  fechaDespachado: Date,
  fechaIntegrado: Date,

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
  observacioones: Array,
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
