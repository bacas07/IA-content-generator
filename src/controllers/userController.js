import userModel from "../models/userModel.js";
import { hash, verify } from "argon2";
import dotenv from "dotenv";

dotenv.config();

class userController {

    async find (req, res) {
        try {
            const users = await userModel.find();
            return res.status(200).json(users);
        } catch (e) {
            return res.status(500).json({ error: 'Error finding all users' });
        }
    }

    async findByID (req, res) {
        try {
            const { id } = req.params;
            const user = await userModel.findById(id);

            if (!user) {
                return res.status(404).json({ error: 'User dont exist' });
            }

            return res.status(200).json(user);
        } catch (e) {
            return res.status(500).json({ error: 'Error finding user' })
        }
    }

    async updateByID (req, res) {
        try {
            const { id } = req.params;
            const new_user = await userModel.updateById(id, res.body);

            if (!new_user) {
                return res.status(404).json({ error: 'User cannot update or user doesnt exist' });
            }

            return res.status(200).json({ 'message': 'User created' });

        } catch (e) {
            return res.status(500).json({ error: 'Error updating user' });
        }
    }

    async deleteByID (req, res) {

    }

    async register (req, res) {

    }

    async login (req, res) {

    }
}

export default new userController();