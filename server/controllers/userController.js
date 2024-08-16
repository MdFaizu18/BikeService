import userModel from "../models/userModel.js";
import { verifyJWT } from "../utils/tokenUtils.js";

// to get all the users in the database 
export const getAllUsers = async (req,res)=>{
    try{
        if(req.user.role !== 'admin'){
            return res.status(403).json({message:'You are not authorized, Admins Only !!'});
        }
        const users = await userModel.find();
        res.status(200).json({users});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
};

// to get the current user who logged in the app 
export const getCurrentUser = async (req, res) => {
    try {
        console.log(req.user);
        const user = await userModel.findById(req.user.userId);
        res.status(200).json({ user });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
 
}

// to check if the user is logged in the app 
export const authCheck = (req, res) => {
    const { token } = req.cookies;
    console.log('Token from cookies:', token);

    if (!token) {
        console.log('No token found');
        return res.status(401).json({ authenticated: false });
    }

    try {
        const { userId, role } = verifyJWT(token);
        console.log('Token verified, userId:', userId, 'role:', role);
        return res.status(200).json({ authenticated: true });
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ authenticated: false });
    }
};
