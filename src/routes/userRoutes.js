import express from "express";
import userController from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get('/', (req, res) => userController.find(req, res));

userRoutes.get('/:id', (req, res) => userController.findByID(req, res));

userRoutes.post('/register', (req, res) => userController.register(req, res));

userRoutes.post('/log', (req, res) => userController.login(req, res));

export default userRoutes;