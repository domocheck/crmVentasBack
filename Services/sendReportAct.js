import Client from "../models/clientModel.js";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import cron from "node-cron";

const fechaActual = new Date();
const diaSemana = fechaActual.getDay();
const lunesSemanaActual = new Date(
  fechaActual.getFullYear(),
  fechaActual.getMonth(),
  fechaActual.getDate() - diaSemana + 1
);

// Clona la fecha de lunesSemanaActual para cada día de la semana
const semana = {
  lunes: new Date(lunesSemanaActual),
  martes: new Date(lunesSemanaActual),
  miercoles: new Date(lunesSemanaActual),
  jueves: new Date(lunesSemanaActual),
  viernes: new Date(lunesSemanaActual),
  sabado: new Date(lunesSemanaActual),
  domingo: new Date(lunesSemanaActual),
  lunesProximo: new Date(lunesSemanaActual),
};

// Ahora, ajusta cada día de la semana según su posición
semana.martes.setDate(semana.martes.getDate() + 1);
semana.miercoles.setDate(semana.miercoles.getDate() + 2);
semana.jueves.setDate(semana.jueves.getDate() + 3);
semana.viernes.setDate(semana.viernes.getDate() + 4);
semana.sabado.setDate(semana.sabado.getDate() + 5);
semana.domingo.setDate(semana.domingo.getDate() + 6);
semana.lunesProximo.setDate(semana.lunesProximo.getDate() + 7);

export const generateReportAct = async (req, res) => {
  const clients = await Client.find();
  let actividadesCumplidas = [];
  let actividadesPendientes = [];

  if (clients) {
    clients.forEach((client) => {
      client.actividades.forEach((actividad) => {
        if (
          (actividad.estadoAct =
            "Pendiente" &&
            new Date(actividad.proximoContacto) >= semana.lunes &&
            new Date(actividad.proximoContacto) < semana.lunesProximo)
        ) {
          actividadesPendientes.push(actividad); // Agregar al array en lugar de sobrescribir
        }

        if (
          (actividad.estadoAct =
            "Cumplida" &&
            new Date(actividad.fechaCumplimiento) >= semana.lunes &&
            new Date(actividad.fechaCumplimiento) < semana.lunesProximo)
        ) {
          actividadesCumplidas.push(actividad); // Agregar al array en lugar de sobrescribir
        }
      });
    });
  }

  const users = await User.find();
  const actividadesPorUsuario = actividadesPorUsuarios(
    actividadesCumplidas,
    actividadesPendientes,
    users
  );

  res.status(200).json({
    message: "todos los clientes obtenidos",
    actividadesPorUsuario,
  });
};

const actividadesPorUsuarios = (
  actividadesCumplidas,
  actividadesPendientes,
  users
) => {
  const actividadesPorUsuario = [];

  users.forEach((usuario) => {
    let actividadesCump = [];
    let actividadesPend = [];
    let actividadesDiarias = [];

    actividadesCumplidas.forEach((actividad) => {
      if (actividad.cumplidor === usuario.name) {
        actividadesCump.push(actividad);
      }
    });

    actividadesPendientes.forEach((actividad) => {
      if (actividad.creador === usuario.name) {
        actividadesPend.push(actividad);
      }
    });

    const keys = Object.keys(semana);

    for (let i = 0; i < keys.length - 1; i++) {
      const day = keys[i];
      const nextDay = keys[i + 1];

      const cumplidas = actividadesCump.filter((actividad) => {
        const fechaActividad = new Date(actividad.fechaCumplimiento);
        return (
          fechaActividad >= semana[day] && fechaActividad < semana[nextDay]
        );
      });

      const pendientes = actividadesPend.filter((actividad) => {
        const fechaActividad = new Date(actividad.proximoContacto);
        return (
          fechaActividad >= semana[day] && fechaActividad < semana[nextDay]
        );
      });

      actividadesDiarias.push({
        fecha: day,
        cumplidas: cumplidas.length,
        pendientes: pendientes.length,
      });
    }

    if (actividadesCump.length > 0 || actividadesPend.length > 0) {
      actividadesPorUsuario.push({
        usuario: usuario.name,
        actividadesDiarias,
        cumplidas: actividadesDiarias.reduce(
          (acc, curr) => acc + curr.cumplidas,
          0
        ),
        cantDeActividades: actividadesDiarias.reduce(
          (acc, curr) => acc + curr.pendientes,
          0
        ),
      });
    }
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "luquez1431@gmail.com",
      pass: "dtqlzwfwevhnjvfb",
    },
  });

  transporter.verify().then(() => {
    console.log("exito");
  });

  async function main() {
    // send mail with defined transport object
    const info = await transporter
      .sendMail({
        from: "luquez1431@gmail.com", // sender address
        to: "luquez1431@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  cron.schedule("0 19 * * 5", () => {
    main(); // Llama a tu función de envío de informe aquí
  });

  return actividadesPorUsuario;
};
