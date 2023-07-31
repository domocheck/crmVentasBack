import mongoose from "mongoose";

const notifiSchema = new mongoose.Schema({
  createAt: Date,
  description: String,
  users: [
    {
      idUser: String,
      statusNotification: String,
    },
  ],
});

const Notifications = mongoose.model("notification", notifiSchema);

export default Notifications;
