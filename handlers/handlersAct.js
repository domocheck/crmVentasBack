import Client from "../models/clientModel.js";

export const updateActividad = async (req, res) => {
  try {
    const { id, actividadId, estado, resultado, fechaCumplimiento } = req.body;

    // Buscar el cliente por su id y actualizar la actividad
    const cliente = await Client.findOneAndUpdate(
      { _id: id, "actividades._id": actividadId },
      {
        $set: {
          "actividades.$.estadoAct": estado,
          "actividades.$.resultado": resultado,
          "actividades.$.fechaCumplimiento": fechaCumplimiento || new Date(),
        },
      }
    );

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.status(200).json({ message: "Actividad actualizada con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la actividad", error });
  }
};

export const createAct = async (req, res) => {
  try {
    const { id, newActOk, newActPen } = req.body;

    if (newActOk) {
      await Client.findByIdAndUpdate(id, {
        $push: { actividades: newActOk },
      });
    }
    if (newActPen) {
      await Client.findByIdAndUpdate(id, {
        $push: { actividades: newActPen },
      });
    }
    res.status(200).json({ message: "complete" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la actividad", error });
  }
};
