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
}

export default new contentController();