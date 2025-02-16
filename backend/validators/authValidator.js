const {body, validationResult} = require('express-validator');

const loginValidator = [
    body('email').notEmpty().trim().withMessage('Email is required'),
    body('password').notEmpty().trim().withMessage('Password is required'),
]

const registerValidator = [
    body('name').notEmpty().trim().withMessage('Name is required'),
    body('email').notEmpty().trim().isEmail().withMessage('Email is Required'),
    body('password').notEmpty().trim().withMessage('Password is required'),
    body('phone').notEmpty().trim().isNumeric().withMessage('Phone no is required')
]


const validate = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
}

module.exports = {validate, loginValidator, registerValidator}