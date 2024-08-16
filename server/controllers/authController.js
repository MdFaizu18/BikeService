import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

// Create a new user account via register
export const register = async (req, res) => {
    try {
        const hashedPassword = await hashPassword(req.body.password);
        req.body.password = hashedPassword;
        const user = await userModel.create(req.body);
        res.status(201).json({ message: "user created successfully", user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "server error" });
    }
};

// Login an existing user account via login
export const login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        };
        const passwordMatched = user && await comparePassword(req.body.password, user.password);
        if (!passwordMatched) {
            return res.status(401).json({ message: "invalid credentials" });
        };
        
        const token = createJWT({ userId: user._id, role: user.role });
        console.log(token);
        const oneDay = 1000 * 60 * 60 * 24;
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + oneDay),
        });
        res.status(201).json({
            message: "user logged in successfully",
            userId: user._id,
            email: user.email,
            role: user.role
});

    }
    catch (errr) {
        console.log(errr);
        res.status(500).json({ message: "server error" });
    }
};

// to performing logout functionality 
export const logout = (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(200).json({ message: "user logged out successfully" });
}

