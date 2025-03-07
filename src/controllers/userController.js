import userModel from "../models/userModel.js";
import { hash, verify } from "argon2";
import dotenv from "dotenv";
import { generateToken, validateRole, findingUser } from "../utils/auth.js";

dotenv.config();

class userController {

    async find (req, res) {
        try {
            const users = await userModel.find();
            return res.status(200).json(users);
        } catch (e) {
            console.error('Error: ', e);
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
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error finding user' })
        }
    }

    async findUnactive (req, res) {
        try {
            const users = await userModel.findUnactive();
            return res.status(200).json(users);
        } catch (e) {
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error finding all unactivated users' });
        }
    }

    async updateByID (req, res) {
        try {
            const { id } = req.params;
            const new_user = await userModel.updateById(id, req.body);

            if (!new_user) {
                return res.status(404).json({ error: 'User cannot be update or user doesnt exist' });
            }

            return res.status(201).json({ 'message': 'User updated' });

        } catch (e) {
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error updating user' });
        }
    }

    async deleteByID (req, res) {
        try {
            const { id } = req.params;
            const deleted_user = await userModel.deleteById(id);
            
            if (!deleted_user) {
                return res.status(404).json({ error: 'User cannot be delete or user doesnt exist' });
            }

            return res.status(204).json({ message: 'User deleted' });

        } catch (e) {
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error deleting user' });
        }
    }

    async register (req, res) {
        try {
            const { username, email, password, role, secret_key } = req.body;
            const user_exist = await userModel.findOne({
                $or: [
                    { username: username },
                    { email: email }
                ]
            });

            if (user_exist) {
                return res.status(401).json({ error: 'User already exists' });
            }

            const validatingRole = await validateRole(role, secret_key);

            if (!validatingRole) {
                return res.status(401).json({ error: 'Error validating role' });
            }

            const hashed_password = await hash(password);

            const new_user = await userModel.create({
                username,
                email,
                password: hashed_password,
                role
            })

            if (!new_user) {
                return res.status(500).json({ error: 'Error creating user' }); 
            }

            return res.status(201).json({ message: 'User created' });
        } catch (e) {
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error creating user' });
        }
    }

    async login (req, res) {
        try {
            const { username, email, password } = req.body;

            

            const user_exist = await findingUser(username, email);

            if (!user_exist) {
                return res.status(404).json({ error: 'User doesnt exist' });
            }

            const password_is_valid = await verify(user_exist.password, password);

            if (!password_is_valid) {
                return res.status(401).json({ error: 'Unvalid password' });
            }

            const token = generateToken({
                id: user_exist.id,
                username: user_exist.username,
                email: user_exist.email,
                role: user_exist.role,
            })

            return res.status(200).json({ message: 'User logged', token });
        } catch (e) {
            console.error('Error: ', e);
            return res.status(500).json({ error: 'Error loggining user' });
        }
    }
}

export default new userController();