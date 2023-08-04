const {body} = require('express-validator');

//ragistation validator

const validateuserRegistration =[
  body('name')
  .trim()
  .notEmpty()
  .withMessage('Name is require')
  .isLength({min:3,max:31})
  .withMessage('Name should be at least 3-31 characters long'),

];



module.exports = {validateuserRegistration}