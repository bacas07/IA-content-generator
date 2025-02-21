import express from "express";
import parameterController from "../controllers/parameterController.js";
import { verifyToken, permit } from "../utils/auth.js";

const parameterRoutes = express.Router();

parameterRoutes.get('/all', verifyToken, permit('admin', 'developer'), (req, res) => parameterController.find(req, res));

parameterRoutes.get('/:id', verifyToken, permit('admin', 'developer', 'user'), (req, res) => parameterController.findByID(req, res));

parameterRoutes.get('/all/unactive', verifyToken, permit('admin'), (req, res) => parameterController.findUnactive(req, res));

parameterRoutes.get('/user/:id', verifyToken, permit('admin', 'developer', 'user'), (req, res) => parameterController.findByUserID(req, res));

parameterRoutes.get('/category/:category', verifyToken, permit('admin', 'developer'), (req, res) => parameterController.findByCategory(req, res));

parameterRoutes.post('/create', verifyToken, permit('admin', 'developer', 'user'), (req, res) => parameterController.create(req, res));

parameterRoutes.put('/update/:id', verifyToken, permit('admin'), (req, res) => parameterController.updateByID(req, res));

parameterRoutes.delete('/delete/:id', verifyToken, permit('admin'), (req, res) => parameterController.deleteByID(req, res));

export default parameterRoutes;