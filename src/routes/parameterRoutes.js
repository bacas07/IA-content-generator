import express from "express";
import parameterController from "../controllers/parameterController.js";
import { verifyToken } from "../utils/auth.js";

const parameterRouter = express.Router();

parameterRouter.use(verifyToken); // Aplica el middleware a todas las rutas

// Rutas de obtención de parámetros
parameterRouter.route('/all').get(parameterController.find.bind(parameterController));
parameterRouter.route('/:id').get(parameterController.findByID.bind(parameterController));
parameterRouter.route('/user/:id').get(parameterController.findByUserID.bind(parameterController));
parameterRouter.route('/category/:category').get(parameterController.findByCategory.bind(parameterController));

// Rutas de manipulación de parámetros
parameterRouter.route('/create').post(parameterController.create.bind(parameterController));
parameterRouter.route('/update/:id').put(parameterController.updateByID.bind(parameterController));
parameterRouter.route('/delete/:id').delete(parameterController.deleteByID.bind(parameterController));

export default parameterRouter;
