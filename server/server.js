// importing necessery modules and packages 
import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// configuring the environment variables and intializing the express app
dotenv.config();
const app = express();

// to parse the request body 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));


// importing routes and middlewares 
import authRoute from './routes/authRoute.js';
import serviceRoute from './routes/serviceRoute.js';
import bookingRoute from './routes/bookingRoute.js';
import userRoute from './routes/userRoute.js'
import { sendEmail } from './controllers/emailController.js';

// handling routes and events
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/services",serviceRoute);
app.use("/api/v1/bookings",bookingRoute);
app.use("/api/v1/users",userRoute);
app.use("/api/v1/send-email",sendEmail);

// serving the static files
const __dirname = dirname(fileURLToPath(import.meta.url));

// to use in frontend in the production mode in public folder 
app.use(express.static(path.resolve(__dirname, './public')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

app.use("*", (req, res) => {
    res.status(404).json({ msg: "not found" });
});

// connecting to the database
const port = 5050;
app.listen(port,async()=>{
    try{
     await mongoose.connect(process.env.MONGO_URL);
     console.log(`Server is running on port ${port}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
});