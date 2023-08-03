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
        proximoContacto: new Date(),
        dato: "Contactar",
        estadoAct: "Pendiente",
        cumplidor: "",
        creador: "Micaela",
        role: "comercial",
      },
    ],
  },
  contactos: {
    type: Array,
    default: [],
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
  modificacion: Object,
  fechaContacto: Date,
  fechaDespachado: Date,
  fechaIntegrado: Date,
  fechaTesteo: Date,
  fechaConfiguracion: Date,
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
  "JPG a soporte": {
    estado: {
      type: String,
      default: "Pendiente",
    },
    comentario: {
      type: String,
    },
  },
  JPG: {
    estado: {
      type: String,
      default: "Pendiente",
    },
    comentario: {
      type: String,
    },
  },
  "JPG a soporte": {
    estado: {
      type: String,
      default: "Pendiente",
    },
    comentario: {
      type: String,
    },
  },
  "MP Conectado": {
    estado: {
      type: String,
      default: "Pendiente",
    },
    comentario: {
      type: String,
    },
  },
  "Link IG": {
    estado: {
      type: String,
      default: "Pendiente",
    },
    comentario: {
      type: String,
    },
  },
  "Link Whatsapp": {
    estado: {
      type: String,
      default: "Pendiente",
    },
    comentario: {
      type: String,
    },
  },
  Historias: {
    estado: {
      type: String,
      default: "Pendiente",
    },
    comentario: {
      type: String,
    },
  },
  Promos: {
    estado: {
      type: String,
      default: "Pendiente",
    },
    comentario: {
      type: String,
    },
  },
  "Campañas email": {
    estado: {
      type: String,
      default: "Pendiente",
    },
    comentario: {
      type: String,
    },
  },
  Playstore: {
    estado: {
      type: String,
      default: "Pendiente",
    },
    comentario: {
      type: String,
    },
  },
  usuarios: {
    type: Object,
    default: {
      usuarioApi: String,
      claveApi: String,
      linkTienda: String,
      usuarioAdmin: String,
      claveAdmin: String,
      usuarioLocal: String,
      claveLocal: String,
      usuarioOperador: String,
      claveOperador: String,
    },
  },
  permisos: {
    type: Array,
    default: ["Admin", "Integrador"],
  },
  observaciones: Array,
  ventas: Number,
  redes: {
    instagram: String,
    seguidores: Number,
    logistica: String,
  },
});

const Client = mongoose.model("checkDelivery", clientSchema);

export default Client;
