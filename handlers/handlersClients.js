import Client from "../models/clientModel.js";

export const createClient = async (req, res) => {
  try {
    const { fechaSolicitud, nombreCrm, nombreLocal, telContacto, vendedor } =
      req.body;
    const cliente = await Client.create({
      fechaSolicitud,
      nombreCrm,
      nombreLocal,
      telContacto,
      vendedor,
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
