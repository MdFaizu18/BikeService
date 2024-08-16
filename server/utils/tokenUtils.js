import jwt from 'jsonwebtoken';

// to create a generative token using jwt 
export const createJWT = (payload)=>{
    const token = jwt.sign(payload,process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return token;
};

// to verify the created token is valid 
export const verifyJWT = (token)=>{
    const decoded = jwt.verify(token,process.env.JWT_SECRET );
    return decoded;
}