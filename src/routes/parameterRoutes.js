import express from "express";
import parameterController from "../controllers/parameterController.js";
import { verifyToken } from "../utils/auth.js";

const parameterRoutes = express.Router();

parameterRoutes.get('/all', verifyToken, (req, res) => parameterController.find(req, res));

parameterRoutes.get('/:id', verifyToken, (req, res) => parameterController.findByID(req, res));

parameterRoutes.get('/category', verifyToken, (req, res) => parameterController.findByCategory(req, res));

parameterRoutes.post('/create', verifyToken, (req, res) => parameterController.create(req, res));

export default parameterRoutes;