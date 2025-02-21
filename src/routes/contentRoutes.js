import express from "express";
import contentController from "../controllers/contentController.js";
import { permit, verifyToken } from "../utils/auth.js";

const contentRoutes = express.Router();

contentRoutes.get('/all', verifyToken, permit('admin', 'developer', 'user'), (req, res) => contentController.find(req, res));

contentRoutes.get('/:id', verifyToken, permit('admin', 'developer', 'user'), (req, res) => contentController.findByID(req, res));

contentRoutes.get('/all/unactive', verifyToken, permit('admin'), (req, res) => contentController.findUnactive(req, res));

contentRoutes.get('/user/:id', verifyToken, permit('admin', 'developer', 'user'), (req, res) => contentController.findByUserID(req, res));

contentRoutes.get('/parameter/:id', verifyToken, permit('admin', 'developer', 'user'), (req, res) => contentController.findByParameterID(req, res));

contentRoutes.get('/category/:category', verifyToken, permit('admin', 'developer', 'user'), (req, res) => contentController.findByCategory(req, res));

contentRoutes.post('/create/:parameter_id', verifyToken, permit('admin', 'developer', 'user'), (req, res) => contentController.create(req, res));

contentRoutes.delete('/delete/:id', verifyToken, permit('admin'), (req, res) => contentController.deleteByID(req, res));

export default contentRoutes;