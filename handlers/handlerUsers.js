import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { name, password, role } = req.body;
    const user = await User.create({ name, password, role });
    res.status(200).json({ message: "usuario creado con exito", data: user });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const getUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name, password });
    res.status(200).json({ message: "usuario obtenido", data: user });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
