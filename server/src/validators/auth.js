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




// login validation 

const validateuserLogin =[
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

];


// Update password validation 
const validateuserUpdatepassword =[
 body('oldpassword')
 .trim()
 .notEmpty()
 .withMessage('oldpassword is requireEnter your password')
 .isLength({min:6,max:255})
 .withMessage('oldpassword should be at 6 characters')
 .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
 .withMessage('oldPassword should contain at least one uppercase latter, one lower case later, one number and one spacial character'),


 body('confrompassword')
 .trim()
 .notEmpty()
 .withMessage('confirmpassword is requireEnter your password')
 .isLength({min:6,max:255})
 .withMessage('confirmpassword should be at 6 characters')
 .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
 .withMessage('confirmpassword should contain at least one uppercase latter, one lower case later, one number and one spacial character'),

body('confirmpassword').custom((value,{req})=>{
  if(value!==req.body.newpassword){
    throw new Error("password did not match")
  }
  return true;
})

];

//validate user forget password
const validateuserForgetpassword =[
  body('email')
  .trim()
  .notEmpty()
  .withMessage('email is require.Enter your email')
  .isEmail()
  .withMessage('Invalid email adderss'),
  
 
 
 ];

 //reset password validation

 const validateuserResetpassword =[
  body('token')
  .trim()
  .notEmpty()
  .withMessage('Token  is require'),

  body('oldpassword')
 .trim()
 .notEmpty()
 .withMessage('password is require .Enter your password')
 .isLength({min:6,max:255})
 .withMessage('oldpassword should be at 6 characters')
 .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
 .withMessage('oldPassword should contain at least one uppercase latter, one lower case later, one number and one spacial character'),


 ];



module.exports = {validateuserRegistration,validateuserLogin,validateuserUpdatepassword,validateuserForgetpassword,validateuserResetpassword}