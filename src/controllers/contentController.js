import contentModel from "../models/contentModel";

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
}

export default new contentController();