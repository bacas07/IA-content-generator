import contentModel from "../models/contentModel.js";
import user from "../schemas/userSchema.js";
import { contentAccountant } from "../utils/accountant.js";
import generateContent from "../utils/generator.js"; //

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

    async findUnactive (req, res) {
            try {
                const content = await contentModel.findUnactive();
                return res.status(200).json(content);
            } catch (e) {
                console.error('Error: ', e);
                return res.status(500).json({ error: 'Error finding all unactivated content' });
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

    async findByCategory (req, res) {
        try {
            const { category } = req.params;
            const content = await contentModel.findByCategory(category);

            if (!content) {
                return res.status(404).json({ error: 'Content not found for this category' });
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
                category: result.category,
                title: result.title,
                body: result.body
            });

            if (!content) {
                return res.status(500).json({ error: 'Error generating content' }); 
            }

            const accountant = contentAccountant(req.user.id, parameter_id);

            if (!accountant) {
                return res.status(500).json({ error: 'Error updating content accountant' });
            }
            
            return res.status(201).json(content);
        } catch (e) {
            console.log('Error: ', e);
            return res.status(500).json({ error: 'Error creating content' });
        }
    }

    async deleteByID (req, res) {
            try {
                const { id } = req.params;
                const deleted_content = await contentModel.deleteById(id);
                
                if (!deleted_content) {
                    return res.status(404).json({ error: 'Content cannot be delete or user doesnt exist' });
                }
    
                return res.status(204).json({ message: 'Content deleted' });
    
            } catch (e) {
                console.error('Error: ', e);
                return res.status(500).json({ error: 'Error deleting content' });
            }
        }
}

export default new contentController();