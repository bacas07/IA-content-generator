import { GoogleGenerativeAI } from "@google/generative-ai";
import promptSchema from "../schemas/promptSchema.js";
import dotenv from "dotenv";

dotenv.config();

// Verificar que la clave API esté disponible
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY in environment variables");
}

// Inicializar el modelo de IA
const genAI = new GoogleGenerativeAI(apiKey);

const AImodel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: promptSchema,
    },
});

export default AImodel;
