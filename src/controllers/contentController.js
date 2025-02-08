import contentModel from "../models/contentModel.js";
import generateContent from "../utils/generator.js";

class contentController {

    async find (req, res) {
        try {
            const content = await contentModel.find();
            return res.status(200).json(content);
        } catch (e) {
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error finding all content' });
        }
    }

    async findByID (req, res) {
        try {
            const { id } = req.params;
            const content = await contentModel.findById(id);

            if (!content) {
                return res.status(404).json({ error: 'Content doesnt exist' });
            }

            return res.status(200).json(content)
        } catch (e) {
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error finding content' });            
        }
    }

    async findByUserID (req, res) {
        try {
            const { id } = req.params;
            const content = await contentModel.findByUserID(id);
            
            if (!content) {
                return res.status(404).json({ error: 'Content not found for this user' });
            }

            return res.status(200).json(content);
        } catch (e) {
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error finding content' });
        }
    }

    async findByParameterID (req, res) {
        try {
            const { id } = req.params;
            const content = await contentModel.findByParameterID(id);

            if (!content) {
                return res.status(404).json({ error: 'Content not found for this parameter' });
            }

            return res.status(200).json(content);
        } catch (e) {
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error finding content' });
        }
    }
    
    async create (req, res) {
        try {
            const { parameter_id } = req.params;
            const user_id = req.user.id;
            const result = await generateContent(parameter_id);
            
            if (!result.title || !result.body) {
                return res.status(500).json({ error: 'Error generating content' });
            }

            const content = await contentModel.create({
                userID: user_id,
                parameterID: parameter_id,
                title: result.title,
                body: result.body
            });
            
            return res.status(201).json({ message: 'Content created' });
        } catch (e) {
            console.log('Error: ', e);
            return res.status(500).json({ error: 'Error creating content' });
        }
    }
}

export default new contentController();