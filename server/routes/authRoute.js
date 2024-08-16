import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from "../middlewares/validationMiddleware.js";
import { authCheck } from "../controllers/userController.js";

// to getting router for function in express {Router} 
const router = Router();

// to validate the http methods using router 
router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout)
router.get("/check",authCheck);

export default router;