import { body, validationResult } from 'express-validator';
import userModel from '../models/userModel.js';

// setting the validation using express-validator
const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                return res.status(400).json({ errors: errorMessages });
            }
            next();
        },
    ];
};

// Validation for register input
export const validateRegisterInput = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('email should be required')
        .isEmail()
        .withMessage('invalid email format')
        .custom(async (email) => {
            const user = await userModel.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }
        }),
    body('mobileNo')
        .notEmpty()
        .withMessage('mobile number is required')
        .isLength({ min: 10})
        .withMessage('mobile number must be 10 characters long'),
    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long'),
]);


// Validation for login input
export const validateLoginInput = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
]);
