import express from "express";
import userController from "../controllers/userController.js";
import { verifyToken } from "../utils/auth.js";

const userRouter = express.Router();

// Rutas de autenticación (sin verificación de token)
userRouter.post('/register', userController.register.bind(userController));
userRouter.post('/log', userController.login.bind(userController));

// Aplicar verifyToken a todas las rutas protegidas
userRouter.use(verifyToken);

// Rutas protegidas
userRouter.route('/all').get(userController.find.bind(userController));
userRouter.route('/:id').get(userController.findByID.bind(userController));
userRouter.route('/update/:id').put(userController.updateByID.bind(userController));
userRouter.route('/delete/:id').delete(userController.deleteByID.bind(userController));

export default userRouter;
