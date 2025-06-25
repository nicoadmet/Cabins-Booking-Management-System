import express from "express";
import cors from "cors";

import { PORT } from "./config.js"
import { sequelize } from "./db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cabinRoutes from "./routes/cabin.routes.js";
import bookingRoutes from "./routes/booking.routes.js"

import "./models/User.js";
import "./models/Cabin.js";
import "./models/Booking.js";

const app = express();

try {
    app.use(express.json());

    // configuracion del cors 
    app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
    }));
    
    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/cabin', cabinRoutes);
    app.use('/api/booking', bookingRoutes);

    await sequelize.sync();
    
    app.listen(PORT);

    console.log(`Server listening on port ${PORT}`);
} catch (error) {
    console.log(`Ocurrio un error en la inicialización.`, error)
}