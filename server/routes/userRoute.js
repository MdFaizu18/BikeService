import Router from 'express';
import { getAllUsers, getCurrentUser } from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

// to getting router for function in express {Router} 
const router = Router();

// to validate the http methods using router 
router.use(authenticateUser);
router.get('/',getAllUsers);
router.get('/current',getCurrentUser);

export default router;