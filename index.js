import express from "express";
import dotenv from "dotenv";
import connectDB from "./mongoDB/connectDB.js";
import { clientesRoutes } from "./Routes/clientesRoutes.js";
import cors from "cors";
import { actividadesRoutes } from "./Routes/actividadesRoutes.js";
import { userRoutes } from "./Routes/userRoutes.js";
import { notiRoutes } from "./Routes/notificationsRoutes.js";
import { reportsRoutes } from "./Routes/reportesRoutes.js";
import cron from "node-cron";
import { generateReportAct } from "./Services/sendReportAct.js";

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
app.use("/api/users", userRoutes);
app.use("/api/notifications", notiRoutes);
app.use("/api/reports", reportsRoutes);
app.use("*", (req, res) => {
  res.send("Para trabajar con la api, debes usar el endpoint /api/clientes");
});

cron.schedule("10 19 * * 5", () => {
  generateReportAct(); // Llama a tu función de envío de informe aquí
});

// levantamos el server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
