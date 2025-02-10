import mainPrompt from "./prompt.js";
import AImodel from "./model.js";
import parameterModel from "../models/parameterModel.js"

const generateContent = async (parameter_id) => {
    try {
        const parameter = await parameterModel.findById(parameter_id);
        const prompt = mainPrompt(parameter.keywords, parameter.category, parameter.length);
        const result = await AImodel.generateContent(prompt);
        const content = JSON.parse(result.response.text());
        
        const jsonContent = {
            category: parameter.category,
            title: content.title,
            body: content.body
        }

        return jsonContent;
    } catch (e) {
        console.error('Error: ', e);
    }
}

/*const generateArticle = async (prompt) => {
    try {
        const result = await AImodel.generateContent(prompt);
        const content = JSON.parse(result.response.text());
        const jsonContent = {
            title: content.title,
            body: content.body
        }
        console.log(jsonContent.title);
        console.log(jsonContent.body)
    } catch (e) {
        console.error('Error generating content: ', e )
    }
}*/

export default generateContent;