import express from "express";
import userController from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get('/', (req, res) => userController.find(req, res));

export default userRoutes;