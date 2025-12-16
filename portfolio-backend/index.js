import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://abrahansito.github.io/mi_portafolio/"
}));
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend del portafolio funcionando");
});

// Rutas
app.use("/api/contact", contactRoutes);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error MongoDB:", error);
  });


