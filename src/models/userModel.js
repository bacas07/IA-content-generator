import user from "../schemas/userSchema.js";

class userModel {
    async find () {
        try {
            return await user.find({ is_active: true });
        } catch (e) {
            console.error('error: ', e)
        }
    }

    async findById (id) {
        try {
            return await user.findById(id);
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async findOne (filter) {
        try {
            return await user.findOne(filter);
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async create (data) {
        try {
            return await user.create(data);    
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async updateById (id, data) {
        try {
            return await user.findByIdAndUpdate(id, data, { new: true });
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async deleteById (id) {
        try {
            return await user.findByIdAndUpdate(id, { is_active: false });
        } catch (e) {
            console.error('error: ', e);
        }
    }
}

export default new userModel();