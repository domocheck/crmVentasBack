import Client from "../models/clientModel.js";
import Prospect from "../models/prospectModel.js";

export const updateActividad = async (req, res) => {
  try {
    const {
      id,
      actividadId,
      estado,
      resultado,
      fechaCumplimiento,
      userName,
      prospect,
      actividad,
    } = req.body;

    let cliente;

    if (prospect) {
      cliente = await Prospect.findOneAndUpdate(
        { _id: id, "actividades._id": actividadId },
        {
          $set: {
            "actividades.$.estadoAct": estado,
            "actividades.$.resultado": resultado,
            "actividades.$.fechaCumplimiento": fechaCumplimiento || new Date(),
            "actividades.$.cumplidor": userName || "",
            "actividades.$.actividad": actividad || "",
          },
        }
      );
    } else {
      cliente = await Client.findOneAndUpdate(
        { _id: id, "actividades._id": actividadId },
        {
          $set: {
            "actividades.$.estadoAct": estado,
            "actividades.$.resultado": resultado,
            "actividades.$.fechaCumplimiento": fechaCumplimiento || new Date(),
            "actividades.$.cumplidor": userName || "",
          },
        }
      );
    }

    // Buscar el cliente por su id y actualizar la actividad

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    if (!prospect) {
      await Client.findByIdAndUpdate(id, {
        $set: {
          "modificacion.user": userName,
          "modificacion.fechaModificacion": new Date(),
        },
      });
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
    const { id, newActOk, newActPen, userName, prospect } = req.body;

    if (prospect) {
      if (newActOk) {
        await Prospect.findByIdAndUpdate(id, {
          $push: { actividades: newActOk },
        });
      }
      if (newActPen) {
        await Prospect.findByIdAndUpdate(id, {
          $push: { actividades: newActPen },
        });
      }
    } else {
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
      await Client.findByIdAndUpdate(id, {
        $set: {
          "modificacion.user": userName,
          "modificacion.fechaModificacion": new Date(),
        },
      });
    }
    res.status(200).json({ message: "complete" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la actividad", error });
  }
};
