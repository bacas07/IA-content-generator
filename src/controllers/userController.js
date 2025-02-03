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

    async findOne (req, res) {

    }

    async findByID (req, res) {
    
    }

    async update (req, res) {

    }

    async delete (req, res) {

    }

    async register (req, res) {

    }

    async login (req, res) {

    }
}

export default new userController();