import mongoose from "mongoose";

// creating schema for services 
const serviceSchema = new mongoose.Schema({
    serviceName: String,
    description: String,
    price: Number,
    image:String
});

// exporting schema as model for data manipulation
export default mongoose.model('Service', serviceSchema);