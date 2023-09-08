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
import nodemailer from "nodemailer"; // Importa nodemailer
import { generateReportAct } from "./Services/sendReportAct.js";

// Inicializa el servidor
const app = express();

// Configura las variables de entorno
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Conecta a la base de datos
connectDB();

// Rutas de la API
app.use("/api/clientes", clientesRoutes);
app.use("/api/actividades", actividadesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notiRoutes);
app.use("/api/reports", reportsRoutes);
app.use("*", (req, res) => {
  res.send("Para trabajar con la API, debes usar el endpoint /api/clientes");
});

// Programa la tarea cron para las 19:10 (10 minutos después de las 19:00) los viernes
cron.schedule("50 19 * * 5", () => {
  console.log("Ejecutando tarea cron a las 19:10");
  main(); // Llama a la función main para generar y enviar el informe
});

// Levanta el servidor
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log("Escuchando en el puerto " + PORT);
});

// Función para enviar correos electrónicos
async function main() {
  try {
    const reportData = await generateReportAct(); // Llama a generateReportAct y obtén los datos

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "luquez1431@gmail.com",
        pass: "dtqlzwfwevhnjvfb",
      },
    });

    transporter.verify().then(() => {
      console.log("Configuración de correo electrónico exitosa");
    });

    const info = await transporter.sendMail({
      from: "luquez1431@gmail.com", // Reemplaza con tu dirección de correo
      to: "luquez1431@gmail.com", // Reemplaza con el destinatario
      subject: "Informe Semanal de Ventas", // Asunto del correo
      text: "Adjunto se encuentra el informe semanal de ventas.", // Cuerpo del correo
      html: `<p>Adjunto se encuentra el informe semanal de ventas:</p>
             <pre>${JSON.stringify(reportData, null, 2)}</pre>`, // Agrega los datos del informe en el cuerpo del correo como texto o HTML
    });

    console.log("Correo electrónico enviado:", info.response);
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
}
