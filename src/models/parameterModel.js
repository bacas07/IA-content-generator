import parameter from "../schemas/parameterSchema.js";

class ParameterModel {
    async find() {
        try {
            return await parameter.find().lean();
        } catch (e) {
            console.error('Error fetching parameters:', e);
            throw new Error('Database error while fetching parameters');
        }
    }

    async findById(id) {
        try {
            return await parameter.findById(id).lean();
        } catch (e) {
            console.error('Error fetching parameter by ID:', e);
            throw new Error('Database error while fetching parameter by ID');
        }
    }

    async findOne(filter) {
        try {
            return await parameter.findOne(filter).lean();
        } catch (e) {
            console.error('Error fetching single parameter:', e);
            throw new Error('Database error while fetching single parameter');
        }
    }

    async findByUserID(userID) {
        try {
            return await parameter.find({ userID }).lean();
        } catch (e) {
            console.error('Error fetching parameters by userID:', e);
            throw new Error('Database error while fetching parameters by userID');
        }
    }

    async findByCategory(category) {
        try {
            return await parameter.find({ category }).lean();
        } catch (e) {
            console.error('Error fetching parameters by category:', e);
            throw new Error('Database error while fetching parameters by category');
        }
    }

    async create(data) {
        try {
            return await parameter.create(data);
        } catch (e) {
            console.error('Error creating parameter:', e);
            throw new Error('Database error while creating parameter');
        }
    }

    async updateById(id, data) {
        try {
            const updatedParameter = await parameter.findByIdAndUpdate(id, data, { new: true, lean: true });
            if (!updatedParameter) throw new Error('Parameter not found');
            return updatedParameter;
        } catch (e) {
            console.error('Error updating parameter:', e);
            throw new Error('Database error while updating parameter');
        }
    }

    async deleteById(id) {
        try {
            const deletedParameter = await parameter.findByIdAndDelete(id);
            if (!deletedParameter) throw new Error('Parameter not found');
            return deletedParameter;
        } catch (e) {
            console.error('Error deleting parameter:', e);
            throw new Error('Database error while deleting parameter');
        }
    }
}

export default new ParameterModel();
