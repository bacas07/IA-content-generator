import userModel from "../models/userModel.js";
import { hash, verify } from "argon2";
import dotenv from "dotenv";
import { generateToken } from "../utils/auth.js";

dotenv.config();

class UserController {
    async find(req, res) {
        try {
            const users = await userModel.find().lean();
            return res.status(200).json(users);
        } catch (error) {
            console.error("Error finding all users:", error);
            return res.status(500).json({ error: "Error retrieving users" });
        }
    }

    async findByID(req, res) {
        try {
            const { id } = req.params;
            const user = await userModel.findById(id).lean();

            if (!user) {
                return res.status(404).json({ error: "User does not exist" });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error("Error finding user by ID:", error);
            return res.status(500).json({ error: "Error retrieving user" });
        }
    }

    async updateByID(req, res) {
        try {
            const { id } = req.params;
            const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).lean();

            if (!updatedUser) {
                return res.status(404).json({ error: "User not found or could not be updated" });
            }

            return res.status(200).json({ message: "User updated successfully" });
        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({ error: "Error updating user" });
        }
    }

    async deleteByID(req, res) {
        try {
            const { id } = req.params;
            const deletedUser = await userModel.findByIdAndDelete(id).lean();

            if (!deletedUser) {
                return res.status(404).json({ error: "User not found or could not be deleted" });
            }

            return res.status(204).send();
        } catch (error) {
            console.error("Error deleting user:", error);
            return res.status(500).json({ error: "Error deleting user" });
        }
    }

    async register(req, res) {
        try {
            const { username, email, password, role } = req.body;
            
            if (!username || !email || !password || !role) {
                return res.status(400).json({ error: "All fields are required" });
            }
            
            const userExists = await userModel.findOne({ $or: [{ username }, { email }] });

            if (userExists) {
                return res.status(409).json({ error: "User already exists" });
            }

            const hashedPassword = await hash(password);
            await userModel.create({ username, email, password: hashedPassword, role });

            return res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            console.error("Error registering user:", error);
            return res.status(500).json({ error: "Error registering user" });
        }
    }

    async login(req, res) {
        try {
            const { username, email, password } = req.body;
            
            if ((!username && !email) || !password) {
                return res.status(400).json({ error: "Username/email and password are required" });
            }
            
            const user = await userModel.findOne({ $or: [{ username }, { email }] });

            if (!user) {
                return res.status(404).json({ error: "User does not exist" });
            }

            const isPasswordValid = await verify(user.password, password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid password" });
            }

            const token = generateToken({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            });

            return res.status(200).json({ message: "User logged in successfully", token });
        } catch (error) {
            console.error("Error logging in user:", error);
            return res.status(500).json({ error: "Error logging in user" });
        }
    }
}

export default new UserController();
