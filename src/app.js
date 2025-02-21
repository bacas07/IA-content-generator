import express from "express";
import { connectDB } from "../config/connect.js";
import { config } from "../config/middlewares.js";
import userRoutes from "./routes/userRoutes.js";
import parameterRoutes from "./routes/parameterRoutes.js";
import contentRouter from "./routes/contentRoutes.js";

const app = express();

// Middleware
app.use(express.json());
config(app);

// Rutas principales
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello world" });
});

// Rutas de la API
app.use("/user", userRoutes);
app.use("/parameter", parameterRoutes);
app.use("/content", contentRouter);

// Conectar a la base de datos antes de iniciar el servidor
const startServer = async () => {
    try {
        await connectDB(); // Conexión a la base de datos
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`> Server running on port ${PORT}`));
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

// Manejo de errores globales
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    process.exit(1);
});

// Iniciar el servidor
startServer();
