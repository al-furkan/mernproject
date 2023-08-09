const {body} = require('express-validator');

//ragistation validator

const validateuserRegistration =[
  body('name')
  .trim()
  .notEmpty()
  .withMessage('Name is require.Enter your fullname')
  .isLength({min:3,max:31})
  .withMessage('Name should be at least 3-31 characters long'),

  body('email')
  .trim()
  .notEmpty()
  .withMessage('email is require.Enter your email')
  .isEmail()
  .withMessage('Invalid email adderss'),
  
  body('password')
  .trim()
  .notEmpty()
  .withMessage('password is requireEnter your password')
  .isLength({min:6,max:255})
  .withMessage('password should be at 6 characters')
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
  .withMessage('Password should contain at least one uppercase latter, one lower case later, one number and one spacial character'),

  body('address')
  .trim()
  .notEmpty()
  .withMessage('address is require.Enter your address')
  .isLength({min:3,max:255})
  .withMessage('address should be at 3 characters'),

  body('phone')
  .trim()
  .notEmpty()
  .withMessage('phone is require.Enter your Phone'),

  body('image')
  .optional()
  .isString()
  .withMessage('image is require.Enter image'),
  
];



module.exports = {validateuserRegistration}