import express from "express";
import contentController from "../controllers/contentController.js";
import { verifyToken } from "../utils/auth.js";

const contentRouter = express.Router();

contentRouter.get('/all', verifyToken, (req, res) => contentController.find(req, res));

export default contentRouter;