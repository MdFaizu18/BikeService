import mongoose from "mongoose";

// creating schema for customer booking 
const bookingSchema = new mongoose.Schema({
    serviceName: String,
    customerName: String,
    bikeModel: String,
    mobileNo: String,
    email:String,
    price:String,
    bookingDate: String,
    status: {
        type: String,
        enum: ['Pending', 'Ready for delivery', 'Completed'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
    },
},
    { timestamps: true }

);

// exporting schema as model for data manipulation
export default mongoose.model('Booking', bookingSchema);