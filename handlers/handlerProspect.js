import Prospect from "../models/prospectModel.js";

export const createProspect = async (req, res) => {
  try {
    const { nombreCrm, nombreLocal, telContacto, observaciones } = req.body;

    const prospect = await Prospect.create({
      nombreCrm,
      nombreLocal,
      telContacto,
      observaciones,
    });
    res
      .status(200)
      .json({ message: "prospecto creado con exito", data: prospect });
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getProspects = async (req, res) => {
  try {
    const prospects = await Prospect.find();
    res
      .status(200)
      .json({ message: "todos los prospectos obtenidos", data: prospects });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const updateProspect = async (req, res) => {
  try {
    const { id, estado } = req.body;
    const prospect = await Prospect.findByIdAndUpdate(id, {
      $set: { estado: estado },
    });
    res.status(200).json({ message: "prospecto actualizado", data: prospect });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
