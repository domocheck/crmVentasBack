import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { name, password, role, email, vendedor } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña
    const emailExistente = await User.findOne({ email });

    if (emailExistente) {
      res.status(404).json({ error: "El usuario ya existe" });
      return;
    }

    const user = await User.create({
      name,
      password: hashedPassword, // Almacena el hash en la base de datos
      role,
      email,
      vendedor: vendedor || false,
    });

    res.status(200).json({ message: "usuario creado con exito", data: user });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const getUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password); // Compara las contraseñas

    if (passwordMatch) {
      res.status(200).json({ message: "usuario obtenido", data: user });
    } else {
      res.status(404).json({ error: "Contraseña incorrecta" });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
