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
    },
    fecha: {
      type: Date,
    },
  },
  testeo: {
    type: String,
  },
  finalizado: {
    type: String,
  },
  link: {
    type: String,
  },
  portal: {
    type: String,
  },
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
