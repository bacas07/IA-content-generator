import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

export const config = (app) => {
    try {
        // Configuración de logs HTTP
        app.use(morgan("dev"));

        // Configuración de seguridad HTTP con Helmet
        app.use(
            helmet({
                contentSecurityPolicy: false, // Evita problemas con ciertas librerías frontend
                crossOriginResourcePolicy: { policy: "same-origin" },
            })
        );

        // Configuración de CORS
        app.use(
            cors({
                origin: process.env.CLIENT_URL || "*", // Restringe acceso solo al cliente permitido
                methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
                credentials: true, // Permite enviar cookies de sesión si es necesario
            })
        );

    } catch (error) {
        console.error("Error en la configuración de middlewares:", error);
        process.exit(1); // Detiene la ejecución en caso de fallo crítico
    }
};
