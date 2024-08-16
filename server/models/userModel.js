import mongoose from "mongoose";

// creating schema for getting user informations
const userSchema = new mongoose.Schema({
    userName:String,
    email:String,
    mobileNo:String,
    password:String,
    role:{
        type:String,
        enum: ['user', 'admin'],
        default:'user'
    }
});

// exporting schema as model for data manipulation
export default mongoose.model('User',userSchema);