import mainPrompt from "./prompt.js";
import AImodel from "./model.js";
import parameterModel from "../models/parameterModel.js";

const generateContent = async (parameter_id) => {
    try {
        // Obtener el parámetro desde la base de datos
        const parameter = await parameterModel.findById(parameter_id);
        if (!parameter) {
            throw new Error(`Parameter with ID ${parameter_id} not found`);
        }

        // Generar el prompt basado en los datos obtenidos
        const prompt = mainPrompt(parameter?.keywords, parameter?.category, parameter?.length);
        const result = await AImodel.generateContent(prompt);
        
        // Asegurar que la respuesta es válida antes de continuar
        if (!result || !result.response) {
            throw new Error("Invalid response from AI model");
        }

        // Procesar el contenido generado
        const content = JSON.parse(await result.response.text());

        return {
            title: content.title,
            body: content.body
        };
    } catch (e) {
        console.error("Error generating content:", e.message);
        throw new Error("Failed to generate content"); // Lanzar error para que pueda ser manejado externamente
    }
};

export default generateContent;
