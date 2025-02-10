import express from "express";
import contentController from "../controllers/contentController.js";
import { verifyToken } from "../utils/auth.js";

const contentRoutes = express.Router();

contentRoutes.get('/all', verifyToken, (req, res) => contentController.find(req, res));

contentRoutes.get('/:id', verifyToken, (req, res) => contentController.findByID(req, res));

contentRoutes.get('/all/unactive', verifyToken, (req, res) => contentController.findUnactive(req, res));

contentRoutes.get('/user/:id', verifyToken, (req, res) => contentController.findByUserID(req, res));

contentRoutes.get('/parameter/:id', verifyToken, (req, res) => contentController.findByParameterID(req, res));

contentRoutes.get('/category/:category', verifyToken, (req, res) => contentController.findByCategory(req, res));

contentRoutes.post('/create/:parameter_id', verifyToken, (req, res) => contentController.create(req, res));

export default contentRoutes;