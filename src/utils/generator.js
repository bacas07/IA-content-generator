import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import dotenv from "dotenv";
import { application } from "express";
import { Schema } from "mongoose";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const schema = {
    description: 'Article with title and body',
    type: SchemaType.OBJECT,
    properties: {
        title: {
            type: SchemaType.STRING,
            description: 'Title of the article',
            nullable: false
        },
        body: {
            type: SchemaType.STRING,
            description: 'Body of the article',
            nullable: false
        }
    },
    required: ['title', 'body'],
}

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: schema,
    },
});

const prompt = 'escribe un articulo con title y body sobre evolucion de la celula';

const generateArticle = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);

        const article = JSON.parse(result.response.text());
        console.log('Title: ', article.title);
        console.log('Body: ', article.body);
    } catch (e) {
        console.error('Error generating content: ', e )
    }
}

generateArticle(prompt);