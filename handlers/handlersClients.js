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
  const [idClient, nombreNewContacto, telNewContacto] = req.body;
  try {
    const client = await Client.findByIdAndUpdate(idClient, {
      contatos: [
        {
          nombre: nombreNewContacto,
          tel: telNewContacto,
        },
      ],
    });
    res.status(200).json({ message: "complete" });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
