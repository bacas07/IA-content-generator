import express from "express";
import parameterController from "../controllers/parameterController.js";
import { verifyToken } from "../utils/auth.js";

const parameterRoutes = express.Router();

parameterRoutes.get('/all', verifyToken, (req, res) => parameterController.find(req, res));

parameterRoutes.post('/create', verifyToken, (req, res) => parameterController.create(req, res));

export default parameterRoutes;