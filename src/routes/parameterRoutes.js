import express from "express";
import parameterController from "../controllers/parameterController.js";
import { verifyToken, permit, verifyApiKey } from "../utils/auth.js";

const parameterRoutes = express.Router();

parameterRoutes.get('/all', verifyApiKey, verifyToken, permit('admin', 'developer'), (req, res) => parameterController.find(req, res));

parameterRoutes.get('/:id', verifyApiKey, verifyToken, permit('admin', 'developer', 'user'), (req, res) => parameterController.findByID(req, res));

parameterRoutes.get('/all/unactive', verifyApiKey, verifyToken, permit('admin'), (req, res) => parameterController.findUnactive(req, res));

parameterRoutes.get('/user/:id', verifyApiKey, verifyToken, permit('admin', 'developer', 'user'), (req, res) => parameterController.findByUserID(req, res));

parameterRoutes.get('/category/:category', verifyApiKey, verifyToken, permit('admin', 'developer'), (req, res) => parameterController.findByCategory(req, res));

parameterRoutes.post('/create', verifyApiKey, verifyToken, permit('admin', 'developer', 'user'), (req, res) => parameterController.create(req, res));

parameterRoutes.put('/update/:id', verifyApiKey, verifyToken, permit('admin'), (req, res) => parameterController.updateByID(req, res));

parameterRoutes.delete('/delete/:id', verifyApiKey, verifyToken, permit('admin'), (req, res) => parameterController.deleteByID(req, res));

export default parameterRoutes;