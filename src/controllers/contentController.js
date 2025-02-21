import contentModel from "../models/contentModel.js";
import generateContent from "../utils/generator.js";

class ContentController {
    async find(req, res) {
        try {
            const content = await contentModel.find().lean();
            return res.status(200).json(content);
        } catch (error) {
            console.error("Error finding all content:", error);
            return res.status(500).json({ error: "Error retrieving content" });
        }
    }

    async findByID(req, res) {
        try {
            const { id } = req.params;
            const content = await contentModel.findById(id).lean();

            if (!content) {
                return res.status(404).json({ error: "Content does not exist" });
            }

            return res.status(200).json(content);
        } catch (error) {
            console.error("Error finding content by ID:", error);
            return res.status(500).json({ error: "Error retrieving content" });
        }
    }

    async findByUserID(req, res) {
        try {
            const { id } = req.params;
            const content = await contentModel.find({ userID: id }).lean();

            if (!content.length) {
                return res.status(404).json({ error: "No content found for this user" });
            }

            return res.status(200).json(content);
        } catch (error) {
            console.error("Error finding content by User ID:", error);
            return res.status(500).json({ error: "Error retrieving content" });
        }
    }

    async findByParameterID(req, res) {
        try {
            const { id } = req.params;
            const content = await contentModel.find({ parameterID: id }).lean();

            if (!content.length) {
                return res.status(404).json({ error: "No content found for this parameter" });
            }

            return res.status(200).json(content);
        } catch (error) {
            console.error("Error finding content by Parameter ID:", error);
            return res.status(500).json({ error: "Error retrieving content" });
        }
    }

    async findByCategory(req, res) {
        try {
            const { category } = req.params;
            const content = await contentModel.find({ category }).lean();

            if (!content.length) {
                return res.status(404).json({ error: "No content found for this category" });
            }

            return res.status(200).json(content);
        } catch (error) {
            console.error("Error finding content by Category:", error);
            return res.status(500).json({ error: "Error retrieving content" });
        }
    }

    async create(req, res) {
        try {
            const { parameter_id } = req.params;
            const user_id = req.user?.id;

            if (!user_id) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const result = await generateContent(parameter_id);

            if (!result?.title || !result?.body) {
                return res.status(400).json({ error: "Invalid content generation response" });
            }

            await contentModel.create({
                userID: user_id,
                parameterID: parameter_id,
                title: result.title,
                body: result.body,
            });

            return res.status(201).json({ message: "Content created successfully" });
        } catch (error) {
            console.error("Error creating content:", error);
            return res.status(500).json({ error: "Error creating content" });
        }
    }
}

export default new ContentController();
