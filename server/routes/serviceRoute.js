import { Router } from "express";
import { createService, deleteService, getAllService, getServiceById, updateService } from "../controllers/serviceController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

// to getting router for function in express {Router} 
const router = Router();

// authenticating user to get to know about the role 
router.use(authenticateUser);

// to validate the http methods using router 
router.post('/',createService);
router.get('/',getAllService);
router.get('/:id',getServiceById);
router.patch('/:id',updateService);
router.delete('/:id',deleteService);

export default router;