import { GoogleGenerativeAI } from "@google/generative-ai";
import promptSchema from "../schemas/promptSchema.js";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const AImodel = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: promptSchema,
    },
});

export default AImodel;