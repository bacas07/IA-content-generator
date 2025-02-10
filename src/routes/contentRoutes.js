import express from "express";
import contentController from "../controllers/contentController.js";
import { verifyToken } from "../utils/auth.js";

const contentRouter = express.Router();

contentRouter.get('/all', verifyToken, (req, res) => contentController.find(req, res));

contentRouter.get('/:id', verifyToken, (req, res) => contentController.findByID(req, res));

userRoutes.get('/all/unactive', verifyToken, (req, res) => contentController.findUnactive(req, res));

contentRouter.get('/user/:id', verifyToken, (req, res) => contentController.findByUserID(req, res));

contentRouter.get('/parameter/:id', verifyToken, (req, res) => contentController.findByParameterID(req, res));

contentRouter.get('/category/:category', verifyToken, (req, res) => contentController.findByCategory(req, res));

contentRouter.post('/create/:parameter_id', verifyToken, (req, res) => contentController.create(req, res));

export default contentRouter;