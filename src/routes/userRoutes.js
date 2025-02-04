import express from "express";
import userController from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get('/', (req, res) => userController.find(req, res));

userRoutes.get('/:id', (req, res) => userController.findByID(req, res));

userRoutes.put('/:id', (req, res) => userController.updateByID(req, res));

userRoutes.delete('/:id', (req, res) => userController.deleteByID(req, res));

userRoutes.post('/register', (req, res) => userController.register(req, res));

userRoutes.post('/log', (req, res) => userController.login(req, res));

export default userRoutes;