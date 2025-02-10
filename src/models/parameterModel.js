import parameter from "../schemas/parameterSchema.js";

class parameterModel {
    async find () {
        try {
            return await parameter.find({ is_active: true });
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async findUnactive () {
        try {
            return await user.find({ is_active: false });
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async findById (id) {
        try {
            return await parameter.findById(id);
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async findOne (filter) {
        try {
            return await parameter.findOne(filter);
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async findByUserID (user_id) {
        try {
            return await parameter.find({ userID: user_id });
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async findByCategory (category) {
        try {
            return await parameter.find({ category: category });
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async create (data) {
        try {
            const new_parameter = new parameter(data);
            return await new_parameter.save();
        } catch (e) {
            console.error('error: ', e)
        }
    }

    async updateById (id, data) {
        try {
            return await parameter.findByIdAndUpdate(id, data, { new: true });
        } catch (e) {
            console.error('error: ', e )
        }
    }

    async deleteById (id) {
        try {
            return await parameter.findByIdAndUpdate(id, { is_active: false });
        } catch (e) {
            console.error('error: ', e)
        }
    }
}

export default new parameterModel;