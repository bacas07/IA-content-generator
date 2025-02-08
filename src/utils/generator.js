import { GoogleGenerativeAI } from "@google/generative-ai";
import promptSchema from "../schemas/promptSchema.js";
import mainPrompt from "./prompt.js";
import AImodel from "./model.js";


const prompt = mainPrompt(['invincible comic', 'opinion general del comic', 'español'], 'Libros', 500);


const generateArticle = async (prompt) => {
    try {
        const result = await AImodel.generateContent(prompt);

        const article = JSON.parse(result.response.text());
        console.log('Title: ', article.title);
        console.log('Body: ', article.body);
    } catch (e) {
        console.error('Error generating content: ', e )
    }
}



generateArticle(prompt);