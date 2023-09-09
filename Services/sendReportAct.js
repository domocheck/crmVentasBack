import Client from "../models/clientModel.js";
import User from "../models/userModel.js";

export const generateReportAct = async (req, res) => {
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

  // Ajusta cada día de la semana según su posición
  semana.martes.setDate(semana.martes.getDate() + 1);
  semana.miercoles.setDate(semana.miercoles.getDate() + 2);
  semana.jueves.setDate(semana.jueves.getDate() + 3);
  semana.viernes.setDate(semana.viernes.getDate() + 4);
  semana.sabado.setDate(semana.sabado.getDate() + 5);
  semana.domingo.setDate(semana.domingo.getDate() + 6);
  semana.lunesProximo.setDate(semana.lunesProximo.getDate() + 7);

  // Obtén los datos de la base de datos
  const clients = await Client.find();
  let actividadesCumplidas = [];
  let actividadesPendientes = [];

  if (clients) {
    clients.forEach((client) => {
      client.actividades.forEach((actividad) => {
        if (
          actividad.estadoAct === "Pendiente" &&
          new Date(actividad.proximoContacto) >= semana.lunes &&
          new Date(actividad.proximoContacto) < semana.lunesProximo
        ) {
          actividadesPendientes.push(actividad);
        }

        if (
          actividad.estadoAct === "Cumplida" &&
          new Date(actividad.fechaCumplimiento) >= semana.lunes &&
          new Date(actividad.fechaCumplimiento) < semana.lunesProximo
        ) {
          actividadesCumplidas.push(actividad);
        }
      });
    });
  }

  const users = await User.find();
  const actividadesPorUsuario = actividadesPorUsuarios(
    actividadesCumplidas,
    actividadesPendientes,
    users,
    semana
  );

  res.status(200).json({
    message: "todos los clientes obtenidos",
    data: actividadesPorUsuario,
  });
};

const actividadesPorUsuarios = (
  actividadesCumplidas,
  actividadesPendientes,
  users,
  semana
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

  return actividadesPorUsuario;
};
