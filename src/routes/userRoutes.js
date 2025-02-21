import express from "express";
import userController from "../controllers/userController.js";
import { verifyToken, permit, verifyApiKey } from "../utils/auth.js";

const userRoutes = express.Router();

userRoutes.get('/all', verifyApiKey, verifyToken, permit('admin', 'developer'), (req, res) => userController.find(req, res));

userRoutes.get('/:id', verifyApiKey, verifyToken, permit('admin', 'developer'), (req, res) => userController.findByID(req, res));

userRoutes.get('/all/unactive', verifyApiKey, verifyToken, permit('admin', 'developer'), (req, res) => userController.findUnactive(req, res));

userRoutes.put('/update/:id', verifyApiKey, verifyToken, permit('admin'), (req, res) => userController.updateByID(req, res));

userRoutes.delete('/delete/:id', verifyApiKey, verifyToken, permit('admin'),(req, res) => userController.deleteByID(req, res));

userRoutes.post('/register', verifyApiKey, (req, res) => userController.register(req, res));

userRoutes.post('/log', verifyApiKey, (req, res) => userController.login(req, res));

export default userRoutes;