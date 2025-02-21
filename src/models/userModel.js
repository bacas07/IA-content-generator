import user from "../schemas/userSchema.js";

class UserModel {
    async find() {
        try {
            return await user.find().lean();
        } catch (e) {
            console.error('Error fetching users:', e);
            throw new Error('Database error while fetching users');
        }
    }

    async findById(id) {
        try {
            return await user.findById(id).lean();
        } catch (e) {
            console.error('Error fetching user by ID:', e);
            throw new Error('Database error while fetching user by ID');
        }
    }

    async findOne(filter) {
        try {
            return await user.findOne(filter).lean();
        } catch (e) {
            console.error('Error fetching single user:', e);
            throw new Error('Database error while fetching single user');
        }
    }

    async create(data) {
        try {
            return await user.create(data);    
        } catch (e) {
            console.error('Error creating user:', e);
            throw new Error('Database error while creating user');
        }
    }

    async updateById(id, data) {
        try {
            const updatedUser = await user.findByIdAndUpdate(id, data, { new: true, lean: true });
            if (!updatedUser) throw new Error('User not found');
            return updatedUser;
        } catch (e) {
            console.error('Error updating user:', e);
            throw new Error('Database error while updating user');
        }
    }

    async deleteById(id) {
        try {
            const deletedUser = await user.findByIdAndDelete(id);
            if (!deletedUser) throw new Error('User not found');
            return deletedUser;
        } catch (e) {
            console.error('Error deleting user:', e);
            throw new Error('Database error while deleting user');
        }
    }
}

export default new UserModel();
