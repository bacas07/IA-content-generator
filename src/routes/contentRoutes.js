import express from "express";
import contentController from "../controllers/contentController.js";
import { permit, verifyApiKey, verifyToken } from "../utils/auth.js";

const contentRoutes = express.Router();

contentRoutes.get('/all', verifyApiKey, verifyToken, permit('admin', 'developer', 'user'), (req, res) => contentController.find(req, res));

contentRoutes.get('/:id', verifyApiKey, verifyToken, permit('admin', 'developer', 'user'), (req, res) => contentController.findByID(req, res));

contentRoutes.get('/all/unactive', verifyApiKey, verifyToken, permit('admin'), (req, res) => contentController.findUnactive(req, res));

contentRoutes.get('/user/:id', verifyApiKey, verifyToken, permit('admin', 'developer', 'user'), (req, res) => contentController.findByUserID(req, res));

contentRoutes.get('/parameter/:id', verifyApiKey, verifyToken, permit('admin', 'developer', 'user'), (req, res) => contentController.findByParameterID(req, res));

contentRoutes.get('/category/:category', verifyApiKey, verifyToken, permit('admin', 'developer', 'user'), (req, res) => contentController.findByCategory(req, res));

contentRoutes.post('/create/:parameter_id', verifyApiKey, verifyToken, permit('admin', 'developer', 'user'), (req, res) => contentController.create(req, res));

contentRoutes.delete('/delete/:id', verifyApiKey, verifyToken, permit('admin'), (req, res) => contentController.deleteByID(req, res));

export default contentRoutes;