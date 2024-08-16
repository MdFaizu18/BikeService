import bcrypt from 'bcryptjs';

// to hash the password password while registering 
export const hashPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
};

// to compare the password while user login event 
export const comparePassword = async (password,hashedPassword)=>{
    const passwordMatched = await bcrypt.compare(password,hashedPassword);
    return passwordMatched;
}