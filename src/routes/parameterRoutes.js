import express from "express";
import parameterController from "../controllers/parameterController.js";
import { verifyToken } from "../utils/auth.js";

const parameterRoutes = express.Router();

parameterRoutes.get('/all', verifyToken, (req, res) => parameterController.find(req, res));

parameterRoutes.get('/:id', verifyToken, (req, res) => parameterController.findByID(req, res));

parameterRoutes.get('/all/unactive', verifyToken, (req, res) => parameterController.findUnactive(req, res));

parameterRoutes.get('/user/:id', verifyToken, (req, res) => parameterController.findByUserID(req, res));

parameterRoutes.get('/category/:category', verifyToken, (req, res) => parameterController.findByCategory(req, res));

parameterRoutes.post('/create', verifyToken, (req, res) => parameterController.create(req, res));

parameterRoutes.put('/update/:id', verifyToken, (req, res) => parameterController.updateByID(req, res));

parameterRoutes.delete('/delete/:id', verifyToken, (req, res) => parameterController.deleteByID(req, res));

export default parameterRoutes;