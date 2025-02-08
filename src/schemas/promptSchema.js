import { SchemaType } from "@google/generative-ai"

const promptSchema = {
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

export default promptSchema;