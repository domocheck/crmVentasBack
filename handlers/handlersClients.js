import Client from "../models/clientModel.js";

export const createClient = async (req, res) => {
  try {
    const {
      fechaSolicitud,
      nombreCrm,
      nombreLocal,
      telContacto,
      vendedor,
      observaciones,
      antiguedad,
    } = req.body;

    const cliente = await Client.create({
      fechaSolicitud,
      nombreCrm,
      nombreLocal,
      telContacto,
      vendedor,
      observaciones,
      antiguedad,
    });
    res
      .status(200)
      .json({ message: "cliente creado con exito", data: cliente });
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res
      .status(200)
      .json({ message: "todos los clientes obtenidos", data: clients });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const getClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    res.status(200).json({ message: "cliente obtenido", data: client });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const updateClient = async (req, res) => {
  const { id, datoClient, estado, estadoClient, obs } = req.body;
  let updateObj = {};
  try {
    if (datoClient) {
      updateObj[`${datoClient}.estado`] = estadoClient;
      updateObj[`${datoClient}.fecha${estadoClient}`] = new Date();
      const complete = await Client.findByIdAndUpdate(id, updateObj);
      res.status(200).json({ message: "complete" });
    } else if (obs) {
      const update = await Client.findByIdAndUpdate(id, {
        $push: { observaciones: obs },
      });
      res.status(200).json({ message: "complete" });
    } else {
      const client = await Client.findById(id);
      if (client.fechaContacto) {
        if (estado === "Despachado" || estado === "Integrado") {
          const update = await Client.findByIdAndUpdate(id, {
            estado,
            ["fecha" + estado]: new Date(),
            fechaModificacion: new Date(),
          });
        } else {
          const update = await Client.findByIdAndUpdate(id, {
            estado,
            fechaModificacion: new Date(),
          });
        }
      } else {
        // La propiedad fechaContacto no existe en el cliente, agregar fechaContacto
        const update = await Client.findByIdAndUpdate(id, {
          estado,
          fechaContacto: new Date(),
        });
      }
      res.status(200).json({ message: "todo actualizado con exito" });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const updateContacto = async (req, res) => {
  const { idClient, nombreNewContacto, telNewContacto } = req.body;
  try {
    const client = await Client.findByIdAndUpdate(idClient, {
      $push: { contactos: { nombre: nombreNewContacto, tel: telNewContacto } },
    });
    res.status(200).json({ message: "complete" });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const updateUsersApi = async (req, res) => {
  const { usuarioApi, claveApi, linkTienda, idClient } = req.body;

  try {
    const cliente = await Client.findByIdAndUpdate(
      idClient,
      {
        $set: {
          "usuarios.usuarioApi": usuarioApi,
          "usuarios.claveApi": claveApi,
          "usuarios.linkTienda": linkTienda,
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Usuario actualizado con éxito", cliente });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

export const updateUsersDatos = async (req, res) => {
  const {
    usuarioAdmin,
    claveAdmin,
    usuarioLocal,
    claveLocal,
    usuarioOperador,
    claveOperador,
    idClient,
  } = req.body;
  try {
    const cliente = await Client.findByIdAndUpdate(
      idClient,
      {
        $set: {
          "usuarios.usuarioAdmin": usuarioAdmin,
          "usuarios.claveAdmin": claveAdmin,
          "usuarios.usuarioLocal": usuarioLocal,
          "usuarios.claveLocal": claveLocal,
          "usuarios.usuarioOperador": usuarioOperador,
          "usuarios.claveOperador": claveOperador,
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Usuario actualizado con éxito", cliente });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

export const updateDatosDespachados = async (req, res) => {
  const { idClient, tipoDato, estadoDato, comentarioDato } = req.body;
  try {
    const updateQuery = {
      $set: {
        [`${tipoDato}.estado`]: estadoDato,
        [`${tipoDato}.comentario`]: comentarioDato,
      },
    };
    const cliente = await Client.findByIdAndUpdate(idClient, updateQuery);
    res
      .status(200)
      .json({ message: "Datos despachados actualizados correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error al actualizar los datos despachados del cliente",
        error,
      });
  }
};
