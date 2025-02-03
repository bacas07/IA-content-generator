import content from "../schemas/contentSchema.js";

class contentModel {
    async find () {
        try {
            return await content.find();
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async findById (id) {
        try {
            return await content.findById(id);
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async findOne (filter) {
        try {
            return await content.findOne(filter);
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async create (data) {
        try {
            const new_content = new content(data);
            return await new_content.save();
        } catch (e) {
            console.error('error: ', e)
        }
    }

    async updateById (id, data) {
        try {
            return await content.findByIdAndUpdate(id, data, { new: true });
        } catch (e) {
            console.error('error: ', e )
        }
    }

    async deleteById (id) {
        try {
            return await content.findByIdAndDelete(id);
        } catch (e) {
            console.error('error: ', e)
        }
    }
}

export default new contentModel;