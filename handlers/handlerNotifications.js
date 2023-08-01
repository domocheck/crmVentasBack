import Notifications from "./../models/notifiModel.js";

export const createNotifications = async (req, res) => {
  try {
    const { date, description, idUsers, tipo } = req.body;
    const notification = await Notifications.create({
      createAt: date,
      description,
      users: idUsers.map((user) => {
        return {
          idUser: user,
          statusNotification: "Pendiente",
        };
      }),
      tipo,
    });

    res
      .status(200)
      .json({ message: "notificacion creada", data: notification });
  } catch (error) {
    res.status(404).send.json({ error: error });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const { idUser } = req.params;
    const notifications = await Notifications.find({
      users: {
        $elemMatch: { idUser },
      },
    });

    if (notifications.length === 0) {
      res.status(200).json({ message: "no hay notificaciones" });
    }
    res
      .status(200)
      .json({ message: "notificaciones obtenidas", data: notifications });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const chanceStatusNotification = async (req, res) => {
  try {
    const { idNotification, idNotificationUser } = req.body;
    const notification = await Notifications.findById(idNotification);

    // Buscamos el índice del usuario en el array 'users' basado en el id del usuario
    const userIndex = notification.users.findIndex(
      (user) => user._id.toString() === idNotificationUser
    );

    // Si encontramos el usuario en el array 'users', actualizamos su estado
    if (userIndex !== -1) {
      notification.users[userIndex].statusNotification = "Leida";
      await notification.save(); // ¡No olvides el await aquí para asegurarte de que la actualización se complete correctamente!
      res
        .status(200)
        .json({ message: "Estado de notificación actualizado a 'Leida'." });
    } else {
      res
        .status(404)
        .json({ error: "Usuario no encontrado en la notificación." });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const deteleNotification = async (req, res) => {
  try {
    const { idNotification } = req.params;
    const notification = await Notifications.findById(idNotification);
    await notification.remove();
    res.status(200).json({ message: "notificacion eliminada" });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
