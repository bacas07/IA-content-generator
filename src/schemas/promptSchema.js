import { SchemaType } from "@google/generative-ai";

// Definir las propiedades del esquema por separado para mayor claridad
const articleProperties = {
    title: {
        type: SchemaType.STRING,
        description: "Title of the article",
        nullable: false,
    },
    body: {
        type: SchemaType.STRING,
        description: "Body of the article",
        nullable: false,
    },
};

// Definir el esquema principal
const promptSchema = {
    description: "Article with title and body",
    type: SchemaType.OBJECT,
    properties: articleProperties,
    required: Object.keys(articleProperties), // Asegura que todos los campos sean obligatorios
};

export default promptSchema;
