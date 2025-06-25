import { Router } from "express";
import { getAllBookings,  createBooking, updateBooking, deleteBooking, getBookingsByUser} from "../services/booking.services.js"

const router = Router();

router.get("/", getAllBookings);

router.get("/user/:userId", getBookingsByUser);

router.post("/", createBooking);

router.put("/:id", updateBooking);

router.delete("/:id", deleteBooking);

export default router;