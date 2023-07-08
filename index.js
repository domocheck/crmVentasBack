import express from "express";
import dotenv from "dotenv";
import connectDB from "./mongoDB/connectDB.js";
import { clientesRoutes } from "./Routes/clientesRoutes.js";
import cors from "cors";
import { actividadesRoutes } from "./Routes/actividadesRoutes.js";
import { usersRoutes } from "./Routes/usersRoutes.js";

// iniciamos el servidor
const app = express();

// corremos las variables de entorno
dotenv.config();

//middlewares
app.use(express.json());
app.use(cors());

//conectar a la db
connectDB();

//creamos los endpoints
app.use("/api/clientes", clientesRoutes);
app.use("/api/actividades", actividadesRoutes);
aap.use("/api/users", usersRoutes);
app.use("*", (req, res) => {
  res.send("Para trabajar con la api, debes usar el endpoint /api/clientes");
});

// levantamos el server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
