import Notifications from "./../models/notifiModel.js";

export const createNotifications = async (req, res) => {
  try {
    const { date, description, idUser } = req.body;
    const notification = await Notifications.create({
      createAt: date,
      description,
      users: [{ idUser, statusNotification: "Pendiente" }],
    });
    res
      .status(200)
      .json({ message: "notificacion creada", data: notification });
  } catch (error) {
    res.status(404).send.json({ error: error });
  }
};
