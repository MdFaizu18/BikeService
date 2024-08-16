import { verifyJWT } from "../utils/tokenUtils.js";

// using verifyJWT to get the userId and role which we have passed during login in cookies 
export const authenticateUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        console.log("No token found");
        return res.status(401).json({ msg: "No token provided" });
    }
    try {
        const { userId, role } = verifyJWT(token);
        req.user = { userId, role };
        console.log(req.user);
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ msg: "Invalid token" });
    }
};
