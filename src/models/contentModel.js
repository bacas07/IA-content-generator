import content from "../schemas/contentSchema.js";

class ContentModel {
    async find() {
        try {
            return await content.find().lean();
        } catch (e) {
            console.error('Error fetching content:', e);
            throw new Error('Database error while fetching content');
        }
    }

    async findById(id) {
        try {
            return await content.findById(id).lean();
        } catch (e) {
            console.error('Error fetching content by ID:', e);
            throw new Error('Database error while fetching content by ID');
        }
    }

    async findOne(filter) {
        try {
            return await content.findOne(filter).lean();
        } catch (e) {
            console.error('Error fetching single content:', e);
            throw new Error('Database error while fetching single content');
        }
    }

    async findByUserID(userID) {
        try {
            return await content.find({ userID }).lean();
        } catch (e) {
            console.error('Error fetching content by userID:', e);
            throw new Error('Database error while fetching content by userID');
        }
    }

    async findByParameterID(parameterID) {
        try {
            return await content.find({ parameterID }).lean();
        } catch (e) {
            console.error('Error fetching content by parameterID:', e);
            throw new Error('Database error while fetching content by parameterID');
        }
    }

    async findByCategory(category) {
        try {
            return await content.find({ category }).lean();
        } catch (e) {
            console.error('Error fetching content by category:', e);
            throw new Error('Database error while fetching content by category');
        }
    }

    async create(data) {
        try {
            return await content.create(data);
        } catch (e) {
            console.error('Error creating content:', e);
            throw new Error('Database error while creating content');
        }
    }

    async updateById(id, data) {
        try {
            const updatedContent = await content.findByIdAndUpdate(id, data, { new: true, lean: true });
            if (!updatedContent) throw new Error('Content not found');
            return updatedContent;
        } catch (e) {
            console.error('Error updating content:', e);
            throw new Error('Database error while updating content');
        }
    }

    async deleteById(id) {
        try {
            const deletedContent = await content.findByIdAndDelete(id);
            if (!deletedContent) throw new Error('Content not found');
            return deletedContent;
        } catch (e) {
            console.error('Error deleting content:', e);
            throw new Error('Database error while deleting content');
        }
    }
}

export default new ContentModel();
