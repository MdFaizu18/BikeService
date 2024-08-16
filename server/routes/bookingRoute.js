import { Router } from "express";
import { createBooking, deleteBooking, getAllBookings, getBookingById, getBookingStats, getOwnBookings, updateBooking } from "../controllers/bookingController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

// to getting router for function in express {Router} 
const router = Router();

// authenticating user to get to know about the role 
router.use(authenticateUser);

// to validate the http methods using router 
router.get('/own', getOwnBookings);
router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/stats', getBookingStats);
router.get('/:id',getBookingById);
router.patch('/:id', updateBooking);
router.delete('/:id', deleteBooking)

export default router;