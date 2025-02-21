import express from "express";
import contentController from "../controllers/contentController.js";
import { verifyToken } from "../utils/auth.js";

const contentRouter = express.Router();

contentRouter.use(verifyToken); // Aplica el middleware a todas las rutas

// Rutas de obtención de contenido
contentRouter.route('/all').get(contentController.find.bind(contentController));
contentRouter.route('/:id').get(contentController.findByID.bind(contentController));
contentRouter.route('/user/:id').get(contentController.findByUserID.bind(contentController));
contentRouter.route('/parameter/:id').get(contentController.findByParameterID.bind(contentController));
contentRouter.route('/category/:category').get(contentController.findByCategory.bind(contentController));

// Ruta para creación de contenido
contentRouter.route('/create/:parameter_id').post(contentController.create.bind(contentController));

export default contentRouter;
