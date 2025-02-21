import express from "express";
import userController from "../controllers/userController.js";
import { verifyToken, permit } from "../utils/auth.js";

const userRoutes = express.Router();

userRoutes.get('/all', verifyToken, permit('admin', 'developer'), (req, res) => userController.find(req, res));

userRoutes.get('/:id', verifyToken, permit('admin', 'developer'), (req, res) => userController.findByID(req, res));

userRoutes.get('/all/unactive', verifyToken, permit('admin', 'developer'), (req, res) => userController.findUnactive(req, res));

userRoutes.put('/update/:id', verifyToken, permit('admin'), (req, res) => userController.updateByID(req, res));

userRoutes.delete('/delete/:id', verifyToken, permit('admin'),(req, res) => userController.deleteByID(req, res));

userRoutes.post('/register', (req, res) => userController.register(req, res));

userRoutes.post('/log', (req, res) => userController.login(req, res));

export default userRoutes;