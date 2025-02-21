import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ Conectado a MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ Error al conectar con la base de datos:", error.message);
        process.exit(1); // Detiene la ejecución en caso de error crítico
    }
};
